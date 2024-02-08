/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-08 16:36:02
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-08 16:42:51
 * @FilePath: /experience-book-vue3/src/components/dialog/use-modal.ts
 * @Description:
 */
// useModal

import { createVNode, ref, defineComponent } from 'vue';
import { Modal as AntModal } from 'ant-design-vue';

export default function useModal(props: any) {
  const visible = ref(true);

  const contextHolder = defineComponent({
    render() {
      return createVNode(AntModal, { ...props, visible: visible.value }, () =>
        createVNode(props.content)
      );
    }
  });

  const show = () => {
    visible.value = true;
  };

  return [{ show }, contextHolder];
}
