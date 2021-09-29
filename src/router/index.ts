import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/home.vue';
import CharacterInfo from '../views/character/character.vue';
import SaveLoad from '../views/character/save-load.vue';

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
      path: '/saveload',
      name: 'saveload',
      component: SaveLoad,
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
