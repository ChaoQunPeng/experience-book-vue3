/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-01-30 19:14:17
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-06 13:17:56
 * @FilePath: /experience-book-vue3/mock/skill.ts
 * @Description:
 */
import Mock from 'mockjs';

function regUrl(url: string) {
  return RegExp(url + '.*');
}

/**
 * 获取导航的技能列表
 */
Mock.mock('/api/skill/options', 'get', () => {
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

/**
 * 获取技能里的笔记列表
 */
Mock.mock(regUrl('/api/skill/note-list'), 'get', options => {
  const mockData = Mock.mock({
    'expTotal|100-420': 1,
    'noteList|10-20': [
      {
        id: '@id',
        title: '@cword@cword@cword@cword@cword',
        summary: '@cparagraph',
        'exp|1-5': 1,
        createDateTime: '@datetime'
      }
    ]
  });

  return new SuccessModel({
    code: 1,
    msg: 'success',
    data: mockData
  });
});
