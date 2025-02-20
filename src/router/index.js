import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'FieldList' },
      },
      {
        path: 'field-list',
        name: 'FieldList',
        component: () => import('../pages/FieldList.vue'),
      },
      {
        path: 'sqlite',
        name: 'SQLite',
        component: () => import('../pages/SQLite.vue'),
      },
      {
        path: 'export-sql',
        name: 'ExportSQL',
        component: () => import('../pages/ExportSQL.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory('/sql-console'),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
