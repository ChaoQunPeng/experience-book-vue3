/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-01-30 19:14:17
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-22 17:56:40
 * @FilePath: /experience-book-vue3/mock/skill.ts
 * @Description:
 */
import Mock from 'mockjs';

import { MockMethod } from 'vite-plugin-mock';

import { SuccessModel } from '../src/api/config/model';

function regUrl(url: string) {
  return RegExp(url + '.*');
}

const baseData = [
  {
    id: 1,
    name: '前端'
  },
  {
    id: 2,
    name: '后端'
  },
  {
    id: 3,
    name: '平面设计'
  },
  {
    id: 4,
    name: 'AE'
  },
  {
    id: 5,
    name: 'PR剪辑'
  }
];

export default [
  {
    url: '/mock/skill/options',
    // 这个url是要生成的数据接口地址，封装的axios请求，加上/mock即可
    method: 'get',
    response: () => {
      const data = Mock.mock(baseData);

      return new SuccessModel({
        code: 1,
        msg: 'success',
        data: data
      });
    }
  },
  {
    url: '/mock/skill/list',
    method: 'get',
    response: () => {
      const data = Mock.mock([
        {
          id: 1,
          name: '前端',
          noteTotal: 2,
          expTotal: '12000',
          todoNoteTotal: 1,
          level: 1,
          levelName: '专家',
          currentLevelExp: 2000,
          color: 'black',
          range: [10000, 99999],
          levelExpCap: 99999
        },
        {
          id: 2,
          name: '后端',
          noteTotal: 1,
          expTotal: '2483',
          todoNoteTotal: 0,
          level: 4,
          levelName: '熟练者',
          currentLevelExp: 284,
          color: 'green',
          range: [2200, 2599],
          levelExpCap: 399
        },
        {
          id: 3,
          name: '平面设计',
          noteTotal: 1,
          expTotal: '9244',
          todoNoteTotal: 0,
          level: 5,
          levelName: '精通者',
          currentLevelExp: 45,
          color: 'purple',
          range: [9200, 9999],
          levelExpCap: 799
        },
        {
          id: 4,
          name: 'AE',
          noteTotal: 1,
          expTotal: '4288',
          todoNoteTotal: 0,
          level: 3,
          levelName: '胜任者',
          currentLevelExp: 89,
          color: 'red',
          range: [4200, 4799],
          levelExpCap: 599
        },
        {
          id: 5,
          name: 'PR剪辑',
          noteTotal: 1,
          expTotal: '876',
          todoNoteTotal: 0,
          level: 5,
          levelName: '新手',
          currentLevelExp: 77,
          color: 'blue',
          range: [800, 999],
          levelExpCap: 199
        }
      ]);

      return new SuccessModel({
        code: 1,
        msg: 'success',
        data: data
      });
    }
  },
  {
    url: '/mock/skill/list',
    method: 'get',
    response: () => {
      const data = Mock.mock([
        {
          id: 1,
          name: '前端',
          noteTotal: 2,
          expTotal: '12000',
          todoNoteTotal: 1,
          level: 1,
          levelName: '专家',
          currentLevelExp: 2000,
          color: 'black',
          range: [10000, 99999],
          levelExpCap: 99999
        },
        {
          id: 2,
          name: '后端',
          noteTotal: 1,
          expTotal: '2483',
          todoNoteTotal: 0,
          level: 4,
          levelName: '熟练者',
          currentLevelExp: 284,
          color: 'green',
          range: [2200, 2599],
          levelExpCap: 399
        },
        {
          id: 3,
          name: '平面设计',
          noteTotal: 1,
          expTotal: '9244',
          todoNoteTotal: 0,
          level: 5,
          levelName: '精通者',
          currentLevelExp: 45,
          color: 'purple',
          range: [9200, 9999],
          levelExpCap: 799
        },
        {
          id: 4,
          name: 'AE',
          noteTotal: 1,
          expTotal: '4288',
          todoNoteTotal: 0,
          level: 3,
          levelName: '胜任者',
          currentLevelExp: 89,
          color: 'red',
          range: [4200, 4799],
          levelExpCap: 599
        },
        {
          id: 5,
          name: 'PR剪辑',
          noteTotal: 1,
          expTotal: '876',
          todoNoteTotal: 0,
          level: 5,
          levelName: '新手',
          currentLevelExp: 77,
          color: 'blue',
          range: [800, 999],
          levelExpCap: 199
        }
      ]);

      return new SuccessModel({
        code: 1,
        msg: 'success',
        data: data
      });
    }
  },
  {
    url: '/mock/skill/note/statistics',
    method: 'get',
    response: () => {
      const data = Mock.mock([
        {
          name: '前端',
          total: 3,
          hasExp: 'exp>0的笔记数'
        },
        {
          name: '前端',
          total: 1,
          hasExp: 'exp=0的笔记数'
        },
        {
          name: 'AE',
          total: 1,
          hasExp: 'exp>0的笔记数'
        },
        {
          name: '平面设计',
          total: 2,
          hasExp: 'exp>0的笔记数'
        },
        {
          name: '后端',
          total: 1,
          hasExp: 'exp>0的笔记数'
        },
        {
          name: 'PR剪辑',
          total: 1,
          hasExp: 'exp>0的笔记数'
        }
      ]);

      return new SuccessModel({
        code: 1,
        msg: 'success',
        data: data
      });
    }
  },
  {
    url: '/mock/skill/exp/statistics',
    method: 'get',
    response: () => {
      const data = Mock.mock([
        {
          name: '前端',
          totalExp: 12000
        },
        {
          name: '后端',
          totalExp: 2483
        },
        {
          name: '平面设计',
          totalExp: 9244
        },
        {
          name: 'AE',
          totalExp: 4288
        },
        {
          name: 'PR剪辑',
          totalExp: 876
        }
      ]);

      return new SuccessModel({
        code: 1,
        msg: 'success',
        data: data
      });
    }
  },
  {
    url: '/mock/skill/exp/trend',
    method: 'get',
    response: () => {
      const data = Mock.mock([
        {
          get_exp_datetime: '2024-02-19',
          'exp|2-8': 1,
          skill: '前端'
        },
        {
          get_exp_datetime: '2024-02-19',
          'exp|2-8': 1,
          skill: '后端'
        },
        {
          get_exp_datetime: '2024-02-19',
          'exp|2-8': 1,
          skill: '平面设计'
        },
        {
          get_exp_datetime: '2024-02-19',
          'exp|2-8': 1,
          skill: 'AE'
        },
        {
          get_exp_datetime: '2024-02-19',
          'exp|2-8': 1,
          skill: 'PR剪辑'
        },
        {
          get_exp_datetime: '2024-02-20',
          'exp|2-8': 1,
          skill: '前端'
        },
        {
          get_exp_datetime: '2024-02-20',
          'exp|2-8': 1,
          skill: '后端'
        },
        {
          get_exp_datetime: '2024-02-20',
          'exp|2-8': 1,
          skill: '平面设计'
        },
        {
          get_exp_datetime: '2024-02-20',
          'exp|2-8': 1,
          skill: 'AE'
        },
        {
          get_exp_datetime: '2024-02-20',
          'exp|2-8': 1,
          skill: 'PR剪辑'
        },
        {
          get_exp_datetime: '2024-02-21',
          'exp|2-8': 1,
          skill: '前端'
        },
        {
          get_exp_datetime: '2024-02-21',
          'exp|2-8': 1,
          skill: '后端'
        },
        {
          get_exp_datetime: '2024-02-21',
          'exp|2-8': 1,
          skill: '平面设计'
        },
        {
          get_exp_datetime: '2024-02-21',
          'exp|2-8': 1,
          skill: 'AE'
        },
        {
          get_exp_datetime: '2024-02-21',
          'exp|2-8': 1,
          skill: 'PR剪辑'
        },
        {
          get_exp_datetime: '2024-02-22',
          'exp|2-8': 1,
          skill: '前端'
        },
        {
          get_exp_datetime: '2024-02-22',
          'exp|2-8': 1,
          skill: '后端'
        },
        {
          get_exp_datetime: '2024-02-22',
          'exp|2-8': 1,
          skill: '平面设计'
        },
        {
          get_exp_datetime: '2024-02-22',
          'exp|2-8': 1,
          skill: 'AE'
        },
        {
          get_exp_datetime: '2024-02-22',
          'exp|2-8': 1,
          skill: 'PR剪辑'
        },
        {
          get_exp_datetime: '2024-02-23',
          'exp|2-8': 1,
          skill: '前端'
        },
        {
          get_exp_datetime: '2024-02-23',
          'exp|2-8': 1,
          skill: '后端'
        },
        {
          get_exp_datetime: '2024-02-23',
          'exp|2-8': 1,
          skill: '平面设计'
        },
        {
          get_exp_datetime: '2024-02-23',
          'exp|2-8': 1,
          skill: 'AE'
        },
        {
          get_exp_datetime: '2024-02-23',
          'exp|2-8': 1,
          skill: 'PR剪辑'
        },
        {
          get_exp_datetime: '2024-02-24',
          'exp|2-8': 1,
          skill: '前端'
        },
        {
          get_exp_datetime: '2024-02-24',
          'exp|2-8': 1,
          skill: '后端'
        },
        {
          get_exp_datetime: '2024-02-24',
          'exp|2-8': 1,
          skill: '平面设计'
        },
        {
          get_exp_datetime: '2024-02-24',
          'exp|2-8': 1,
          skill: 'AE'
        },
        {
          get_exp_datetime: '2024-02-24',
          'exp|2-8': 1,
          skill: 'PR剪辑'
        },
        {
          get_exp_datetime: '2024-02-25',
          'exp|2-8': 1,
          skill: '前端'
        },
        {
          get_exp_datetime: '2024-02-25',
          'exp|2-8': 1,
          skill: '后端'
        },
        {
          get_exp_datetime: '2024-02-25',
          'exp|2-8': 1,
          skill: '平面设计'
        },
        {
          get_exp_datetime: '2024-02-25',
          'exp|2-8': 1,
          skill: 'AE'
        },
        {
          get_exp_datetime: '2024-02-25',
          'exp|2-8': 1,
          skill: 'PR剪辑'
        }
      ]);

      return new SuccessModel({
        code: 1,
        msg: 'success',
        data: data
      });
    }
  },
  {
    url: regUrl('/mock/skill/note-list'),
    method: 'get',
    response: () => {
      const data = Mock.mock({
        id: '29',
        'name|1': ['前端', '后端', '平面设计', 'AE', 'PR剪辑'],
        expTotal: 12000,
        'noteList|1-3': [
          {
            id: '@id',
            title: '@csentence',
            exp: 12000,
            summary:
              '首先安装\n\n```npm\nnpm i tailwindcss\n```\n\n```html \n<!doctype html> \n<html>\n<head>\n  <meta charset="UTF-8">',
            createDateTime: '2024/02/12 21:19'
          }
        ]
      });

      return new SuccessModel({
        code: 1,
        msg: 'success',
        data: data
      });
    }
  },
  {
    url: regUrl('/mock/note'),
    method: 'get',
    response: () => {
      const data = Mock.mock({
        id: 65,
        title: '@csentence',
        create_time: '2024-02-12T13:19:46.000Z',
        content:
          '首先安装\n\n```npm\nnpm i tailwindcss\n```\n\n```html \n<!doctype html> \n<html>\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <link href="./output.css" rel="stylesheet">\n</head>\n<body>\n  <h1 class="text-3xl font-bold underline">\n    Hello world!\n  </h1>\n</body>\n</html\n\n',
        exp: 12000,
        remark: '',
        end_time: null,
        skill_id: 29,
        type: 1,
        get_exp_datetime: '2024-02-16T02:21:38.000Z',
        skillId: 29
      });

      return new SuccessModel({
        code: 1,
        msg: 'success',
        data: data
      });
    }
  },
  {
    url: regUrl('/mock/note'),
    method: 'put',
    response: () => {
      return new SuccessModel({
        code: 1,
        msg: 'success',
        data: {}
      });
    }
  },
  {
    url: regUrl('/mock/note'),
    method: 'delete',
    response: () => {
      return new SuccessModel({
        code: 1,
        msg: 'success',
        data: {}
      });
    }
  },
  {
    url: regUrl('/mock/skill'),
    method: 'delete',
    response: () => {
      return new SuccessModel({
        code: 1,
        msg: 'success',
        data: {}
      });
    }
  },
  {
    url: regUrl('/mock/skill'),
    method: 'post',
    response: () => {
      return new SuccessModel({
        code: 1,
        msg: 'success',
        data: {}
      });
    }
  },
  {
    url: regUrl('/mock/skill'),
    method: 'put',
    response: () => {
      return new SuccessModel({
        code: 1,
        msg: 'success',
        data: {}
      });
    }
  },
  {
    url: '/mock/common/upload',
    method: 'post',
    response: () => {
      return new SuccessModel({
        code: 1,
        msg: 'success',
        data: {
          id: '@id',
          url: '@url',
          name: '文件名'
        }
      });
    }
  }
] as MockMethod[];
