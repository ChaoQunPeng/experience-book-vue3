<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-01 14:28:58
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-12 17:49:03
 * @FilePath: /experience-book-vue3/src/views/skill/skill-index.vue
 * @Description:  技能列表
-->
<template>
  <div class="bg-eb-blue pt-30 h-full">
    <div class="flex mb-20 px-20">
      <a-input
        v-model:value="search"
        class="w-270"
        placeholder="搜索"
        size="large"
        allow-clear
      ></a-input>
      <a-button class="ml-auto" type="primary" shape="circle" size="large" @click="openSkillForm">
        <template #icon>
          <PlusOutlined />
        </template>
      </a-button>
    </div>

    <a-row class="px-20" :gutter="20">
      <a-col v-for="skill in resolveSkillList" :key="skill.id" :span="6" class="mb-20">
        <div
          class="skill-card flex flex-col p-15 rounded-radius-4 bg-white h-160 cursor-pointer"
          @click="goNoteList(skill)"
        >
          <div class="flex mb-4 items-center">
            <span
              class="font-bold text-size-20 text-black leading-normal skill-name transition-all"
            >
              {{ skill.name }}
            </span>

            <a-dropdown class="ml-auto" trigger="click">
              <span @click.stop>
                <MoreOutlined class="is-link text-size-16" />
              </span>

              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <div @click="openSkillForm({ editId: skill.id })">编辑</div>
                  </a-menu-item>
                  <a-menu-item>
                    <div class="text-red" @click="confirmDelete(skill)">删除</div>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>

          <!-- <div>
            <span>笔记数量 {{ skill.noteTotal }}</span>
            <span>总经验值 {{ skill.expTotal }}</span>
          </div> -->

          <!-- <div class="leading-normal text-size-12 text-black-65">
            {{ skill.description }}
          </div> -->

          <div class="mt-auto">
            <div class="flex items-center mb-8" :class="skill.color">
              <span
                class="level-badge rounded-radius-4 p-6 text-size-12 leading-none mr-4"
                :class="skill.color"
              >
                {{ skill.levelName }}
              </span>

              <template v-for="i in 5" :key="i">
                <i
                  class="iconfont icon-xingxing-fill star"
                  :class="i <= skill.level ? `active-${skill.color}` : skill.color"
                ></i>
              </template>

              <span class="ml-auto text-size-12 text-black leading-none">
                {{ skill.currentLevelExp }}/{{ Number(skill.range[1]) - Number(skill.range[0]) }}exp
              </span>
            </div>

            <a-progress
              class="progress-bar"
              :percent="resolvePercent(skill)"
              :showInfo="false"
              :size="3"
              status="active"
              :stroke-color="resolveProgressstrokeColor(skill.color)"
            />
          </div>
        </div>
      </a-col>
    </a-row>

    <skill-form ref="skillFormRef"></skill-form>
  </div>
</template>

