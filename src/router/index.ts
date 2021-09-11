import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/home.vue';
import Abilities from '../views/character/ability-choice.vue';

const routes: Array<RouteRecordRaw> = [
   {
      path: '/',
      component: Home,
   },
   {
      path: '/character',
      component: Abilities,
   },
];

const router = createRouter({
   history: createWebHashHistory(),
   routes,
});

router.beforeEach(() => {
   window.scrollTo(0, 0);
});
export default router;
