import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/homepage/HomePage.vue';
import DashBoard from './pages/dash/DashBoard.vue';
import MyAccount from './pages/account/MyAccount.vue';
import EditProgram from './pages/program/EditProgram.vue';
import EditReason from './pages/reason/EditReason.vue';
// import PerformanceReview from './pages/review/PerformanceReview.vue';
import FaqPage from './pages/faq/FaqPage.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/:view?', 
      component: HomePage,
      meta: { requiresUnauth: true },
      props: true,
    },
    // { path: '/', redirect: '/dash' },
    { 
      path: '/dash', 
      component: DashBoard,
      meta: { requiresAuth: true },
    },
    { 
      path: '/my-account', 
      component: MyAccount,
      meta: { requiresAuth: true },
    },
    { 
      path: '/program/:id', 
      component: EditProgram,
      meta: { requiresAuth: true },
      props: true,
    },
    { 
      path: '/reason/:id', 
      component: EditReason,
      meta: { requiresAuth: true },
      props: true,
    },

    // { path: '/performance-review', component: PerformanceReview, meta: { requiresAuth: true } },
    { path: '/faq', component: FaqPage },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/#auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/dash');
  } else {
    next();
  }
});

export default router;
