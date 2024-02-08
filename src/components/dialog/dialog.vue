<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-08 13:53:36
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-08 16:34:52
 * @FilePath: /experience-book-vue3/src/components/dialog/dialog.vue
 * @Description: 
-->
<template>
  <a-modal v-model:open="open">

    <slot></slot>
  </a-modal>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, onUnmounted, ref } from 'vue';

defineOptions({
  name: 'eb-dialog'
});

const props = defineProps({
  record: Object
});

const open = ref(true);

onMounted(() => {
  console.log(getCurrentInstance());
  
  console.log(props.record);
});

onUnmounted(() => {
  // app.unmount();
  // getCurrentInstance()?.appContext.app.unmount();
});
</script>

<style lang="less" scoped></style>
