/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-01-30 19:14:17
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-01 22:44:54
 * @FilePath: /experience-book-vue3/mock/skill.ts
 * @Description:
 */
import Mock from 'mockjs';
import { SuccessModel } from '../src/api/model';

/**
 * 获取导航的技能列表
 */
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

/**
 * 获取技能列表页的数据，包含了经验、任务信息等
 */
Mock.mock('/api/skill/list', 'get', () => {
  const mockData = Mock.mock({
    'data|7': [
      {
        id: '@id',
        name: '@cword@cword@cword@cword',
        'levelName|1': ['新手', '高级新手', '胜任者', '精通者', '专家'],
        // 当前熟练度等级级别，新手1 ，新手2什么的
        'level|1-5': 1,
        'currentLevelExp|0-100': 1,
        'color|1': ['green', 'blue', 'red', 'purple', 'black'],
        range: [100, 199]
      }
    ]
  });

  return new SuccessModel({
    code: 1,
    msg: 'success',
    data: mockData.data
  });
});
