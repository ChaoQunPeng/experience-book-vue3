/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-08 14:28:35
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-08 20:21:55
 * @FilePath: /experience-book-vue3/src/components/dialog/dialog.ts
 * @Description:
 */
import { createApp } from 'vue';
// import dialog from './dialog.vue';

// /**
//  * 创建一个挂载节点
//  * @returns HTMLDivElement
//  */
// const createMountRoot = () => {
//   const el = document.createElement('div');
//   const randomStr = (Math.random() * 10000).toString();
//   el.setAttribute('id', 'pcq');
//   return el;
// };

export function getDialog(options: any) {
  const app = createApp(options.component, {
    record: options.record
  });

  // const el = createMountRoot();

  app.mount('#ModalMount');
}
