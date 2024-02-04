<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-04 12:16:40
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-04 17:42:59
 * @FilePath: /experience-book-vue3/src/views/skill/skill-form.vue
 * @Description: 
-->
<template>
  <a-modal
    v-model:open="visible"
    :title="dialogTitle"
    width="626px"
    ok-text="保存"
    cancel-text="关闭"
    :mask-closable="false"
    @ok="onOk"
    @cancel="onCancel"
  >
    <a-form
      class="mt-30"
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ span: 3 }"
      :wrapper-col="{ span: 21 }"
      label-align="left"
    >
      <a-form-item label="名称" name="name" required>
        <a-input v-model:value="form.name" size="large" placeholder="请输入"></a-input>
      </a-form-item>

      <a-form-item label="描述" name="description">
        <a-input v-model:value="form.description" size="large" placeholder="请输入"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { SkillApi } from '@/api/skill';

export default {
  name: 'skill-form',

  data() {
    return {
      visible: false,
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空' }]
      },
      componentOptions: {}
    };
  },

  computed: {
    dialogTitle() {
      return this.componentOptions.editId ? '编辑技能' : '创建技能';
    }
  },

  methods: {
    async addSkill() {
      const result = await SkillApi.add(this.form).catch(err => {
        console.log(err);
      });
    },
    async updateSkill() {
      const result = await SkillApi.update(this.componentOptions.editId, this.form).catch(err => {
        console.log(err);
      });
    },
    async getInfo(editId) {
      const result = await SkillApi.getById(editId).catch(err => {
        console.log(err);
      });

      if (result) {
        const { data } = result.data;
        this.form.name = data.name;
        this.form.description = data.description;
      }
    },
    handleVisible() {
      this.visible = !this.visible;
    },
    async open(options: { editId?: number }) {
      this.visible = true;

      this.componentOptions = options;

      if (options.editId) {
        await this.getInfo(options.editId);
      }
    },
    async onOk() {
      // if (this.form.name == '') {
      //   return;
      // }

      const valid = await this.$refs.formRef.validate().catch(() => {});

      if (valid) {
        if (this.componentOptions.editId) {
          await this.updateSkill();
        } else {
          await this.addSkill();
        }

        this.$emit('on-ok');
      }
    },
    onCancel() {}
  }
};
</script>

<style scoped lang="less">
:deep(.ant-form-item .ant-form-item-label > label) {
  height: 40px;
  padding-left: 12px;
}

:deep(.ant-form-item-required) {
  padding-left: 0 !important;
}
</style>
