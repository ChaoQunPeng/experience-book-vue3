<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-01 14:28:58
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-01 22:47:30
 * @FilePath: /experience-book-vue3/src/views/skill/skill-index.vue
 * @Description:  技能列表
-->
<template>
  <div>
    <div class="flex mt-30 mb-20 px-20">
      <a-input
        v-model:value="search"
        class="w-270"
        placeholder="搜索"
        size="large"
        allow-clear
      ></a-input>
      <a-button class="ml-auto" type="primary" shape="circle" size="large">
        <template #icon>
          <PlusOutlined />
        </template>
      </a-button>
    </div>

    <a-row class="px-20" :gutter="20">
      <a-col v-for="skill in resolveSkillList" :key="skill.id" :span="6" class="mb-20">
        <div class="skill-card flex flex-col p-15 rounded-radius-4 bg-white h-160 cursor-pointer">
          <div class="flex mb-4">
            <span class="font-bold text-size-20 text-black leading-normal skill-name transition-all"
              >{{ skill.name }}
            </span>
            <MoreOutlined class="ml-auto is-link text-size-16" />
          </div>

          <div class="leading-normal text-size-12 text-black-65">
            {{ skill.description }}
          </div>

          <div class="mt-auto">
            <div class="flex items-center mb-8" :class="skill.color">
              <span
                class="level-badge rounded-radius-4 p-6 text-size-12 leading-none mr-4"
                :class="skill.color"
              >
                {{ skill.levelName }}
              </span>

              <template v-for="i in 5" :key="i">
                <!-- <i
                  class="iconfont icon-xingxing-fill star"
                  :class="skill.level > i ? `active-${skill.color}` : skill.color"
                ></i> -->

                <i
                  class="iconfont icon-xingxing-fill star"
                  :class="i < skill.level ? `active-${skill.color}` : skill.color"
                ></i>
              </template>

              <span class="ml-auto text-size-12 text-black leading-none">
                {{ skill.range[0] }}/{{ skill.range[1] }}exp
              </span>
            </div>

            <a-progress
              class="progress-bar"
              :percent="skill.currentLevelExp"
              :showInfo="false"
              :size="3"
              status="active"
              :stroke-color="resolveProgressstrokeColor(skill.color)"
            />
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<!-- <script src="./skill-index.ts" lang="ts"></script> -->

<script lang="ts">
import { defineComponent } from 'vue';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons-vue';
import { axiosInstance } from '@/api/http';

export default defineComponent({
  components: {
    PlusOutlined,
    MoreOutlined
  },

  data() {
    return {
      search: '',
      skillList: [] as any
    };
  },

  computed: {
    resolveSkillList() {
      return this.skillList.filter((e: any) => e.name.indexOf(this.search) > -1);
    },
    resolveProgressstrokeColor() {
      return function (color: string) {
        if (color == 'black') {
          return '#1f3349';
        } else if (color == 'blue') {
          return '#198cff';
        } else if (color == 'red') {
          return '#e31700';
        } else if (color == 'purple') {
          return '#8525fa';
        } else if (color == 'green') {
          return '#5dce00';
        }
      };
    }
  },

  created() {
    this.getList();
  },

  methods: {
    async getList() {
      axiosInstance
        .get('/api/skill/list')
        .then(res => {
          this.skillList = res.data.data;
        })
        .catch(err => {});
    }
  }
});
</script>

<style lang="less" scoped>
@import '../../assets/theme/var.less';

.skill-card {
  &:hover {
    .skill-name {
      color: var(--eb-color-blue);
    }
  }

  .level-badge {
    color: #fff;

    &.black {
      background: var(--eb-color-black);
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
