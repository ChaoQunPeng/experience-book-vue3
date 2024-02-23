<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-01-30 17:03:04
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-23 16:51:03
 * @FilePath: /experience-book-vue3/src/layout/side-nav.vue
 * @Description: 
-->
<template>
  <div
    class="eb-side-area flex flex-col h-full border-r border-eb-border-color"
    style="border-right-style: solid"
  >
    <div class="eb-logo h-36 flex items-center ml-22 mt-20 mb-20">
      <!-- <img class="size-22 rounded-radius-2" src="@/assets/logo-light.svg" alt="logo" /> -->
      <div class="logo size-22 rounded-radius-2"></div>
      <span class="text-size-26 font-medium ml-3 tracking-letter-spacing-1 text-white"
        >xp-Book</span
      >
    </div>

    <div class="flex-1">
      <div class="w-200 mx-auto mb-10">
        <div
          class="eb-nav-item nav-item pl-20 mb-5"
          :class="{ active: activeNav.id == 0 }"
          @click="clickNav({ id: 0 })"
        >
          <i
            class="iconfont mr-12 text-size-14"
            :class="[activeNav.id == 0 ? 'icon-databaseset-fill' : 'icon-database-set']"
          ></i>
          <span class="text-size-14 select-none">经验本</span>
        </div>

        <ul>
          <li
            v-for="book in skillNavList"
            class="eb-nav-item nav-item h-36 flex items-center pl-40 mb-5 rounded cursor-pointer text-black-45"
            :class="{ active: book.id == activeNav.id }"
            @click="clickNav(book)"
          >
            <i
              class="iconfont text-size-14 mr-12"
              :class="[book.id == activeNav.id ? 'icon-address-book-fill' : 'icon-address-book']"
            ></i>
            <span class="text-size-12 select-none">{{ book.name }}</span>
          </li>
        </ul>
      </div>

      <div class="w-200 mx-auto">
        <div
          class="eb-nav-item nav-item flex items-center h-44 cursor-pointer pl-20 rounded transition-all text-black-45"
          :class="{ active: activeNav.id == 'dashboard' }"
          @click="clickNav({ id: 'dashboard' })"
        >
          <i
            class="iconfont mr-12 text-size-14"
            :class="[activeNav.id == 'dashboard' ? 'icon-chart-area' : 'icon-chart-line']"
          ></i>
          <span class="text-size-14 select-none">数据统计</span>
        </div>
      </div>
    </div>

    <div class="w-180 mx-auto mb-20">
      <div
        class="eb-nav-item nav-item mb-10 flex items-center h-44 cursor-pointer pl-15 rounded transition-all text-black-65"
        @click="exprotData"
      >
        <i class="iconfont icon-clouddownload mr-12 text-size-16"></i>
        <span class="text-size-14 select-none">导出</span>
      </div>

      <div
        class="eb-nav-item nav-item mb-10 flex items-center h-44 cursor-pointer pl-15 rounded transition-all text-black-65"
        @click="openSetting"
      >
        <i class="iconfont icon-cog mr-12 text-size-14"></i>
        <span class="text-size-14 select-none">设置</span>
      </div>

      <div
        class="eb-nav-item nav-item flex items-center h-44 cursor-pointer pl-15 rounded transition-all text-black-65"
        @click="openIllustrate"
      >
        <i class="iconfont icon-exclamation-circle mr-12 text-size-14"></i>
        <span class="text-size-14 select-none">介绍</span>
      </div>
    </div>

    <a-modal v-model:open="showIllustrateModel" title="项目介绍" width="1000px" okText="">
      <app-explain></app-explain>

      <template #footer>
        <a-button key="back" @click="showIllustrateModel = false">了解</a-button>
      </template>
    </a-modal>

    <setting-form ref="settingFormRef"></setting-form>
  </div>
</template>

