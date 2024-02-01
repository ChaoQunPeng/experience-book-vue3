/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-01-30 16:11:22
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-01 15:32:26
 * @FilePath: /experience-book-vue3/src/layout/side-nav.ts
 * @Description:
 */

import { axiosInstance } from '@/api/http';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    const data = {
      /**
       * id  id
       * name 姓名
       */
      bookNavList: <
        Array<{
          /**
           *  这是id
           */
          id?: number;
          /**
           *  这是name
           */
          name?: string;
        }>
      >[],
      activeNav: <
        {
          /**
           *  这是id
           */
          id?: number | string;
          /**
           *  这是name
           */
          name?: string;
        }
      >{}
    };

    return {
      ...data,
      taskNavList: [
        {
          id: 'all',
          name: '全部'
        },
        {
          id: 'myDay',
          name: '我的一天'
        },
        {
          id: 'important',
          name: '重要'
        },
        {
          id: 'deadline',
          name: '今天截止'
        }
      ]
    };
  },

  mounted() {
    this.getList();
  },

  methods: {
    /**
     * @description: 打开经验列表页面
     * @return {*}
     */
    openExpBookList(nav: { id: number; name?: string }) {
      this.activeNav = nav;
    },
    openExpbook(nav: { id: number; name?: string }) {
      this.activeNav = nav;
    },
    openTaskList(nav: { id: number; name?: string }) {
      this.activeNav = nav;
    },
    clickNav(nav: { id?: number | string; name?: string }) {
      this.activeNav = nav;
    },
    /**
     * @description: 获取笔记列表
     * @return {*}
     */
    async getList() {
      axiosInstance
        .get('/api/skill/nav')
        .then(res => {
          this.bookNavList = res.data.data;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
});
