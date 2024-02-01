/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-01-29 20:15:38
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-01 22:27:05
 * @FilePath: /experience-book-vue3/src/main.ts
 * @Description:
 */
import { createApp } from 'vue';
import './assets/theme/index.less';
import Antd from 'ant-design-vue';
import App from './App.vue';

import router from './router';

import '../mock/index';

const app = createApp(App);

app.use(router);
app.use(Antd).mount('#app');