<!-- <script src="./side-nav.ts" lang="ts"></script> -->
<script setup lang="ts">
import { SkillApi } from '@/api/skill';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { usePageNav } from './nav';
import { useRoute } from 'vue-router';
import { subject } from '../utils/subject';
import { message } from 'ant-design-vue';
import AppExplain from './app-explain.vue';
import SettingForm from './setting-form.vue';
import JSZip from 'jszip';
import { CommonApi } from '@/api/common';

const route = useRoute();

interface navOption {
  id?: string | number;
  name?: string;
}

const skillNavList = ref<Array<navOption>>([]);
const activeNav = ref<navOption>({});
const settingFormRef = ref<InstanceType<typeof SettingForm> | null>(null);
const showIllustrateModel = ref(false);

onMounted(() => {
  subject.subscribe('after-skill-curd', getList);

  setActivedNav();

  getList();
});

onUnmounted(() => {
  subject.unsubscribe('after-skill-curd', getList);
});

/**
 * @description: 设置激活菜单
 * @return {*}
 */
const setActivedNav = () => {
  if (route.name == 'skill-note-list') {
    activeNav.value.id = route.params.id as string;
  } else if (route.name == 'skill') {
    activeNav.value.id = 0;
  } else if (route.name == 'dashboard') {
    activeNav.value.id = 'dashboard';
  }
};

/**
 * @description: 获取列表
 * @return {*}
 */
const getList = async () => {
  const result = await SkillApi.getSkillOptionList();

  if (result.code) {
    skillNavList.value = result.data;
  } else {
    message.error(result.msg);
  }
};

/**
 * @description: 点击导航
 * @param {*} nav
 * @return {*}
 */
const clickNav = (nav: navOption) => {
  activeNav.value = nav;

  const { goSkillNoteList, goSkillIndex, goDashboard } = usePageNav();

  if (activeNav.value.id == 0) {
    goSkillIndex();
  } else if (activeNav.value.id == 'dashboard') {
    goDashboard();
  } else {
    goSkillNoteList(<number>activeNav.value.id);
    subject.publish('click-skill-nav');
  }
};

/**
 * @description: 导出数据
 * @return {*}
 */
const exprotData = async () => {
  const result = await CommonApi.exportData();

  if (!result.code) {
    message.error(`导出失败！${result.msg}`);
    return;
  }

  // 创建 JSZip 实例
  const zip = new JSZip();
  const dataMap = result.data;

  for (const key in dataMap) {
    const data = dataMap[key];
    // 添加文件到 zip 文件
    zip.file(`${key}.json`, JSON.stringify({ data }));
  }

  // 生成 zip 文件
  zip.generateAsync({ type: 'blob' }).then(content => {
    // 创建临时 URL
    const url = URL.createObjectURL(content);

    // 创建 <a> 标签
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.zip';
    a.style.display = 'none';

    // 添加 <a> 标签到页面
    document.body.appendChild(a);

    // 触发下载
    a.click();

    // 移除 <a> 标签
    a.remove();

    // 释放 URL 对象
    URL.revokeObjectURL(url);
  });
};

/**
 * @description: 打开介绍
 * @return {*}
 */
const openIllustrate = () => {
  showIllustrateModel.value = true;
};

/**
 * @description: 打开设置页面
 * @return {*}
 */
const openSetting = () => {
  settingFormRef.value?.handleModalOpen();
};

watch(route, newValue => {
  if (route.name == 'skill-note-list') {
    activeNav.value.id = newValue.params.id as string;
  } else if (route.name == 'skill') {
    activeNav.value.id = 0;
  } else if (route.name == 'dashboard') {
    activeNav.value.id = 'dashboard';
  }
});
</script>

<style lang="less" scoped>
.logo-box {
  > span {
    color: var(--eb-theme-color);
  }
}

.nav-item {
  display: flex;
  align-items: center;
  height: 28px;
  cursor: pointer;
  border-radius: 2px;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
