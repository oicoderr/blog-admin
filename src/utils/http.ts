import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { message, Modal } from "antd";
import { API_ROOT } from "./config";
import isLogin from "./login";
import { handleCheckRefreshToken } from "./api";
const LOGIN_PATH = "user/login/";
const confirm = Modal.confirm;
export const http = axios.create({
  baseURL: API_ROOT,
});

export const getAccessToken = () => {
  let str: string = "";
  if (window.localStorage.getItem("TOKEN")) {
    str = `${
      JSON.parse(window.localStorage.getItem("TOKEN") || "").access_token
    }`;
  }
  return str;
};

export const getRefreshToken = () => {
  let refresh_token: string = "";
  if (window.localStorage.getItem("TOKEN")) {
    refresh_token = `${
      JSON.parse(window.localStorage.getItem("TOKEN") || "").refresh_token
    }`;
  }
  return refresh_token;
};
// 拦截器
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers["x-access-token"] = getAccessToken();
    config.headers["channel"] = "admin";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (
    response: AxiosResponse<any>
  ): AxiosResponse<any> | Promise<AxiosResponse<any>> => {
    let { data, status } = response;
    // access_token 过期, 返回新access_token, 及 refresh_token
    // if (status && status === 253) {
    //   let newToken = handleCheckRefreshToken({
    //     refresh_token: getRefreshToken(),
    //   });
    //   newToken.then((v) => {
    //     window.localStorage.setItem(
    //       "TOKEN",
    //       JSON.stringify(v.data.result.tokens)
    //     );
    //   });
    // }

    if (response.config.url !== LOGIN_PATH && !isLogin()) {
      confirm({
        title: "提示!",
        content: "用户信息已过期，请点击确定后重新登录。",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          window.location.href = "/login";
        },
        onCancel() {
          window.location.href = "/login";
        },
      });
    } else if (response.data.code !== 200 && [251, 252, 253].includes(status)) {
      /*
      251 access_token 不存在验证信息 | token被篡改! | 未知的错误! | 错误的信息载体
      252 refesh_token 过期 / 未通过
      253 access_token 过期
    */
      message.error(response.data.message || response.data.error);
      let goLogin = setTimeout(() => {
        clearTimeout(goLogin);
        window.localStorage.clear();
        window.location.href = "/login";
      }, 2000);
    }
    return response;
  },
  (error: any) => {
    if (!isLogin()) {
      confirm({
        title: "提示!",
        content: "用户信息已过期，请点击确定后重新登录。",
        maskClosable: false,
        okText: "确定",
        cancelText: "取消",
        onOk() {
          window.location.href = "/login";
        },
        onCancel() {
          window.location.href = "/login";
        },
      });
    }
    return Promise.reject(error);
  }
);
