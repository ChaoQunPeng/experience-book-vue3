/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-01-30 19:06:38
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-06 13:19:34
 * @FilePath: /experience-book-vue3/src/api/config/model.ts
 * @Description: http模型
 */

export interface ResponseModel {
  code: number;
  msg: string;
  data: any;
  // writeInLog?: boolean;
}

export class SuccessModel {
  code: number;
  msg: string;
  data: string;

  constructor(options: ResponseModel) {
    this.code = options.code ?? 1;
    this.msg = options.msg ?? '';
    this.data = options.data ?? {};
  }
}

export class ErrorModel {
  code: number;
  msg: string;
  data: string;
  // writeInLog: boolean;

  constructor(options: ResponseModel) {
    this.code = options.code ?? 0;
    this.msg = options.msg ?? '';
    this.data = options.data ?? {};
    // this.writeInLog = options.writeInLog ?? false;
  }
}
