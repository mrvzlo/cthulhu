import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/home.vue';
import Abilities from '../views/character/ability-choice.vue';

const routes: Array<RouteRecordRaw> = [
   {
      path: '/',
      name: 'home',
      component: Home,
   },
   {
      path: '/character',
      name: 'character',
      component: Abilities,
   },
];

const router = createRouter({
   history: createWebHashHistory(),
   routes,
});

export default router;
