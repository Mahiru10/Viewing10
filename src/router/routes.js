const routes = [
  {
    // path: '/',
    // component: () => import('pages/LoginPage.vue'),
    path: '/',
    component: () => import('pages/Viewing.vue'),
  },
  {
    path: '/jobs',
    component: () => import('layouts/MainLayout.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
