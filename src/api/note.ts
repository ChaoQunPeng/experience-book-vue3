/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-04 15:07:59
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-23 11:08:28
 * @FilePath: /experience-book-vue3/src/api/note.ts
 * @Description:
 */
import { BaseApi } from './config/base-api';
import { axiosInstance } from './config/http';
import { ResponseModel } from './config/model';
// import { axiosInstance } from './config/http';

class Note extends BaseApi {
  constructor() {
    super('note');
  }

  /**
   * @description: 更新经验
   * @return {*}
   */
  updateExp(id: number, exp: number): Promise<ResponseModel> {
    return axiosInstance.put(`/${this.name}/exp/update/${id}`, { exp });
  }
}

export const NoteApi = new Note();
