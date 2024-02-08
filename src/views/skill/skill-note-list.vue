<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-02 10:52:27
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-08 20:22:17
 * @FilePath: /experience-book-vue3/src/views/skill/skill-note-list.vue
 * @Description: 
-->
<template>
  <div class="flex h-screen overflow-hidden">
    <div
      class="note-area flex flex-col w-286 bg-eb-blue border-l border-r border-black-5"
      style="border-left-style: solid; border-right-style: solid"
    >
      <div class="border-b border-black-5" style="border-bottom-style: solid">
        <div class="flex items-center mt-20 pl-20 pr-15 relative">
          <span class="text-size-24 text-black font-bold flex-shrink-0 max-w-190 ellipsis">
            {{ pageData.name }}
          </span>

          <a-button class="add-note-btn ml-auto" type="primary" shape="circle" @click="addNote">
            <PlusOutlined size="20px" />
          </a-button>
        </div>

        <div class="text-size-12 text-black-45 pl-20 mt-5">
          {{ pageData.noteList?.length }}篇笔记
          <span class="font-bold ml-10"> {{ pageData.expTotal }} </span>exp
        </div>

        <div class="px-15 mb-10">
          <a-input
            v-model:value="search"
            placeholder="搜索笔记"
            class="search-input mt-10 rounded-none border-none"
          >
            <template #suffix>
              <span class="is-link">
                <SearchOutlined />
              </span>
            </template>
          </a-input>
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
                (triggerNode:any) => {
                  return triggerNode.parentNode
                }
              "
            >
              <div class="more-action ml-auto" @click.stop>
                <MoreOutlined />
              </div>
              <template #overlay>
                <a-menu @click="onDropdownClick($event, note)">
                  <a-menu-item key="delete">
                    <div class="text-red">删除</div>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>

          <div class="summary mb-12 text-size-14 ellipsis-3 text-black-65 h-60">
            {{ note.summary }}
          </div>

          <div class="info text-size-14 text-black-45 flex">
            <span>{{ note.exp }}exp</span>
            <span class="ml-auto">{{ note.createDateTime }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="note-editor overflow-y-auto flex-1 px-32 pt-40 bg-white w-0">
      <a-form
        :model="form"
        name="basic"
        labelAlign="left"
        :label-col="{ style: { width: '100px' } }"
      >
        <a-row align="top">
          <a-col :span="24">
            <a-form-item label="笔记标题">
              <a-input
                v-model:value="form.title"
                size="large"
                placeholder="请输入"
                :maxlength="50"
                @change="onInput"
              />
            </a-form-item>
          </a-col>
          <!-- <a-col :span="9" :offset="1">
            <a-form-item label="所属技能" name="skillId">
              <a-select
                ref="select"
                v-model:value="form.skillId"
                size="large"
                placeholder="请选择"
                show-search
                :filter-option="filterOption"
                optionFilterProp="label"
                @change="onChange"
              >
                <a-select-option
                  v-for="skill in skillOptionList"
                  :key="skill.id"
                  :value="skill.id"
                  >{{ skill.name }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col> -->
          <a-col :span="24">
            <a-form-item
              label="备注"
              name="username"
              :rules="[{ message: 'Please input your username!' }]"
              @change="onInput"
            >
              <a-input v-model:value="form.remark" size="large" placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>

      <MdEditor
        v-model="form.content"
        :preview="true"
        class="md-editor rounded-radius-4 h-300"
        height="300px"
        :toolbarsExclude="['github', 'next', 'revoke']"
        @on-save="onSave"
        @on-change="onChange"
      />

      <a-divider orientation="left">Get Exp！</a-divider>

      <a-row class="pb-30" :gutter="20">
        <a-col :span="21">
          <a-select class="w-full" v-model:value="exp" size="large" placeholder="请选择">
            <a-select-option :value="0">0</a-select-option>
            <a-select-option v-for="exp in 5" :key="exp" :value="exp">
              {{ exp }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col class="text-right" :span="3">
          <a-button class="w-full" type="primary" :disabled="exp == 0" size="large" @click="getExp">
            Get Exp!
          </a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NoteApi } from '@/api/note';
import { SkillApi } from '@/api/skill';
import {
  ExclamationCircleOutlined,
  MoreOutlined,
  SearchOutlined,
  PlusOutlined
} from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { computed, createVNode, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { MenuInfo } from 'ant-design-vue/es/menu/src/interface';
import * as _ from 'lodash';
import { subject } from '@/utils/subject';

interface NoteItem {
  id: number;
  title: string;
  exp: number;
  summary: string;
  createDateTime: Date;
}

interface ActiveNoteItem {
  id: number;
  title: string;
}

const route = useRoute();

const search = ref('');

const pageData = reactive({
  id: 0,
  name: '',
  expTotal: 0,
  noteList: <Array<NoteItem>>[]
});

const activeNote = ref<ActiveNoteItem>({ id: 0, title: '' });

const form = reactive({
  id: 0,
  title: '',
  skillId: null,
  remark: '',
  content: ''
});

const exp = ref(0);

const skillOptionList = ref<Array<{ id: number; name: string }>>([]);

// 计算属性
const resolveNoteList = computed(() => {
  return pageData.noteList.filter((e: any) => e.title.indexOf(search.value) > -1);
});

onMounted(async () => {
  getSkillOptions();

  await getNoteList();

  if (pageData.noteList.length) {
    activeNote.value = pageData.noteList[0];
    getNoteInfo(activeNote.value.id);
  }
});

onUnmounted(() => {
  subject.unsubscribe('click-skill-nav');
});

/**
 * @description: 获取技能下拉
 * @return {*}
 */
const getSkillOptions = async () => {
  const result = await SkillApi.getSkillOptionList();
  skillOptionList.value = result.data;
};

/**
 * @description: 搜索技能下拉方法
 * @param {*} input
 * @param {*} option
 * @return {*}
 */
// const filterOption = (input: string, option: any) => {
//   const item: any = skillOptionList.value.find((e: any) => e.id == option.value);

//   return item.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
// };

/**
 * @description: 点击笔记
 * @param {*} note
 * @return {*}
 */
const clickNote = (note: NoteItem) => {
  activeNote.value = note;
  getNoteInfo(note.id);
};

/**
 * @description: 点击笔记列表下拉方法
 * @param {*} data
 * @param {*} note
 * @return {*}
 */
const onDropdownClick = (data: MenuInfo, note: NoteItem) => {
  if (data.key == 'delete') {
    deleteNote(note);
  }
};

/**
 * @description: 添加笔记
 * @return {*}
 */
const addNote = async () => {
  const result = await NoteApi.add({ skillId: pageData.id });

  if (result.code) {
    await getNoteList();
    activeNote.value = pageData.noteList[0];
  } else {
    message.error(result.msg);
  }
};

/**
 * @description: 删除笔记
 * @param {*} note
 * @return {*}
 */
const deleteNote = async (note: NoteItem) => {
  Modal.confirm({
    title: `确定要删除${note.title}吗？`,
    icon: createVNode(ExclamationCircleOutlined),
    onOk: async () => {
      const result = await NoteApi.delele(note.id);

      if (result.code) {
        pageData.noteList = pageData.noteList.filter(e => e.id != note.id);
      } else {
        message.error(result.msg);
      }
    }
  });
};

/**
 * @description: 更新笔记
 * @return {*}
 */
const updateNote = async () => {
  const result = await NoteApi.update(activeNote.value.id, form);

  if (result.code) {
    getNoteList();
  } else {
    message.info(result.msg);
  }
};

/**
 * @description: 获取笔记列表
 * @return {*}
 */
const getNoteList = async () => {
  if (!route.params.id) {
    return;
  }

  const result = await SkillApi.getSkillNoteList(Number(route.params.id));
  const { code, data, msg } = result;

  if (code) {
    pageData.id = data.id;
    pageData.name = data.name;
    pageData.expTotal = data.expTotal;
    pageData.noteList = data.noteList;
  } else {
    message.error(msg);
  }
};

/**
 * @description: 获取笔记详情
 * @param {*} id
 * @return {*}
 */
const getNoteInfo = async (id: number) => {
  const result = await NoteApi.getById(id);

  const { data, code } = result;

  if (code == 1) {
    form.id = data.id;
    form.title = data.title;
    form.skillId = data.skillId;
    form.content = data.content;
    form.remark = data.remark;
  }
};

/**
 * @description: 得到经验
 * @return {*}
 */
const getExp = async () => {
  const result = await NoteApi.update(activeNote.value.id, { exp: exp });

  if (result.code) {
    getNoteList();
  } else {
    message.info(result.msg);
  }
};

/**
 * @description: 部分控件的Change事件
 * @param {*} function
 * @return {*}
 */
const onChange = _.debounce(function () {
  updateNote();
}, 650);

/**
 * @description: 部分控件的Input事件
 * @param {*} function
 * @return {*}
 */
const onInput = _.debounce(function () {
  updateNote();
}, 650);

/**
 * @description: 富文本编辑器的保存事件
 * @param {*} function
 * @return {*}
 */
const onSave = _.debounce(function () {
  updateNote();
});

watch(route, () => {
  getNoteList();
});
</script>

<style lang="less" scoped>
.add-note-btn {
}

.search-input {
  box-shadow: none !important;

  &:focus {
    box-shadow: none !important;
  }
}

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
