/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-01-29 20:15:38
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-18 17:19:38
 * @FilePath: /experience-book-vue3/vite.config.ts
 * @Description:
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

import * as path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';

import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',

  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false // css in js
        })
      ]
    }),
    viteMockServe({
      mockPath: './mock',
      // 根据项目配置。可以配置在.env文件
      enable: true,
      watchFiles: true,
      logger: false,
      prodEnabled: true, // 生产环境设为true，也可以根据官方文档格式
      injectCode: ` import { setupProdMockServer } from './src/mock';
        setupProdMockServer(); `,
      injectFile: resolve('src/main.ts') // 在main.ts注册后需要在此处注入，否则可能报找不到setupProdMockServer的错误
    })
  ],
  server: {
    hmr: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
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
      },
      {
        find: '@views',
        replacement: path.resolve('./src/views/')
      }
    ]
  }
});