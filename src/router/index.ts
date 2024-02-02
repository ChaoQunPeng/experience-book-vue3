/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-01 14:25:21
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-02 11:15:53
 * @FilePath: /experience-book-vue3/src/router/index.ts
 * @Description:
 */
import { createRouter, createWebHistory } from 'vue-router';
import SkillIndex from '../views/skill/skill-index.vue';
import SkillNoteIndex from '../views/skill/skill-note-list.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'skill',
      component: SkillIndex
    },
    {
      path: '/skill-note-list/:id',
      name: 'skill-note-list',
      component: SkillNoteIndex
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
});

export default router;
