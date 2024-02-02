<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-02 10:52:27
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-02 19:14:11
 * @FilePath: /experience-book-vue3/src/views/skill/skill-note-list.vue
 * @Description: 
-->
<template>
  <div class="flex h-screen overflow-hidden">
    <div class="note-area flex flex-col w-286 bg-eb-blue">
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

      <div class="note-list overflow-auto">
        <div
          v-for="note in resolveNoteList"
          :key="note.id"
          class="note-card min-h-140 px-15 pt-10 pb-7 transition-all cursor-pointer"
          :class="{ active: activeNote.id == note.id }"
          @click="clickNote(note)"
        >
          <div class="header flex mb-6">
            <span class="text-size-16 ellipsis font-medium mb-6">{{ note.title }}</span>
          </div>

          <div class="summary mb-12 text-size-14 ellipsis-3 text-black-65">{{ note.summary }}</div>

          <div class="info text-size-14 text-black-45 flex">
            <span>{{ note.exp }}exp</span>
            <span class="ml-auto">{{ note.createDateTime }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="note-editor flex-1">
      
    </div>
  </div>
</template>

<script lang="ts">
import { axiosInstance } from '@/api/http';
import { SearchOutlined } from '@ant-design/icons-vue';

export default {
  name: 'skill-note-list',

  components: {
    SearchOutlined
  },

  // props: {},

  data() {
    return {
      search: '',
      noteData: {
        noteList: []
      },
      activeNote: {}
    };
  },

  computed: {
    resolveNoteList() {
      return this.noteData.noteList.filter((e: any) => e.title.indexOf(this.search) > -1);
    }
  },

  created() {},

  async mounted() {
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
  }

  &.active {
    background: rgba(41, 145, 242, 0.05);

    .header {
      color: var(--eb-color-blue);
    }
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
</style>
