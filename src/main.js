/* jshint esversion: 6 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/iview.js';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.path != '/') {
    //这里表示将要进入的不是登录界面的都需要验证一下是否在登录状态
    if (
      Object.prototype.toString.call(store.getters.takeLogin).slice(8, -1) ==
      'Object'
    ) {
      next();
    } else {
      next('/');
    }
  } else {
    next(); //如果跳转的就是登录界面，那就直接next()
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
