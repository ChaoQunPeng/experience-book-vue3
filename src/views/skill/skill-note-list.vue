<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-02 10:52:27
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-03 16:03:38
 * @FilePath: /experience-book-vue3/src/views/skill/skill-note-list.vue
 * @Description: 
-->
<template>
  <div class="flex h-screen overflow-hidden">
    <div
      class="note-area flex flex-col w-286 bg-eb-blue border-b border-black-5"
      style="border-right-style: solid"
    >
      <div class="pb-15 border-b border-black-5" style="border-bottom-style: solid">
        <div class="flex items-center mt-20 pl-20 pr-15 relative">
          <span class="text-size-24 text-black font-bold flex-shrink-0">全部</span>

          <a-input v-model:value="search" placeholder="搜索笔记" class="w-120 absolute right-20">
            <template #suffix>
              <span class="is-link">
                <SearchOutlined />
              </span>
            </template>
          </a-input>
        </div>

        <div class="text-size-12 text-black-45 pl-20 mt-5">
          {{ noteData.noteList.length }}篇笔记
          <span class="font-bold ml-10"> {{ noteData.expTotal }} </span>exp
        </div>
      </div>

      <div id="Note-List" class="note-list overflow-auto">
        <div
          v-for="note in resolveNoteList"
          :id="'Note-Card' + note.id"
          :key="note.id"
          class="note-card min-h-140 px-15 pt-10 pb-7 transition-all cursor-pointer"
          :class="{ active: activeNote.id == note.id }"
          @click="clickNote(note)"
        >
          <div class="header flex mb-6">
            <span class="text-size-16 ellipsis font-medium mb-6">{{ note.title }}</span>

            <a-dropdown
              trigger="click"
              :getPopupContainer="
                triggerNode => {
                  return triggerNode.parentNode || document.body;
                }
              "
            >
              <div class="more-action ml-auto" @click.stop>
                <MoreOutlined />
              </div>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <div class="text-red">删除</div>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>

          <div class="summary mb-12 text-size-14 ellipsis-3 text-black-65">{{ note.summary }}</div>

          <div class="info text-size-14 text-black-45 flex">
            <span>{{ note.exp }}exp</span>
            <span class="ml-auto">{{ note.createDateTime }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="note-editor overflow-y-auto flex-1 px-32 pt-40 bg-white">
      <a-form
        :model="form"
        name="basic"
        labelAlign="left"
        :label-col="{ style: { width: '100px' } }"
      >
        <a-row align="top">
          <a-col :span="24">
            <a-form-item
              label="笔记标题"
              name="username"
              :rules="[{ required: true, message: 'Please input your username!' }]"
            >
              <a-input
                v-model:value="form.title"
                size="large"
                placeholder="请输入"
                :maxlength="50"
              />
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item
              label="所属技能"
              name="skillId"
              :rules="[{ required: true, message: 'Please input your password!' }]"
            >
              <a-select
                ref="select"
                v-model:value="form.skillId"
                size="large"
                placeholder="请选择"
                show-search
                :filter-option="filterOption"
                optionFilterProp="label"
                allow-clear
              >
                <a-select-option
                  v-for="(skill, index) in skillOptionList"
                  :key="skill.id"
                  :value="skill.id"
                  >{{ skill.name }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item
              label="经验值"
              name="exp"
              :rules="[{ required: true, message: 'Please input your password!' }]"
            >
              <a-select ref="select" v-model:value="form.exp" size="large" placeholder="请选择">
                <a-select-option :value="0">0</a-select-option>
                <a-select-option v-for="exp in 5" :key="exp" :value="exp">
                  {{ exp }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="备注"
              name="username"
              :rules="[{ message: 'Please input your username!' }]"
            >
              <a-input v-model:value="form.remark" size="large" placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>

      <MdEditor
        v-model="content"
        :preview="true"
        class="md-editor rounded-radius-4 h-300"
        height="300px"
      />

      <div class="text-right">
        <a-space block class="mt-30">
          <a-button type="primary">保存</a-button>
          <a-button type="primary" :disabled="form.exp == 0">Get Exp!</a-button>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { axiosInstance } from '@/api/http';
import { MoreOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default {
  name: 'skill-note-list',

  components: {
    SearchOutlined,
    MoreOutlined,
    MdEditor
  },

  // props: {},

  data() {
    return {
      search: '',
      noteData: {
        noteList: []
      },
      activeNote: {},
      form: {
        title: '',
        skillId: null,
        exp: 0,
        remark: ''
      },
      content: '',
      skillOptionList: [],
      toolbars: ['italic', 'underline', '-', 'bold', '=', 'github']
    };
  },

  computed: {
    resolveNoteList() {
      return this.noteData.noteList.filter((e: any) => e.title.indexOf(this.search) > -1);
    }
  },

  created() {},

  async mounted() {
    this.getSkillOptions();
    await this.getNodeList();

    this.activeNote = this.noteData.noteList[0];
  },

  methods: {
    async getNodeList() {
      const res = await axiosInstance.get(`/api/skill/note-list?id=1`).catch(() => {});

      this.noteData = res.data.data;

      console.log(`this.noteData`, this.noteData);
    },
    clickNote(note) {
      this.activeNote = note;
    },
    getSkillOptions() {
      axiosInstance
        .get('/api/skill/nav')
        .then(res => {
          this.skillOptionList = res.data.data;
        })
        .catch(err => {
          console.error(err);
        });
    },
    filterOption(input: string, option: any) {
      const item: any = this.skillOptionList.find(e => e.id == option.value);

      return item.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },
    getPopupContainer(id) {
      this.$nextTick(() => {
        // console.log(document.getElementById('Note-List'));
        // console.log(document.getElementById('Note-List'));
      });

      return document.getElementById('Note-List');
      // return document.getElementById(id);
    }
  }

  // watch: {},

  // filters: {},
};
</script>

<style lang="less" scoped>
.note-card {
  &:hover {
    background: rgba(41, 145, 242, 0.05);

    .more-action {
      display: block;
    }
  }

  &.active {
    background: rgba(41, 145, 242, 0.05);

    .header {
      color: var(--eb-color-blue);
    }
  }

  .more-action {
    display: none;
  }
}

.ellipsis {
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 隐藏内容溢出部分 */
  text-overflow: ellipsis; /* 使用省略号表示被裁切的文本 */
}

.ellipsis-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3;
}

:deep(.ant-form-item .ant-form-item-label > label) {
  height: 40px;
}

.md-editor {
  height: 400px !important;
}
</style>
