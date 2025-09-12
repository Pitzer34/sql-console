import { createRouter, createWebHistory } from 'vue-router';
import { useSqlStore } from '../store/sqlStore';

const routes = [
  {
    path: '/',
    redirect: { name: 'Design' },
  },
  {
    path: '/design',
    name: 'Design',
    component: () => import('../pages/Design.vue'),
  },
  {
    path: '/sqlite',
    name: 'SQLite',
    component: () => import('../pages/SQLite.vue'),
  },
];

const router = createRouter({
  history: createWebHistory('/sql-console'),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
    };
  },
});

router.beforeEach(async (to, from) => {
  const sqlStore = useSqlStore();
  try {
    if (!sqlStore.sqliteDB) {
      await sqlStore.initSqliteDB();
    }
  } catch (error) {
    console.error('SQLite 初始化失敗:', error);
  }
});

export default router;
