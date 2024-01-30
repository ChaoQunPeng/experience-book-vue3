/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-01-30 19:14:17
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-01-30 20:01:53
 * @FilePath: /experience-book-vue3/mock/skill.ts
 * @Description:
 */
import Mock from 'mockjs';
import { SuccessModel } from '../src/api/model';

Mock.mock('/api/skill/nav', 'get', () => {
  const data = Mock.mock([
    {
      id: '@id',
      name: 'UI设计'
    },
    {
      id: '@id',
      name: '前端开发'
    },
    {
      id: '@id',
      name: '文案写作'
    },
    {
      id: '@id',
      name: '运营技巧'
    }
  ]);

  return new SuccessModel({
    code: 1,
    msg: 'success',
    data: data
  });
});
