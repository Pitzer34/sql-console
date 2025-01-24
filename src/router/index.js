import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Console',
    component: () => import('../pages/Console.vue'),
  },
];

const router = createRouter({
  history: createWebHistory('SqlLibrary'),
  routes: routes,
});

export default router;
