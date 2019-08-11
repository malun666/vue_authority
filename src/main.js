/* jshint esversion: 6 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/iview.js';
import api from './api/http';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.path != '/') {
    //这里表示将要进入的不是登录界面的都需要验证一下是否在登录状态
    if (
      Object.prototype.toString.call(store.getters.takeLogin).slice(8, -1) ==
      'Object'
    ) {
      //拿到当前登录用户
      console.log(store.state.loginUser.id);

      if (to.meta.perId) {
        api
          .loadUserPer(store.state.loginUser.id) // 拿到当前登录用户的所有权限
          .then(res => {
            console.log(res.data);
            let perIndex = res.data.findIndex(item => item.id == to.meta.perId);
            // 拿到当前跳转的路由对应的权限id to.meta.perId
            if (perIndex < 0) {
              //如果当前用户没有这个路由对应的权限ID
              next(false);
            } else {
              //如果当前用户有这个路由对应的权限ID那就跳转这个路由
              next();
            }
          })
          .catch(() => {
            console.log('请求失败！');
          });
      } else {
        next(); //如果当前这个路由没有绑定权限ID，那就不需要检验也就不需要发送ajax请求
      }
    } else {
      next('/'); //如果跳转的不是登录路由，没有登录的时候就直接跳回登录路由
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
