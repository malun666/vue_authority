/* jshint esversion: 6 */
import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Home from './views/Home.vue';
import Index from './views/lndex.vue';
import Usermanage from './views/manage/Usermanage.vue';
import Rolemanage from './views/manage/Rolemanage.vue';
import Authoritymanage from './views/manage/Authoritymanage.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      redirect: '/Usermanage',
      children: [
        {
          path: 'Usermanage',
          component: Usermanage
        },
        {
          path: 'Rolemanage',
          component: Rolemanage
        },
        {
          path: 'Authoritymanage',
          component: Authoritymanage
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
});
