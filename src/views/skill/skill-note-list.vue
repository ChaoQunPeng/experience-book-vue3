<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-02 10:52:27
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-06 17:48:33
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
          <span class="text-size-24 text-black font-bold flex-shrink-0">{{ pageData.name }}</span>

          <a-button class="add-note-btn ml-auto" type="primary" shape="circle" @click="addNote">
            <PlusOutlined size="20px" />
          </a-button>
        </div>

        <div class="text-size-12 text-black-45 pl-20 mt-5">
          {{ pageData.noteList?.length }}篇笔记
          <span class="font-bold ml-10"> {{ pageData.expTotal }} </span>exp
        </div>

        <a-input
          v-model:value="search"
          placeholder="搜索笔记"
          class="mt-10 rounded-none border-none"
        >
          <template #suffix>
            <span class="is-link">
              <SearchOutlined />
            </span>
          </template>
        </a-input>
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
              />
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="所属技能" name="skillId">
              <a-select
                ref="select"
                v-model:value="form.skillId"
                size="large"
                placeholder="请选择"
                show-search
                :filter-option="filterOption"
                optionFilterProp="label"
              >
                <a-select-option
                  v-for="skill in skillOptionList"
                  :key="skill.id"
                  :value="skill.id"
                  >{{ skill.name }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item label="经验值" name="exp">
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
        v-model="form.content"
        :preview="true"
        class="md-editor rounded-radius-4 h-300"
        height="300px"
        :toolbarsExclude="['github', 'next', 'revoke']"
      />

      <div class="text-right">
        <a-space block class="mt-30">
          <a-button type="primary" @click="updateNote">保存</a-button>
          <a-button type="primary" :disabled="form.exp == 0" @click="getExp">Get Exp!</a-button>
        </a-space>
      </div>
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
import { MenuProps, Modal } from 'ant-design-vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { computed, createVNode, onMounted, onUnmounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { MenuInfo } from 'ant-design-vue/es/menu/src/interface';

// const [messageApi, contextHolder] = message.useMessage();

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
  name: '测试的技能',
  expTotal: 0,
  noteList: <Array<NoteItem>>[]
});

const activeNote = ref<ActiveNoteItem>({ id: 0, title: '' });

const form = reactive({
  id: 0,
  title: '',
  skillId: null,
  exp: 0,
  remark: '',
  content: ''
});

const skillOptionList = ref<Array<{ id: number; name: string }>>([]);

// const toolbars = ['italic', 'underline', '-', 'bold', '=', 'github'];

const resolveNoteList = computed(() => {
  return pageData.noteList.filter((e: any) => e.title.indexOf(search.value) > -1);
});

onMounted(async () => {
  getSkillOptions();

  await getNoteList();
  activeNote.value = pageData.noteList[0];

  getNoteInfo(activeNote.value.id);
});

const getNoteList = async () => {
  const result = await SkillApi.getSkillNoteList(Number(route.params.id));
  const { data } = result;

  pageData.id = data.id;
  pageData.name = data.name;
  pageData.expTotal = data.expTotal;
  pageData.noteList = data.noteList;
};

const clickNote = (note: NoteItem) => {
  activeNote.value = note;
  getNoteInfo(note.id);
};

const getSkillOptions = async () => {
  const result = await SkillApi.getSkillOptionList().catch(() => {});
  skillOptionList.value = result.data;
};

const filterOption = (input: string, option: any) => {
  const item: any = skillOptionList.value.find((e: any) => e.id == option.value);

  return item.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

const addNote = async () => {
  const result = await NoteApi.add({ skillId: pageData.id });

  if (result.code) {
    getNoteList();
  }
};

// const onDropdownClick: MenuProps['onClick'] = (data: any, note: NoteItem) => {
//   if (data() == 'delete') {
//     deleteNote(note);
//   }
// };

const onDropdownClick = (data: MenuInfo, node: NoteItem) => {
  if (data.key == 'delete') {
    deleteNote(node);
  }
};

const deleteNote = async (note: NoteItem) => {
  Modal.confirm({
    title: `确定要删除${note.title}吗？`,
    icon: createVNode(ExclamationCircleOutlined),
    onOk: async () => {
      const result = await NoteApi.delele(note.id);

      if (result) {
        pageData.noteList = pageData.noteList.filter(e => e.id != note.id);
      }
    },

    onCancel() {
      console.log('Cancel');
    }
  });
};

const updateNote = async () => {
  const formData = JSON.parse(JSON.stringify(form));
  delete formData.exp;

  const result = await NoteApi.update(activeNote.value.id, formData);

  if (result.code) {
    getNoteList();
  } else {
    message.info(result.msg);
  }
};

const getExp = async () => {
  const result = await NoteApi.update(activeNote.value.id, { exp: form.exp });

  if (result.code) {
    getNoteList();
  } else {
    message.info(result.msg);
  }
};

const getNoteInfo = async (id: number) => {
  const result = await NoteApi.getById(id);

  const { data, code } = result;

  if (code == 1) {
    form.id = data.id;
    form.title = data.title;
    form.skillId = data.skillId;
    form.exp = data.exp;
    form.content = data.content;
    form.remark = data.remark;
  }
};
</script>

<!-- <script lang="ts">
import { axiosInstance } from '@/api/config/http';
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
      pageData: {
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
      return this.pageData.noteList.filter((e: any) => e.title.indexOf(this.search) > -1);
    }
  },

  created() {},

  async mounted() {
    this.getSkillOptions();
    await this.getNoteList();

    this.activeNote = this.pageData.noteList[0];
  },

  methods: {
    async getNoteList() {
      const res = await axiosInstance.get(`/api/skill/note-list`).catch(() => {});

      this.pageData = res.data.data;

      console.log(`this.pageData`, this.pageData);
    },
    clickNote(note) {
      this.activeNote = note;
    },
    getSkillOptions() {
      axiosInstance
        .get('/api/skill/options')
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
</script> -->

<style lang="less" scoped>
.add-note-btn {
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
