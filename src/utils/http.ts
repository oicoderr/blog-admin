import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { message, Modal } from 'antd';
import { API_ROOT } from './config';
import isLogin from './login';
const confirm = Modal.confirm;
export const http = axios.create({
  baseURL: API_ROOT,
});

export const getAccessToken = () => {
  let str: string = '';
  if (sessionStorage.getItem('TOKEN')) {
    str = `${JSON.parse(sessionStorage.getItem('TOKEN') || '').access_token}`;
  }
  return str;
};

// 拦截器
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers['x-access-token'] = getAccessToken();
    config.headers['channel'] = 'admin';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response: AxiosResponse<any>): AxiosResponse<any> | Promise<AxiosResponse<any>> => {
    let { status } = response;
    if (response.data.code !== 200) {
      message.error(response.data.msg);
      sessionStorage.clear();
    }
    if (response.config.url !== 'v1/auth/' && !isLogin()) {
      confirm({
        title: '提示!',
        content: '用户信息已过期，请点击确定后重新登录。',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          window.location.href = '/login';
        },
        onCancel() {
          window.location.href = '/login';
        },
      });
    } else if ([251, 252, 253, 404].includes(status)) {
      /*
        251 access_token 不存在验证信息 | token被篡改! | 未知的错误! | 错误的信息载体
        252 refesh_token 过期 / 未通过
        253 access_token 过期
      */
      let goLogin = setTimeout(() => {
        clearTimeout(goLogin);
        sessionStorage.clear();
        window.location.href = '/login';
      }, 2000);
    }
    return response;
  },
  (error: any) => {
    if (!isLogin()) {
      confirm({
        title: '提示!',
        content: '用户信息已过期，请点击确定后重新登录。',
        maskClosable: false,
        okText: '确定',
        cancelText: '取消',
        onOk() {
          window.location.href = '/login';
        },
        onCancel() {
          window.location.href = '/login';
        },
      });
    }
    return Promise.reject(error);
  }
);
