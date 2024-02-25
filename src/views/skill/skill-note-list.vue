<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-02 10:52:27
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-25 11:54:02
 * @FilePath: /experience-book-vue3/src/views/skill/skill-note-list.vue
 * @Description: 
-->
<template>
  <div class="flex h-screen overflow-hidden">
    <div
      class="note-area flex flex-col w-286 border-r border-eb-border-color flex-shrink-0"
      style="border-right-style: solid"
    >
      <div class="border-b border-eb-border-color" style="border-bottom-style: solid">
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
          <span class="ml-10"> {{ pageData.expTotal }} </span>exp
        </div>

        <div class="flex items-center px-15 mt-10 mb-10">
          <a-input
            v-model:value="search"
            placeholder="搜索笔记"
            class="search-input rounded-none border-none"
          >
            <template #suffix>
              <span class="is-link">
                <SearchOutlined />
              </span>
            </template>
          </a-input>

          <a-tooltip :mouse-enter-delay="0.8">
            <template #title>筛选出经验值为0的笔记</template>
            <i
              class="iconfont cursor-pointer ml-10 filter-btn"
              :class="[
                {
                  'text-blue': noteListQueryParams.expIs0
                },
                noteListQueryParams.expIs0 ? 'icon-filter-fill' : 'icon-filter'
              ]"
              @click="handleFilterNoteList"
            ></i>
          </a-tooltip>
        </div>
      </div>

      <!-- 菜单列表 -->
      <div id="Note-List" class="note-list overflow-auto flex-1">
        <div
          v-for="note in resolveNoteList"
          :id="'Note-Card' + note.id"
          :key="note.id"
          class="note-card min-h-140 px-15 pt-15 pb-10 transition-all cursor-pointer"
          :class="{ active: activeNote.id == note.id }"
          @click="clickNote(note)"
        >
          <div class="header flex mb-6">
            <span class="text-size-16 ellipsis font-medium mb-6">{{ note.title || '无标题' }}</span>

            <span @click.stop class="ml-auto">
              <a-dropdown
                trigger="click"
                :getPopupContainer="
                (triggerNode:any) => {
                  return triggerNode.parentNode
                }
              "
              >
                <div class="more-action" @click.stop>
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
            </span>
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

    <!-- 编辑器 -->
    <div
      v-if="activeNote.id"
      class="note-editor flex flex-col overflow-y-auto bg-white w-full overflow-x-hidden"
    >
      <a-form
        :model="form"
        ref="formRef"
        name="basic"
        labelAlign="left"
        :label-col="{ style: { width: '100px' } }"
      >
        <a-row align="top">
          <a-col :span="24">
            <a-form-item class="mb-0">
              <a-input
                class="title-input text-size-24 px-20 py-14 border-none rounded-none"
                v-model:value="form.title"
                size="large"
                placeholder="无标题"
                :maxlength="100"
                @change="onInput"
                @focus="onFocus"
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

          <!-- <a-col :span="24">
            <a-form-item
              label="备注"
              name="username"
              :rules="[{ message: 'Please input your username!' }]"
              @change="onInput"
            >
              <a-input v-model:value="form.remark" size="large" placeholder="请输入" />
            </a-form-item>
          </a-col> -->
        </a-row>
      </a-form>

      <MdEditor
        ref="mdEditorRef"
        v-model="content"
        :preview="true"
        class="md-editor"
        :toolbarsExclude="['github', 'next', 'revoke']"
        @on-save="onSave"
        @on-change="onChange"
        @on-focus="editorOnFocus"
        @on-blur="editorOnBlur"
      />

      <a-divider orientation="left">
        Get Exp！
        <span class="text-size-14 text-black-45 font-normal">(1小时=1exp)</span>
      </a-divider>

      <a-row class="px-20 pb-30" :gutter="20">
        <a-col :span="21">
          <a-select class="w-full" v-model:value="exp" size="large" placeholder="请选择">
            <a-select-option :value="0" :label="0"> 0exp </a-select-option>
            <a-select-option v-for="exp in 24" :key="exp" :value="exp" :label="exp">
              {{ exp }}exp
            </a-select-option>
          </a-select>
        </a-col>
        <a-col class="text-right" :span="3">
          <a-button class="w-full" type="primary" size="large" @click="getExp"> Get Exp! </a-button>
        </a-col>
      </a-row>
    </div>
    <div v-else class="bg-white"></div>
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
import { FormInstance, Modal } from 'ant-design-vue';
import { ExposeParam, MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { computed, createVNode, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { MenuInfo } from 'ant-design-vue/es/menu/src/interface';
import * as _ from 'lodash';
import { subject } from '@/utils/subject';
import { CommonApi } from '@/api/common';

interface NoteItem {
  id: number;
  title: string;
  exp: number;
  summary: string;
  createDateTime: Date;
}

interface ActiveNoteItem {
  id: number;
  // title: string;
}

const route = useRoute();

const search = ref('');

const pageData = reactive({
  id: 0,
  name: '',
  expTotal: 0,
  noteList: <Array<NoteItem>>[]
});

const activeNote = ref<ActiveNoteItem>({ id: 0 });

const form = reactive({
  id: 0,
  title: '',
  skillId: null,
  remark: ''
});

const content = ref('');
const exp = ref(0);
const editorIsActived = ref(false);
const mdEditorIsFocus = ref(false);

const skillOptionList = ref<Array<{ id: number; name: string }>>([]);

const formRef = ref<FormInstance>();
const mdEditorRef = ref<ExposeParam>();
const apiSignal = ref<AbortController | null>(null);

const noteListQueryParams = reactive({
  expIs0: false
});

// 计算属性
const resolveNoteList = computed(() => {
  const finalList = pageData.noteList.filter((e: any) => e.title.indexOf(search.value) > -1);

  if (noteListQueryParams.expIs0) {
    return finalList.filter((e: any) => e.exp == 0);
  }

  return finalList;
});

onMounted(async () => {
  subject.subscribe('click-skill-nav', onClickSkillNav);

  document.addEventListener('paste', getBolb);

  getSkillOptions();

  await getNoteList();

  if (pageData.noteList.length > 0) {
    activeNote.value = pageData.noteList[0];
    getNoteInfo(activeNote.value.id);
  }
});

onUnmounted(() => {
  subject.unsubscribe('click-skill-nav', onClickSkillNav);

  document.removeEventListener('paste', getBolb);
});

/**
 * @description: 筛选exp=0的数据
 * @return {*}
 */
const handleFilterNoteList = () => {
  noteListQueryParams.expIs0 = !noteListQueryParams.expIs0;
};

/**
 * @description: 处理编辑器粘贴事件
 * @param {*} e
 * @return {*}
 */
const getBolb = async (e: any) => {
  // md编辑器获得焦点才能进行粘贴操作
  if (!mdEditorIsFocus.value) {
    return;
  }

  let cbd: any = e.clipboardData;

  // 如果是 Safari 直接 return
  if (!(e.clipboardData && e.clipboardData.items)) {
    return;
  }

  for (var i = 0; i < cbd.items.length; i++) {
    var item = cbd.items[i];
    if (item.kind == 'file') {
      var blob = item.getAsFile();
      if (blob.size === 0) {
        return;
      }
      // blob 就是从剪切板获得的文件 可以进行上传或其他操作
      const formData = new FormData();

      formData.append('skillId', pageData.id.toString());
      formData.append('noteId', activeNote.value.id.toString());
      formData.append('file', blob);

      const result = await CommonApi.upload(formData);

      if (result.code == 0) {
        message.error(result.msg);
        return;
      }

      mdEditorRef.value?.insert(() => {
        return {
          targetValue: `![图片](/images/${result.data.name})`,
          select: false,
          deviationStart: 0,
          deviationEnd: 0
        };
      });
    }
  }
};

/**
 * @description: 点击技能导航
 * @return {*}
 */
const onClickSkillNav = () => {
  editorIsActived.value = false;
};

/**
 * @description: 获取技能下拉
 * @return {*}
 */
const getSkillOptions = async () => {
  const result = await SkillApi.getSkillOptionList();
  skillOptionList.value = result.data;
};

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
    getNoteInfo(activeNote.value.id);
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
    title: `确定要删除【${note.title}】吗？`,
    icon: createVNode(ExclamationCircleOutlined),
    onOk: async () => {
      const result = await NoteApi.delele(note.id);

      if (result.code) {
        pageData.noteList = pageData.noteList.filter(e => e.id != note.id);

        if (pageData.noteList.findIndex(e => e.id == note.id) == -1) {
          if (pageData.noteList.length == 0) {
            activeNote.value.id = 0;
          } else {
            await getNoteInfo(pageData.noteList[0].id);
            activeNote.value = pageData.noteList[0];
          }
        }
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
  const reg = new RegExp("'", 'g');

  const result = await NoteApi.update(activeNote.value.id, {
    ...form,
    content: content.value.replace(reg, "\\'")
  });

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
  if (apiSignal.value) {
    apiSignal.value.abort();
    apiSignal.value = null;
  }

  const controller = new AbortController();
  apiSignal.value = controller;

  const result = await NoteApi.getById(id, { signal: controller.signal }).catch(err => {
    console.log(`err`, err);
  });

  // 取消请求后会是undefined
  if (!result) {
    return;
  }

  const { data, code } = <{ data: any; code: number }>result;

  if (code == 1) {
    form.id = data.id;
    form.title = data.title;
    form.skillId = data.skillId;
    form.remark = data.remark;

    content.value = data.content;
    exp.value = data.exp;
  }
};

/**
 * @description: 得到经验
 * @return {*}
 */
const getExp = async () => {
  const result = await NoteApi.updateExp(activeNote.value.id, exp.value);

  if (result.code) {
    if (exp.value > 0) {
      message.success(`恭喜你，获得了 ${exp.value}exp！`);
    } else {
      message.warning(`要继续学习呢~ o(╥﹏╥)o`);
    }

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
  if (editorIsActived.value) {
    updateNote();
  }
}, 500);

/**
 * @description: 编辑器获得焦点
 * @return {*}
 */
const editorOnFocus = () => {
  editorIsActived.value = true;
  mdEditorIsFocus.value = true;
};

/**
 * @description: 编辑器失焦事件
 * @return {*}
 */
const editorOnBlur = () => {
  mdEditorIsFocus.value = false;
};
/**
 * @description: 控件的Input事件
 * @param {*} function
 * @return {*}
 */
const onInput = _.debounce(function () {
  if (editorIsActived.value) {
    updateNote();
  }
}, 500);

/**
 * @description: 控件的focus事件
 * @return {*}
 */
const onFocus = () => {
  editorIsActived.value = true;
};

/**
 * @description: 富文本编辑器的保存事件
 * @param {*} function
 * @return {*}
 */
const onSave = _.debounce(function () {
  updateNote();
});

watch(route, async () => {
  await getNoteList();

  if (pageData.noteList.length > 0) {
    activeNote.value = pageData.noteList[0];
    getNoteInfo(activeNote.value.id);
  } else {
    activeNote.value = { id: 0 };

    form.id = 0;
    form.remark = '';
    form.skillId = null;
    form.title = '';

    content.value = '';
    exp.value = 0;
  }
});
</script>

<style lang="less" scoped>
.search-input {
  box-shadow: none !important;

  &:focus {
    box-shadow: none !important;
  }
}

.note-area {
  background: var(--eb-theme-bg-color);
}

.note-card {
  &:hover {
    background: rgba(41, 145, 242, 0.05);

    .more-action {
      display: block;
    }
  }

  &.active {
    background: rgba(41, 145, 242, 0.2);

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
  border: none;
  border-top: 1px solid rgba(31, 51, 73, 0.08);
  border-bottom: 1px solid rgba(31, 51, 73, 0.08);
  height: 100vh !important;
}
</style>
