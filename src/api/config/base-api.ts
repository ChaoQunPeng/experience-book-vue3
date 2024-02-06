/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-04 15:08:08
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-06 13:16:13
 * @FilePath: /experience-book-vue3/src/api/config/base-api.ts
 * @Description:
 */
import { axiosInstance } from './http';
import { ResponseModel } from './model';

export class BaseApi {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  add(body: object): Promise<ResponseModel> {
    return axiosInstance.post(`${this.name}`, body);
  }

  delele(id: number): Promise<ResponseModel> {
    return axiosInstance.delete(`${this.name}/${id}`);
  }

  update(id: number, body: object): Promise<ResponseModel> {
    return axiosInstance.put(`${this.name}/${id}`, body);
  }

  get(params?: object): Promise<ResponseModel> {
    return axiosInstance.get(`${this.name}`, params);
  }

  getById(id: number | string): Promise<ResponseModel> {
    return axiosInstance.get(`${this.name}/${id}`);
  }
}
