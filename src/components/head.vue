<template>
  <div class="head">
    <div class="left">
      <img @click="goHome" src="@/assets/head_01.png">
    </div>
    <div class="bodyText">
      <div :class="index === 1 ? 'tab tabHover' : 'tab'" @click="changeHead(1)">每周菜谱</div>
      <div :class="index === 2 ? 'tab tabHover' : 'tab'" @click="changeHead(2)">营养加餐</div>
      <div :class="index === 3 ? 'tab tabHover' : 'tab'" @click="changeHead(3)">餐厅月报</div>
      <div :class="index === 4 ? 'tab tabHover' : 'tab'" @click="changeHead(4)">精品菜品</div>
      <div :class="index === 5 ? 'tab tabHover' : 'tab'" @click="changeHead(5)">餐厅团队</div>
      <div :class="index === 6 ? 'tab tabHover' : 'tab'" @click="changeHead(6)">员工团队</div>
    </div>
    <div class="right">
      <span>{{rightText}}</span>
      <img @click="exit" src="@/assets/head_02.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'heads',
  props: {
    rightText: {
      type: String,
      default: ''
    },
    index: {
      type: [String, Number],
      default: 0
    }
  },
  components: {},
  data () {
    return {
    }
  },
  mounted () {},
  methods: {
    exit () {
      this.$router.push({path: '/login'})
    },
    goHome () {
      this.$router.push({path: '/home'})
    },
    changeHead (type) {
      this.$emit('changeHead', type)
    }
  }
}
</script>

<style scoped>
  .head {
    display: flex;
    padding: .15rem 0;
    padding-left: .42rem;
    padding-right: .19rem;
    background: #2b1814;
  }
  .left {
    flex: 1;
    padding-top: .05rem;
  }
  .right {
    display: flex;
  }
  .right span {
    color: #fff;
    padding: .04rem .1rem;
    font-size: .1rem;
  }
  .left img {
    height: .15rem;
    cursor: pointer;
  }
  .right img {
    height: .2rem;
    cursor: pointer;
  }
  .bodyText {
    flex: 1;
    color: #fff;
    display: flex;
    font-size: .12rem;
  }
  .tab {
    margin-right: .2rem;
    padding-bottom: .05rem;
    box-sizing: border-box;
    cursor: pointer;
  }
  .tabHover,
  .tab:hover {
    border-bottom: 1px solid #fb882b;
    color: #fb882b;
  }
</style>
