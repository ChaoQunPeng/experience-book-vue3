<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-01-30 17:03:04
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-15 20:09:27
 * @FilePath: /experience-book-vue3/src/layout/side-nav.vue
 * @Description: 
-->
<template>
  <div class="flex flex-col h-full border-r border-black-5" style="border-right-style: solid">
    <div class="h-36 flex items-center ml-30 mt-20 mb-20">
      <img class="size-22" src="@/assets/logo.svg" alt="logo" />
      <span class="text-size-26 font-medium ml-3 tracking-letter-spacing-1">xp-Book</span>
    </div>

    <div class="flex-1">
      <div class="w-220 mx-auto">
        <div
          class="nav-item flex items-center h-44 cursor-pointer pl-15 rounded transition-all text-black-45"
          :class="{ active: activeNav.id == 0 }"
          @click="clickNav({ id: 0 })"
        >
          <i class="iconfont icon-address-book-fill mr-12"></i>
          <span class="text-size-16 select-none">经验本</span>
        </div>
        <ul class="ml-24 mt-5">
          <li
            v-for="book in skillNavList"
            class="nav-item h-36 flex items-center pl-15 mb-8 rounded cursor-pointer text-black-45"
            :class="{ active: book.id == activeNav.id }"
            @click="clickNav(book)"
          >
            <i class="iconfont icon-tubiaozhizuomoban text-size-14 mr-12"></i>
            <span class="text-size-14 select-none">{{ book.name }}</span>
          </li>
        </ul>
      </div>

      <div class="w-220 mx-auto">
        <div
          class="nav-item flex items-center h-44 cursor-pointer pl-15 rounded transition-all text-black-45"
          :class="{ active: activeNav.id == 'dashboard' }"
          @click="clickNav({ id: 'dashboard' })"
        >
          <i class="iconfont icon-chart-area mr-15"></i>
          <span class="text-size-16 select-none">数据统计</span>
        </div>

        <!-- <ul v-if="false" class="ml-24 mt-5">
          <li
            v-for="taskNav in taskNavList"
            class="nav-item h-36 flex items-center pl-15 mb-5 rounded cursor-pointer text-black"
            :class="{ active: taskNav.id == activeNav.id }"
            @click="clickNav(taskNav)"
          >
            <span class="text-size-14 select-none">{{ taskNav.name }}</span>
          </li>
        </ul> -->
      </div>
    </div>

    <div class="w-220 mx-auto mb-20">
      <div
        class="nav-item flex items-center h-44 cursor-pointer pl-15 rounded transition-all text-black"
        @click="openIllustrate"
      >
        <i class="iconfont icon-tubiaozhizuomoban1 mr-15"></i>
        <span class="text-size-16 select-none">说明</span>
      </div>
    </div>

    <a-modal v-model:open="showIllustrateModel" title="项目介绍" width="800px" centered okText="">
      <shuoming></shuoming>

      <template #footer>
        <a-button key="back" @click="showIllustrateModel = false">了解</a-button>
      </template>
    </a-modal>
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
import shuoming from './shuoming.vue';

const route = useRoute();

interface navOption {
  id?: string | number;
  name?: string;
}

const skillNavList = ref<Array<navOption>>([]);
const activeNav = ref<navOption>({});

onMounted(() => {
  subject.subscribe('after-skill-curd', getList);

  getList();
});

onUnmounted(() => {
  subject.unsubscribe('after-skill-curd', getList);
});

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

const showIllustrateModel = ref(false);

/**
 * @description: 打开说明
 * @return {*}
 */
const openIllustrate = () => {
  showIllustrateModel.value = true;
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
.nav-item {
  // display: flex;
  // align-items: center;
  // height: 44px;
  // cursor: pointer;
  // padding-left: 15;
  // border-radius: 4px;

  &.active {
    background: rgba(246, 248, 250, 1);
    color: var(--eb-color-black);
    font-weight: 500;

    // i,
    // span {
    //   color: var(--eb-color-black);
    // }
  }

  &:hover {
    background: rgba(246, 248, 250, 1);
  }
}
</style>
