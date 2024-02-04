<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-01-30 17:03:04
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-04 11:10:55
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
          @click="openExpBookList({ id: 0 })"
        >
          <i
            class="iconfont icon-shuji-line"
            :class="[activeNav.id == 0 ? 'icon-shuji-fill' : 'icon-shuji-line']"
          ></i>
          <span class="text-size-16 text-black select-none">经验本</span>
        </div>
        <ul class="ml-24 mt-5">
          <li
            v-for="book in bookNavList"
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
          @click="openTaskList({ id: 'all-title' })"
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

<script src="./side-nav.ts" lang="ts"></script>

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
