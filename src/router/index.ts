import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/home.vue';
import CharacterInfo from '../views/character/character.vue';
import Concept from '../views/concept/concept.vue';
import Progress from '../views/features/progress.vue';
import Mental from '../views/features/mental.vue';
import Fight from '../views/features/fight.vue';
import Alignment from '../views/features/alignment.vue';

const routes: Array<RouteRecordRaw> = [
   {
      path: '/',
      name: 'home',
      component: Home,
   },
   {
      path: '/character',
      name: 'character',
      component: CharacterInfo,
   },
   {
      path: '/concept',
      name: 'concept',
      component: Concept,
   },
   {
      path: '/progress',
      name: 'progress',
      component: Progress,
   },
   {
      path: '/sanity',
      name: 'sanity',
      component: Mental,
   },
   {
      path: '/fight',
      name: 'fight',
      component: Fight,
   },
   {
      path: '/alignment',
      name: 'alignment',
      component: Alignment,
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