<script setup lang="ts">
import { PlusOutlined, MoreOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import SkillForm from './skill-form.vue';
import { Modal, message } from 'ant-design-vue';
import { SkillApi } from '@/api/skill';
import { computed, createVNode, onMounted, ref } from 'vue';
import router from '@/router';
import { subject } from '@/utils/subject';

interface SkillListItem {
  id: number;
  name: string;
  description: string;
  level: number;
  levelName: string;
  currentLevelExp: number;
  color: string;
  expTotal: number | string;
  noteTotal: number | string;
  range: Array<number>[];
}

const search = ref('');
const skillList = ref<Array<SkillListItem>>([]);

const skillFormRef = ref<InstanceType<typeof SkillForm>>();

const resolveSkillList = computed<Array<SkillListItem>>(() => {
  return skillList.value.filter((e: any) => e.name.indexOf(search.value) > -1);
});

// 计算属性
const resolveProgressstrokeColor = computed<Function>(() => {
  return function (color: string) {
    if (color == 'black') {
      return '#1f3349';
    } else if (color == 'black-85') {
      return 'rgba(31, 51, 73, 0.85)';
    } else if (color == 'blue') {
      return '#198cff';
    } else if (color == 'red') {
      return '#e31700';
    } else if (color == 'purple') {
      return '#8525fa';
    } else if (color == 'green') {
      return '#5dce00';
    } else {
      return '';
    }
  };
});

const resolvePercent = computed(() => {
  return function (skill: SkillListItem) {
    const s = skill.range[0] as unknown as number;
    const e = skill.range[1] as unknown as number;

    const d = (e - s) as unknown as number;

    return (skill.currentLevelExp / d) * 100;
  };
});

onMounted(() => {
  getList();
});

/**
 * @description: 获取列表
 * @return {*}
 */
const getList = async () => {
  const result = await SkillApi.getSkillList();

  if (result.code) {
    skillList.value = result.data;
  } else {
    message.error(`获取技能列表错误`);
  }
};

/**
 * @description: 打开技能表单
 * @param {*} options
 * @return {*}
 */
const openSkillForm = (options: { editId?: number }) => {
  skillFormRef.value?.open({
    editId: options?.editId,
    onOk: () => {
      getList();
      skillFormRef.value?.handleVisible();
    }
  });
};

/**
 * @description: 二次确认删除
 * @param {*} skill
 * @return {*}
 */
const confirmDelete = (skill: SkillListItem) => {
  Modal.confirm({
    title: `确定要删除${skill.name}吗？`,
    icon: createVNode(ExclamationCircleOutlined),
    onOk: async () => {
      const result = await SkillApi.delele(skill.id);

      if (result.code) {
        getList();
        subject.publish('after-skill-curd');
      } else {
        message.error(result.msg);
      }
    }
  });
};

/**
 * @description: 前往笔记列表
 * @param {*} skill
 * @return {*}
 */
const goNoteList = (skill: SkillListItem) => {
  router.push({ path: `/skill-note-list/${skill.id}` });
};
</script>

<style lang="less" scoped>
@import '../../assets/theme/var.less';

.skill-card {
  box-shadow: 0 0 0 rgba(31, 51, 73, 0);
  transform: translateY(0);
  transition: all 0.3s;

  &:hover {
    box-shadow: 5px 5px 10px rgba(31, 51, 73, 0.09);
    transform: translateY(-5px);
  }

  .level-badge {
    color: #fff;

    &.black {
      background: var(--eb-color-black);
    }

    &.black-85 {
      background: var(--eb-color-black-85);
    }

    &.green {
      background: var(--eb-color-green);
    }

    &.blue {
      background: var(--eb-color-blue);
    }

    &.red {
      background: var(--eb-color-red);
    }

    &.purple {
      background: var(--eb-color-purple);
    }

    &.gold {
      background: var(--eb-color-gold);
    }
  }

  .star {
    &.black {
      color: fade(@eb-color-black, 10%);
    }

    &.active-black {
      color: @eb-color-black;
    }

    &.black-85 {
      color: fade(@eb-color-black, 10%);
    }

    &.active-black-85 {
      color: var(--eb-color-black-45);
    }

    &.green {
      color: fade(@eb-color-green, 10%);
    }

    &.active-green {
      color: @eb-color-green;
    }

    &.blue {
      color: fade(@eb-color-blue, 10%);
    }

    &.active-blue {
      color: @eb-color-blue;
    }

    &.red {
      color: fade(@eb-color-red, 10%);
    }

    &.active-red {
      color: @eb-color-red;
    }

    &.purple {
      color: fade(@eb-color-purple, 10%);
    }

    &.active-purple {
      color: @eb-color-purple;
    }

    &.gold {
      color: fade(@eb-color-gold, 10%);
    }

    &.active-gold {
      color: @eb-color-gold;
    }
  }
}

.progress-bar {
  display: flex;
  margin-bottom: 0;

  :deep(.ant-progress-outer) {
    display: flex;
  }
}
</style>
