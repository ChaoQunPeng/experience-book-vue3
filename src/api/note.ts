/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-04 15:07:59
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-05 20:29:44
 * @FilePath: /experience-book-vue3/src/api/note.ts
 * @Description:
 */
import { BaseApi } from './config/base-api';
// import { axiosInstance } from './config/http';

class Note extends BaseApi {
  constructor() {
    super('note');
  }
}

export const NoteApi = new Note();