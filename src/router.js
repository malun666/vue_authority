/* jshint esversion: 6 */
import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Home from './views/Home.vue';
import Index from './views/lndex.vue';
import Usermanage from './views/manage/Usermanage.vue';
import Rolemanage from './views/manage/Rolemanage.vue';
import Authoritymanage from './views/manage/Authoritymanage.vue';
import Test1 from './views/test/Testpage1.vue';
import Test2 from './views/test/Testpage2.vue';
import Test3 from './views/test/Testpage3.vue';

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
      component: Home,
      meta: {
        perId: 2003
      }
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      redirect: '/index/Usermanage',
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
        },
        {
          path: 'Test1',
          component: Test1,
          meta: {
            perId: 2002
          }
        },
        {
          path: 'Test2',
          component: Test2,
          meta: {
            perId: 2003
          }
        },
        {
          path: 'Test3',
          component: Test3,
          meta: {
            perId: 2004
          }
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
