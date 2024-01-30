/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-01-29 20:15:38
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-01-30 19:01:32
 * @FilePath: /experience-book-vue3/vite.config.ts
 * @Description:
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false // css in js
        })
      ]
    })
  ],
  server: {
    hmr: true
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve('./src')
      },
      {
        find: '@layout',
        replacement: path.resolve('./src/layout/')
      }
    ]
  }
});
