<template>
  <div class="login">
    <div class="tab">
      <div class="account">
        <label for="aco">账号</label>
        <input type="text" id="aco" v-model="account" />
      </div>
      <div class="password">
        <label for="pwd">密码</label>
        <input type="password" id="pwd" v-model="pwd" />
      </div>
      <div class="verify">
        <input type="text" class="veri-input" @keydown="enterLog" />
        <img
          src="http://192.168.1.130:8888/api/code"
          alt="验证码"
          @click="changeImg"
          ref="veriImg"
        />
      </div>
      <div class="tologin" @click="logVerify">登录</div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import { mapMutations } from 'vuex';

export default {
  name: 'login',
  data() {
    return {
      account: '',
      pwd: ''
    };
  },
  methods: {
    ...mapMutations(['resiveLogin']),
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
          // localStorage.setItem(
          //   'loginData',
          //   JSON.stringify({
          //     username: this.account,
          //     password: this.pwd
          //   })
          // );
          sessionStorage.setItem('login', JSON.stringify(res.data.user));
          this.resiveLogin(res.data.user);
          this.$router.push('/home');
        })
        .catch(e => {
          console.log('登陆失败', e);
        });
    },
    enterLog(e) {
      if (e.keyCode == 13) {
        this.logVerify();
      }
    },
    changeImg() {
      // console.log(this.$refs.veriImg.src);
      let newSrc = 'http://192.168.1.130:8888/api/code' + '?ab=' + Date.now();
      this.$refs.veriImg.src = newSrc;
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
    width: 220px;
    margin: 0 auto 15px;
    // margin-left: 50px;
    // margin-bottom: 20px;
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
  .verify {
    width: 220px;
    margin: 0 auto 15px;
    height: 30px;
    box-sizing: border-box;
    input {
      width: 100px;
      height: 25px;
      text-align: right;
    }
    img {
      width: 75px;
      height: 25px;
      margin-left: 10px;
    }
  }
}
</style>
