<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-04 12:16:40
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-05 15:37:09
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

<script setup lang="ts">
import { SkillApi } from '@/api/skill';
import { FormInstance } from 'ant-design-vue';
import { computed, reactive, ref } from 'vue';

/**
 * 组件配置
 */
interface ComponentOptions {
  editId?: number | string;
  onOk?: Function;
}

defineOptions({
  name: 'skill-form'
});

const emit = defineEmits<{
  'on-ok': [];
}>();

const visible = ref(false);

const form = reactive({
  name: '',
  description: ''
});

const formRef = ref<FormInstance>();
// const formRef = ref<FormInstance>();

// const rules = reactive({
//   name: [{ required: true, message: '名称不能为空' }]
// });

const rules = {
  name: [{ required: true, message: '名称不能为空' }]
};

let componentOptions: ComponentOptions = {};

// # region 计算属性
const dialogTitle = computed(() => {
  return componentOptions.editId ? '编辑技能' : '创建技能';
});
// # endregion

/**
 * @description: 新增技能
 * @return {*}
 */
const addSkill = async () => {
  await SkillApi.add(form).catch(() => {});
};

/**
 * @description: 更新技能
 * @return {*}
 */
const updateSkill = async () => {
  await SkillApi.update(<number>componentOptions.editId, form).catch(() => {});
};

/**
 * @description: 获取技能详情
 * @return {*}
 */
const getInfo = async (editId: number | string) => {
  const result = await SkillApi.getById(editId).catch(err => {
    console.log(err);
  });

  if (result) {
    const { data } = result.data;
    form.name = data.name;
    form.description = data.description;
  }
};

/**
 * @description: 打开/关闭弹框
 * @return {*}
 */
const handleVisible = () => {
  visible.value = !visible.value;
};

/**
 * @description: 打开/关闭弹框
 * @return {*}
 */
const open = async (options: ComponentOptions) => {
  visible.value = true;

  componentOptions = options;

  if (options.editId) {
    await getInfo(options.editId);
  }
};

const onOk = async () => {
  // const valid = await this.$refs.formRef.validate().catch(() => {});

  const valid = await formRef.value?.validate().catch(() => {});

  if (valid) {
    if (componentOptions.editId) {
      await updateSkill();
    } else {
      await addSkill();
    }

    debugger;
    if (componentOptions.onOk) {
      componentOptions.onOk();
    }

    emit('on-ok');
  }
};

const onCancel = () => {};

defineExpose({
  handleVisible,
  /**
   * 创建并打开弹框
   */
  open
});
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
