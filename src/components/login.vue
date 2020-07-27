<template>
  <div class="loginView">
    <div class="head">
      <img src="@/assets/login_02.png" alt="" srcset="">
    </div>
    <div class="loginBox">
      <div class="loginInput">
        <img src="@/assets/login_03.png">
        <el-input class="loginInputText" v-model="id" placeholder="请输入账号"></el-input>
      </div>
      <div class="loginPassWord">
        <img src="@/assets/login_04.png">
        <el-input class="loginPassWordtText" show-password v-model="passWord" placeholder="请输入密码"></el-input>
      </div>
      <div>
        <el-button type="warning" class="saveBtn" @click="save" round>登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  components: {},
  data () {
    return {
      id: '',
      passWord: ''
    }
  },
  mounted () {},
  methods: {
    save () {
      this.$api.get('/admin/login/doLogin', {}, response => {
        if (response.status >= 200 && response.status < 300) {
            console.log(response.data);
        } else {
            console.log(response.message);
        }
      });
      // if (this.id === '' || this.passWord === '') {
      //   return ''
      // } else {
      //   this.$router.push({path: '/home'})
      // }
    }
  }
}
</script>

<style>
.loginView {
  background: url(~@/assets/index_01.png);
  background-size: 100% 100%;
  height: 100%;
  text-align: center;
}
.loginView .head {
  background: url(~@/assets/login_01.png) no-repeat;
  background-size: 100%;
  height: 45%;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
}
.loginView .head img {
  padding: 8% 0;
  width: 40%;
}
.loginView .loginBox {
  padding-top: 4rem;
}
.loginView .loginPassWord,
.loginView .loginInput {
  width: 15rem;
  margin: 1rem auto;
  position: relative;
}
.loginView .loginPassWord img,
.loginView .loginInput img {
  width: 100%;
}
.loginView .loginPassWordtText,
.loginView .loginInputText {
  position: absolute;
  right: 0px;
  width: 85%;
  text-align: center;
}
.loginView .loginPassWord .el-input__inner,
.loginView .loginInputText .el-input__inner {
  height: 38px;
  line-height: 38px;
  border: none;
}
.loginView .saveBtn {
  background: #f9ca00;
  color: #666;
  padding: 12px 50px;
}
.loginView .el-button.is-round {
  padding: 12px 50px;
}
</style>
