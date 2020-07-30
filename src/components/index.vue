<template>
  <div class="view">
    <div class="logo">
      <img src="@/assets/index_02.png" alt="" srcset="">
    </div>
    <div class="logoCn">
      <img src="@/assets/index_03.png" alt="" srcset="">
    </div>
    <div class="progressBarBox">
      <div class="progressBar">
        <div :style="'width:' + progressBar + '%'" class="progressBarHover"></div>
      </div>
      <div class="progressBarText">{{progressBar}}%</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  components: {},
  data () {
    return {
      progressBar: 0,
      interval: ''
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      this.progressBar++
      if (this.progressBar === 100) {
        clearInterval(this.interval)
        this.$router.push({path: '/login'})
      }
    }, 10)
  },
  methods: {
  }
}
</script>

<style scoped>
.view {
  background: url(~@/assets/index_01.png);
  background-size: 100% 100%;
  height: 100%;
  text-align: center;
}
.logo {
  padding: 1.13rem;
}
.logoCn img {
  padding-bottom: 1.13rem;
}
.logoCn img,
.logo img {
  width: 1.9rem;
}
.progressBarBox {
}
.progressBar {
  width: .86rem;
  background: #52352d;
  border-radius: 5rem;
  height: .1rem;
  margin: 0 auto;
  box-sizing: border-box;
  padding: .02rem;
}
.progressBarHover {
  width: 0%;
  background: #dc6841;
  border-radius: 5rem;
  height: .06rem;
}
.progressBarText {
  text-align: center;
  color: #dc6841;
  padding-top: .1rem;
  font-size: .1rem;
}
</style>
