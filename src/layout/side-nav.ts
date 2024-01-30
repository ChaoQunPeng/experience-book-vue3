/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-01-30 16:11:22
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-01-30 20:05:30
 * @FilePath: /experience-book-vue3/src/layout/side-nav.ts
 * @Description:
 */

import axiosInstance from '@/api/http';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {},

  data() {
    return {
      list: []
    };
  },

  mounted() {
    this.getList();
  },

  methods: {
    async getList() {
      axiosInstance
        .get('/api/skill/nav')
        .then(res => {
          this.list = res.data.data;
          console.log(res.data.data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
});
