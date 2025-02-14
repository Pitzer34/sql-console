import { createRouter, createWebHistory } from 'vue-router';
import Sidebar from '../components/Sidebar.vue';

const routes = [
  {
    path: '/',
    redirect: { name: 'Console' },
  },
  {
    path: '/console',
    name: 'Console',
    component: () => import('../pages/Console.vue'),
  },
  {
    path: '/sqlite',
    name: 'SQLite',
    component: () => import('../pages/SQLite.vue'),
  },
];

const router = createRouter({
  history: createWebHistory('/SQLMaker'),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
