import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { message, Modal } from 'antd'
import { API_ROOT } from './config'
import isLogin from './login'
const LOGIN_PATH = 'user/login'
const confirm = Modal.confirm;
export const http = axios.create({
  baseURL: API_ROOT
})

export const getAccessToken = () => {
  let str = ''
  if (window.localStorage.getItem('TOKEN')) {
    // str = `Naice ${JSON.parse(window.localStorage.getItem('TOKEN') || '').token}`
    str = `${JSON.parse(window.localStorage.getItem('TOKEN') || '').access_token}`
  }
  return str
}
// 拦截器
http.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers['x-access_token'] = getAccessToken()
  return config
}, (error) => {
  return Promise.reject(error)
})

http.interceptors.response.use((response: AxiosResponse<any>): AxiosResponse<any> | Promise<AxiosResponse<any>> => {
  console.log('login:')
  console.log(response)
  if (response.config.url !== LOGIN_PATH && !isLogin()) {
    confirm({
      title: '提示!',
      content: '用户信息已过期，请点击确定后重新登录。',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        window.location.href = '/login'
      }
    })
  } else if (response.data.code !== 200) {
    message.error(response.data.message || response.data.error)
  }
  return response
}, (error: any) => {
  if (!isLogin()) {
    confirm({
      title: '提示!',
      content: '用户信息已过期，请点击确定后重新登录。',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        window.location.href = '/login'
      }
    })
  }
  return Promise.reject(error)
})
