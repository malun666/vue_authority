/* jshint esversion: 6 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: sessionStorage.getItem('login')
      ? JSON.parse(sessionStorage.getItem('login'))
      : null
    // 这里表示如果前面登录成功并返回user的，判断user是否存在，不存在就为null
  },
  mutations: {
    resiveLogin(state, payload) {
      state.loginUser = payload;
    }
  },
  actions: {},
  getters: {
    takeLogin(state) {
      return state.loginUser;
    }
  }
});
