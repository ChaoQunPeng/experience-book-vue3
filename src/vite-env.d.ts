/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-01-29 20:15:38
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-01-30 16:58:39
 * @FilePath: /experience-book-vue3/src/vite-env.d.ts
 * @Description: 
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const componentOptions: ComponentOptions;
  export default componentOptions;
}