<template>
  <div class="head">
    <div class="left">
      <img @click="goHome" src="@/assets/head_01.png">
    </div>
    <div class="bodyText">
      <div :class="index === 1 ? 'tab tabHover' : 'tab'" @click="changeHead(1)">{{$t("head.tab1")}}</div>
      <div :class="index === 2 ? 'tab tabHover' : 'tab'" @click="changeHead(2)">{{$t("head.tab2")}}</div>
      <div :class="index === 3 ? 'tab tabHover' : 'tab'" @click="changeHead(3)">{{$t("head.tab3")}}</div>
      <div :class="index === 4 ? 'tab tabHover' : 'tab'" @click="changeHead(4)">{{$t("head.tab4")}}</div>
      <div :class="index === 5 ? 'tab tabHover' : 'tab'" @click="changeHead(5)">{{$t("head.tab5")}}</div>
      <div :class="index === 6 ? 'tab tabHover' : 'tab'" @click="changeHead(6)">{{$t("head.tab6")}}</div>
    </div>
    <div class="right">
      <el-select v-model="msg" @change="langToggle" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
      msg: this.$i18n.locale,
      options: [
        {
          label: '中文',
          value: 'zh'
        }, {
          label: 'English',
          value: 'en'
        }
      ]
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
    },
    langToggle (val) {
      console.log(val)
      this.$i18n.locale = val
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
    padding-top: .05rem;
    width: 25%;
  }
  .right {
    display: flex;
    width: 15%;
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
    font-size: .1rem;
  }
  .tab {
    margin-right: .1rem;
    padding-bottom: .05rem;
    box-sizing: border-box;
    cursor: pointer;
    flex: 1;
    text-align: center;
  }
  .tabHover,
  .tab:hover {
    border-bottom: 1px solid #fb882b;
    color: #fb882b;
  }
</style>
