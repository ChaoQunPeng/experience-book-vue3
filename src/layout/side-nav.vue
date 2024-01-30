<template>
  <div>
    <div class="w-132 h-36 flex items-center mx-auto mt-20">
      <img class="size-22" src="@/assets/logo.svg" alt="logo" />
      <span class="text-size-26 font-medium">xp-Book</span>
    </div>

    <div class="mt-20">
      <div>
        <i></i>
        <span>经验本</span>
      </div>
      <ul>
        <li v-for="item in list">
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="./side-nav"></script>

<style lang="less" scoped></style>
