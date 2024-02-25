/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-04 15:07:59
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-25 14:09:44
 * @FilePath: /experience-book-vue3/src/api/skill.ts
 * @Description:
 */
import { BaseApi } from './config/base-api';
import { axiosInstance } from './config/http';
import { ResponseModel } from './config/model';

class Skill extends BaseApi {
  constructor() {
    super('skill');
  }

  /**
   * @description: 获取技能首页列表
   * @return {*}
   */
  getSkillList(): Promise<ResponseModel> {
    return axiosInstance.get(`/${this.name}/list`);
  }

  /**
   * @description: 获取技能下拉选项
   * @return {*}
   */
  getSkillOptionList(): Promise<ResponseModel> {
    // 如此启用mock
    // return axiosInstance.get(`/${this.name}/options`, { baseURL: '/mock/' });
    return axiosInstance.get(`/${this.name}/options`);
  }

  /**
   * @description: 获取笔记列表
   * @return {*}
   */
  getSkillNoteList(skillId: number): Promise<ResponseModel> {
    return axiosInstance.get(`/${this.name}/note-list/${skillId}`);
  }

  /**
   * @description: 获取技能经验统计
   * @return {*}
   */
  getExpStatistics(): Promise<ResponseModel> {
    return axiosInstance.get(`/${this.name}/exp/statistics`);
  }

  /**
   * @description: 获取技能笔记数统计
   * @return {*}
   */
  getNoteStatistics(): Promise<ResponseModel> {
    return axiosInstance.get(`/${this.name}/note/statistics`);
  }

  /**
   * @description: 获取技能学习趋势
   * @return {*}
   */
  getExpTrend(): Promise<ResponseModel> {
    return axiosInstance.get(`/${this.name}/exp/trend`);
  }

  /**
   * @description: 技能列表排序
   * @return {*}
   */
  sortList(ids: Array<number>): Promise<ResponseModel> {
    return axiosInstance.put(`/${this.name}/list/sort`, { ids });
  }
}

export const SkillApi = new Skill();
