/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-01-30 19:06:38
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-01-30 19:12:59
 * @FilePath: /experience-book-vue3/src/api/model.ts
 * @Description: http模型
 */

interface HttpModel {
  code: number;
  msg: string;
  data: any;
  writeInLog?: boolean;
}

export class SuccessModel {
  code: number;
  msg: string;
  data: string;

  constructor(options: HttpModel) {
    this.code = options.code ?? 1;
    this.msg = options.msg ?? '';
    this.data = options.data ?? {};
  }
}

export class ErrorModel {
  code: number;
  msg: string;
  data: string;
  writeInLog: boolean;

  constructor(options: HttpModel) {
    this.code = options.code ?? 0;
    this.msg = options.msg ?? '';
    this.data = options.data ?? {};
    this.writeInLog = options.writeInLog ?? false;
  }
}
