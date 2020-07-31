<template>
  <div class="monthlyReport">
    <!-- 月报 -->
    <div class="left">
      <div>
        <div class="btn">5月</div>
      </div>
      <div>
        <div class="btn btnHover">6月</div>
      </div>
      <div>
        <div class="btn">7月</div>
      </div>
      <div>
        <div class="btn">7月</div>
      </div>
      <div>
        <div class="btn">8月</div>
      </div>
      <div>
        <div class="btn">9月</div>
      </div>
      <div>
        <div class="btn">10月</div>
      </div>
      <div>
        <div class="btn">11月</div>
      </div>
      <div>
        <div class="btn">12月</div>
      </div>
    </div>
    <div class="right">
      <div class="cardBox">
        <div class="card">
          <div class="cardHead">
            <img src="@/assets/updata.png" alt="">
          </div>
          <div class="cardTit">
            上周最欢迎菜品
          </div>
          <div class="cardText">
            套餐A
          </div>
        </div>
        <div class="card card2" @click="linkScore">
          <div class="cardHead">
            <img src="@/assets/query.png" alt="">
          </div>
          <div class="cardTit">
            餐厅服务评价
          </div>
          <el-rate disabled class="rateBox" v-model="rate"></el-rate>
        </div>
      </div>
      <div class="cardBox">
        <div class="card card3">
          <div class="cardHead">
            <img src="@/assets/updata.png" alt="">
          </div>
          <div class="cardContent">
            <img src="@/assets/monthlyReport_06.png" alt="">
            本月累计未取食物 <span class="cardContentSpan">28份</span>
          </div>
        </div>
        <div class="card card4">
          <div class="cardHead">
            <img src="@/assets/updata.png" alt="">
          </div>
          <div class="cardContent">
            <img class="cardImg" src="@/assets/monthlyReport_07.png" alt="">
            本月累计厨余垃圾 <span class="cardContentSpan">10吨</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'monthlyReport',
  props: {
    rightText: {
      type: String,
      default: ''
    }
  },
  components: {},
  data () {
    return {
      rate: 4
    }
  },
  mounted () {},
  methods: {
    linkScore () {
      this.$emit('linkScore')
    }
  }
}
</script>

<style scoped>
  .monthlyReport {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .left {
    margin: .28rem;
    width: 20%;
    height: 80%;
    box-sizing: border-box;
    overflow: auto;
  }
  .left .btn {
    padding: .1rem .44rem;
    font-size: .15rem;
    color: #fb882b;
    background: #3c2a36;
    border: 1px solid #653428;
    border-radius: 5rem;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: .2rem;
  }
  .left .smallBtn {
    display: inline-block;
    padding: .11rem .29rem;
    box-sizing: border-box;
  }
  .left .btnHover,
  .left .btn:hover {
    background: #fbcd2b;
    color: #333;
    border: 1px solid #fbcd2b;
  }
  .left .addBtn {
    background: #ffffcc;
  }
  .left .addBtn img {
    height: 1rem;
  }
  .right {
    flex: 1;
    padding-top: 5%;
  }
  .cardBox {
    display: flex;
    text-align: center;
    justify-content: center;
    margin-bottom: .5rem;
  }
  .card {
    width: 3.36rem;
    /* flex: 1; */
    background-size: 100% 100%;
    /* margin-right: 4%;
    margin-top: 3%;
    margin-bottom: 3%; */
    box-sizing: border-box;
    color: #fff;
    border: 1px solid #663024;
    cursor: pointer;
    background: url(~@/assets/monthlyReport_02.png) no-repeat;
    background-size: 100% 100%;
    margin-right: .3rem;
  }
  .card2 {
    background: url(~@/assets/monthlyReport_03.png) no-repeat;
    background-size: 100% 100%;
    margin-right: .0rem;
  }
  .card3 {
    background: url(~@/assets/monthlyReport_04.png) no-repeat;
    background-size: 100% 100%;
    margin-right: .3rem;
  }
  .card4 {
    background: url(~@/assets/monthlyReport_05.png) no-repeat;
    background-size: 100% 100%;
    margin-right: .0rem;
  }
  .cardHead {
    text-align: right;
    padding: .07rem;
    padding-bottom: 0;
  }
  .cardHead img {
    height: .15rem;
  }
  .cardTit {
    font-size: .2rem;
    border-bottom: 1px solid #fff;
    width: fit-content;
    margin: 0 auto;
    padding-top: .07rem;
    padding-bottom: .17rem;
  }
  .cardText {
    font-size: .18rem;
    width: fit-content;
    margin: 0 auto;
    margin-top: .17rem;
    margin-bottom: .3rem;
  }
  .rateBox {
    padding: .15rem 0;
  }
  .cardContent {
    padding-top: .3rem;
    padding-bottom: .5rem;
    font-size: .13rem;
  }
  .cardContent img {
    width: .37rem;
  }
  .cardContentSpan {
    font-size: .27rem;
  }
  .cardContent .cardImg {
    width: .26rem;
  }
</style>
