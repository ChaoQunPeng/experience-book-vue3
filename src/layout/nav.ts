/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-06 16:48:29
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-06 17:12:33
 * @FilePath: /experience-book-vue3/src/layout/nav.ts
 * @Description:
 */
import router from '@/router';

export function usePageNav() {
  const goSkillNoteList = (skillId: number) => {
    router.push({ path: `/skill-note-list/${skillId}` });
  };

  const goSkillIndex = () => {
    router.push({ path: `/` });
  };

  return {
    goSkillNoteList,
    goSkillIndex
  };
}
