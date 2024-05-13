
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'all-entries', component: () => import('pages/AllEntry.vue') },
      { path: 'at-a-glance', component: () => import('pages/AtAGlance.vue') },
      { path: 'call-logs', component: () => import('pages/CallLog.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
