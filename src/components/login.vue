<template>
  <div class="loginView">
    <div class="head">
      <img src="@/assets/login_02.png" alt="" srcset="">
    </div>
    <div class="loginBox">
      <div class="loginInput">
        <img src="@/assets/login_03.png">
        <el-input class="loginInputText" v-model="username" placeholder="请输入账号"></el-input>
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
      username: 'admin',
      passWord: '123456'
    }
  },
  mounted () {},
  methods: {
    save () {
      if (this.username === '') {
        this.$message.error('用户名不能为空')
        return
      } else if (this.passWord === '') {
        this.$message.error('密码不能为空')
        return
      }
      // 登录
      this.$api.post('/login/doLogin', {
        username: this.username,
        password: this.passWord
      }).then(res => {
        console.log(res)
        if (res.data.code === 1) {
          this.$router.push({path: '/home'})
        } else {
          console.warn(res.data.msg)
          this.$message.error(res.data.msg)
        }
      })
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
  font-size: .34rem;
}
.loginView .head {
  background: url(~@/assets/login_01.png) no-repeat;
  background-size: 100%;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
}
.loginView .head img {
  padding: 8% 0;
  width: 40%;
}
.loginView .loginBox {
  padding-top: .58rem;
}
.loginView .loginPassWord,
.loginView .loginInput {
  width: 2.48rem;
  margin: 0 auto;
  margin-bottom: .27rem;
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
.loginView .loginPassWordtText .el-input__inner,
.loginView .loginInputText .el-input__inner {
  height: .39rem;
  border: none;
  color: #000;
  font-size: .1rem;
}
.loginView .el-input .el-input__clear {
  font-size: .15rem;
}
.loginView .loginPassWordtText .el-input__suffix {
  right: 5%;
  top: 25%;
}
.loginView .saveBtn {
  background: #f9ca00;
  color: #666;
  padding: .08rem .46rem;
}
.loginView .el-button.is-round {
  padding: .08rem .46rem;
  border-radius: 5rem;
  font-size: .1rem;
  color: #000;
}
</style>
