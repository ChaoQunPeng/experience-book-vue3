/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-01-29 20:15:38
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-21 15:39:32
 * @FilePath: /experience-book-vue3/vite.config.ts
 * @Description:
 */
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

import * as path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default ({ mode }) => {
  const modeConfig = loadEnv(mode, process.cwd());

  return defineConfig({
    define: {
      // 是否全局启用mock
      _EnableGlobalMock: false,
      // 是否允许mock调试
      _EnableMockDebug: true
    },
    // 部署静态页面base路径需要用 ./
    base: modeConfig.VITE_MODE == 'mock' ? './' : '/',
    build: {
      outDir: modeConfig.VITE_MODE == 'mock' ? 'docs' : 'dist'
    },
    plugins: [
      vue(),
      vueJsx(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false // css in js
          })
        ]
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
};
