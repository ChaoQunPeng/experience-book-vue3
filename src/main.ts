/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-01-29 20:15:38
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-08 10:55:40
 * @FilePath: /experience-book-vue3/src/main.ts
 * @Description:
 */
import { createApp } from 'vue';
import './assets/theme/index.less';
import Antd from 'ant-design-vue';
import App from './App.vue';

import router from './router';

// import '../mock/index';

export const app = createApp(App);

import './utils/subject';

app.use(router);
app.use(Antd).mount('#app');