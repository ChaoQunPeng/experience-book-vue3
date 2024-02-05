/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-04 15:08:08
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-05 15:12:31
 * @FilePath: /experience-book-vue3/src/api/base-api.ts
 * @Description:
 */
import { axiosInstance } from './http';

export class BaseApi {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  add(body: object): Promise<any> {
    return axiosInstance.post(`${this.name}`, body);
  }

  delele(id: number): Promise<any> {
    return axiosInstance.delete(`${this.name}/${id}`);
  }

  update(id: number, body: object) {
    return axiosInstance.put(`${this.name}/${id}`, body);
  }

  get(params?: object) {
    return axiosInstance.get(`${this.name}`, params);
  }

  getById(id: number | string) {
    return axiosInstance.get(`${this.name}/${id}`);
  }
}