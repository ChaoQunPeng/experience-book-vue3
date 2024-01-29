/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-01-29 20:15:38
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-01-29 20:36:48
 * @FilePath: /experience-book-vue3/src/main.ts
 * @Description:
 */
import { createApp } from 'vue';
import './style.css';
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);

app.use(Antd).mount('#app');
