<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-01-29 20:15:38
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-01-30 19:57:31
 * @FilePath: /experience-book-vue3/src/App.vue
 * @Description: 
-->
<template>
  <a-config-provider
    :theme="{
      token: themeToken
    }"
  >
    <div class="flex h-screen">
      <div class="w-260">
        <side-nav></side-nav>
      </div>
      <main class="flex-1 bg-bg-blue"></main>
    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
import SideNav from '@/layout/side-nav.vue';

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
  colorBorderSecondary: '#f3f3f4'
};
</script>

<style lang="less" scoped></style>
