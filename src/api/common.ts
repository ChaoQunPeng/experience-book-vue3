/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-04 15:07:59
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-23 13:13:49
 * @FilePath: /experience-book-vue3/src/api/common.ts
 * @Description:
 */
import { BaseApi } from './config/base-api';
import { axiosInstance } from './config/http';
import { ResponseModel } from './config/model';
// import { axiosInstance } from './config/http';

class Common extends BaseApi {
  constructor() {
    super('common');
  }

  /**
   * @description: 上传
   * @return {*}
   */
  upload(data: FormData): Promise<ResponseModel> {
    return axiosInstance.post(`/${this.name}/upload`, data);
  }

  /**
   * @description: 导出所有的数据
   * @return {*}
   */
  exportData(): Promise<ResponseModel> {
    return axiosInstance.get(`/${this.name}/export-data`);
  }
}

export const CommonApi = new Common();
