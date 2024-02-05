/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-04 15:07:59
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-05 18:31:04
 * @FilePath: /experience-book-vue3/src/api/skill.ts
 * @Description:
 */
import { BaseApi } from './config/base-api';
import { axiosInstance } from './config/http';

class Skill extends BaseApi {
  constructor() {
    super('skill');
  }

  /**
   * @description: 获取技能首页列表
   * @return {*}
   */
  getSkillList(): Promise<any> {
    return axiosInstance.get(`/${this.name}/list`);
  }

  /**
   * @description: 获取技能下拉选项
   * @return {*}
   */
  getSkillOptionList(): Promise<any> {
    return axiosInstance.get(`/${this.name}/options`);
  }

  /**
   * @description: 获取笔记列表
   * @return {*}
   */
  getSkillNoteList(skillId: number): Promise<any> {
    return axiosInstance.get(`/${this.name}/note-list/${skillId}`);
  }
}

export const SkillApi = new Skill();
