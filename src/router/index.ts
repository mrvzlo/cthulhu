import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/home.vue';
import Abilities from '../views/character/ability-choice.vue';
import RuleList from '../views/rules/rule-list.vue';
import RuleDetails from '../views/rules/rule-details.vue';

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
   {
      path: '/rules',
      name: 'rules',
      component: RuleList,
   },
   {
      path: '/rules/:id',
      component: RuleDetails,
   },
];

const router = createRouter({
   history: createWebHashHistory(),
   routes,
});

export default router;
