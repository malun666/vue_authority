<template>
  <div class="login">
    <div class="tab">
      <div class="account">
        <label for="aco">账号</label>
        <input type="text" id="aco" v-model="account" />
      </div>
      <div class="password">
        <label for="pwd">密码</label>
        <input type="password" id="pwd" v-model="pwd" @keydown="enterLog" />
      </div>
      <div class="tologin" @click="logVerify">登录</div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';

export default {
  name: 'login',
  data() {
    return {
      account: '',
      pwd: ''
    };
  },
  methods: {
    logVerify() {
      Axios({
        method: 'post',
        url: '/api/userlogin',
        data: {
          username: this.account,
          password: this.pwd
        }
      })
        .then(res => {
          console.log(res.data);
        })
        .catch(e => {
          console.log('登陆失败', e);
        });
    },
    enterLog(e) {
      if (e.keyCode == 13) {
        this.logVerify();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tab {
  width: 350px;
  height: 250px;
  border: 1px solid #757575;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -175px;
  margin-top: -125px;
  padding-top: 50px;
  box-sizing: border-box;
  .account,
  .password {
    margin-left: 50px;
    margin-bottom: 20px;
    input {
      margin-left: 10px;
    }
  }
  .tologin {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: lightpink;
    line-height: 50px;
    text-align: center;
    margin: 0 auto;
  }
}
</style>
