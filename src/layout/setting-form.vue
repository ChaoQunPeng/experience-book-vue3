<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-19 12:36:58
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-19 15:18:17
 * @FilePath: /experience-book-vue3/src/layout/setting-form.vue
 * @Description: 
-->
<template>
  <a-modal
    v-model:open="open"
    title="设置"
    width="600px"
    cancel-text="关闭"
    :footer="null"
  >
    <div class="pt-2 pb-30">
      <a-divider orientation="left">主题选择</a-divider>
      <a-radio-group class="mt-10" v-model:value="themeSwitch" @change="changeTheme">
        <a-radio value="dark-theme">暗色</a-radio>
        <a-radio value="light-theme">浅色</a-radio>
      </a-radio-group>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAppStorage } from './use-app';

const open = ref(false);
const themeSwitch = ref('dark-theme');

const { setTheme, getTheme } = useAppStorage();

onMounted(() => {
  themeSwitch.value = getTheme() as string;
});

/**
 * @description: 控制弹框打开或关闭
 * @param {*} status
 * @return {*}
 */
const handleModalOpen = (status?: boolean) => {
  if (status === undefined) {
    open.value = !open.value;
  } else {
    open.value = status;
  }
};

/**
 * @description: 切换主题
 * @return {*}
 */
const changeTheme = (e: any) => {
  setTheme(e.target?.value);
};

defineExpose({
  /**
   * @description: 控制弹框打开或关闭
   */
  handleModalOpen
});
</script>

<style lang="less" scoped></style>
