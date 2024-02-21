<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-01-29 20:15:38
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-21 16:03:42
 * @FilePath: /experience-book-vue3/src/App.vue
 * @Description: 
-->
<template>
  <a-config-provider
    :theme="{
      token: themeToken
    }"
  >
    <a-spin :spinning="spinning" wrapperClassName="h-full">
      <div id="modalMount"></div>

      <div v-if="visible" class="flex h-screen overflow-x-hidden">
        <div class="w-200">
          <side-nav></side-nav>
        </div>
        <main class="flex-1 overflow-hidden">
          <router-view></router-view>
        </main>
      </div>
    </a-spin>
  </a-config-provider>
</template>

<script setup lang="ts">
import SideNav from '@/layout/side-nav.vue';
import { onMounted, ref } from 'vue';
import { useAppStorage } from './layout/use-app';

// const [messageApi, contextHolder] = message.useMessage();

const themeToken = {
  wireframe: false,
  colorPrimary: '#198cff',
  colorSuccess: '#5dce00',
  colorWarning: '#fa9a25',
  colorError: '#e31700',
  colorInfo: '#198cff',
  colorTextBase: 'rgb(31, 51, 73)',
  colorText: 'rgba(31, 51, 73, 0.85)',
  colorBorder: '#f3f3f4',
  colorBorderSecondary: '#f3f3f4',
  borderRadiusLG: '4px'
};

const visible = ref(false);
const spinning = ref(false);

onMounted(() => {
  console.log('meta ', import.meta.env);

  if (_EnableGlobalMock) {
    console.warn(`注意！你已经开启了全局mock！`);
  }

  const { initTheme } = useAppStorage();

  initTheme();

  // vite-plugin-mock插件中用来处理函数createProdMockServer还未执行完成，所以要延时一下
  const timeout = (() => {
    const delay = 300;

    if (import.meta.env.MODE == 'mock') {
      return 500;
    } else if (_EnableGlobalMock) {
      return delay;
    } else if (_EnableMockDebug) {
      return delay;
    } else {
      return 0;
    }
  })();

  setTimeout(() => {
    visible.value = true;
  }, timeout);
});
</script>

<style lang="less"></style>
