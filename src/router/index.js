import Vue from 'vue'
import Router from 'vue-router'
import routes from '../allRoutes'

Vue.use(Router);

const router = new Router({
  routes,
  // mode: 'history', //会导致微信签名失效
});

router.beforeEach((to, from, next) => {
   console.log(to.meta.title);
   next();
});

export default router;
