<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-01-30 17:03:04
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-08 12:36:03
 * @FilePath: /experience-book-vue3/src/layout/side-nav.vue
 * @Description: 
-->
<template>
  <div>
    <div class="h-36 flex items-center ml-30 mt-20">
      <img class="size-22" src="@/assets/logo.svg" alt="logo" />
      <span class="text-size-26 font-medium">xp-Book</span>
    </div>

    <div class="mt-20">
      <div class="w-220 mx-auto">
        <div
          class="nav-item flex items-center h-44 cursor-pointer pl-15 rounded transition-all text-black"
          :class="{ active: activeNav.id == 0 }"
          @click="clickNav({ id: 0 })"
        >
          <i
            class="iconfont icon-shuji-line"
            :class="[activeNav.id == 0 ? 'icon-shuji-fill' : 'icon-shuji-line']"
          ></i>
          <span class="text-size-16 text-black select-none">经验本</span>
        </div>
        <ul class="ml-24 mt-5">
          <li
            v-for="book in skillNavList"
            class="nav-item h-36 flex items-center pl-15 mb-5 rounded cursor-pointer"
            :class="{ active: book.id == activeNav.id }"
            @click="clickNav(book)"
          >
            <span class="text-size-14 text-black select-none">{{ book.name }}</span>
          </li>
        </ul>
      </div>

      <div class="w-220 mx-auto">
        <div
          class="nav-item flex items-center h-44 cursor-pointer pl-15 rounded transition-all text-black"
          :class="{ active: activeNav.id == 'all-title' }"
          @click="clickNav({ id: 'all-title' })"
        >
          <i></i>
          <span class="text-size-16 text-black select-none">任务</span>
        </div>
        <ul class="ml-24 mt-5">
          <li
            v-for="taskNav in taskNavList"
            class="nav-item h-36 flex items-center pl-15 mb-5 rounded cursor-pointer text-black"
            :class="{ active: taskNav.id == activeNav.id }"
            @click="clickNav(taskNav)"
          >
            <span class="text-size-14 select-none">{{ taskNav.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<!-- <script src="./side-nav.ts" lang="ts"></script> -->
<script setup lang="ts">
import { SkillApi } from '@/api/skill';
import { Ref, onMounted, ref, watch } from 'vue';
import { usePageNav } from './nav';
import { useRoute } from 'vue-router';
import { subject } from '../utils/subject';
import { message } from 'ant-design-vue';

const route = useRoute();

interface navOption {
  id?: string | number;
  name?: string;
}

const skillNavList = ref<Array<navOption>>([]);
const activeNav = ref<navOption>({});
const taskNavList: Ref<Array<navOption>> = ref([
  {
    id: 'all',
    name: '全部'
  },
  {
    id: 'myDay',
    name: '我的一天'
  },
  {
    id: 'important',
    name: '重要'
  },
  {
    id: 'deadline',
    name: '今天截止'
  }
]);

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

  const { goSkillNoteList, goSkillIndex } = usePageNav();

  if (activeNav.value.id == 0) {
    goSkillIndex();
  } else {
    subject.publish('click-skill-nav', nav);
    goSkillNoteList(<number>activeNav.value.id);
  }
};

onMounted(() => {
  subject.publish('click-skill-nav');
  console.log(`subjectsubject`, subject);

  getList();
});

watch(route, newValue => {
  activeNav.value.id = (newValue.params.id as string) ?? 0;
});
</script>

<style lang="less" scoped>
.nav-item {
  &.active {
    background: rgba(246, 248, 250, 1);
    color: var(--eb-color-blue);
    font-weight: 500;

    i,
    span {
      color: var(--eb-color-blue);
    }
  }

  &:hover {
    background: rgba(246, 248, 250, 1);
  }
}
</style>
