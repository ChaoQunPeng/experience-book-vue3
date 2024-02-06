/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-01-30 18:44:06
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-06 13:08:00
 * @FilePath: /experience-book-vue3/src/api/config/http.ts
 * @Description: http文件
 */

import axios, { InternalAxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api/',
  timeout: 5000
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error: any) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么

    if (response.status == 200) {
      return response.data;
    } else {
      return handleError(response);
    }
  },
  (error: any) => {
    // 处理响应错误
    return Promise.reject(error);
  }
);

function handleError(response: AxiosResponse) {
  if (response.status == 404) {
  } else if (response.status == 500) {
  } else {
  }
}

export { axiosInstance };
