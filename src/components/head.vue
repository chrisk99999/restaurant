<template>
  <div class="head">
    <div class="left">
      <img @click="goHome" src="@/assets/head_01.png">
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
</style>
