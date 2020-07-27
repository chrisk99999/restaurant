<template>
  <div class="nutrition">
    <!-- 营养 -->
    <div class="left">
      <div>
        <div class="btn">06-11 第一周</div>
      </div>
      <div>
        <div class="btn btnHover">06-11 第二周</div>
      </div>
      <div>
        <div class="btn">06-11 第三周</div>
      </div>
      <div>
        <div class="btn">06-11 第四周</div>
      </div>
      <div>
        <div class="btn addBtn"><img src="@/assets/monthlyReport_01.png" alt=""></div>
      </div>
    </div>
    <div class="right">
      <div class="cardBox">
        <div class="card">
          <div class="cardText">
            本周已定 52 份
          </div>
        </div>
        <div class="card card2">
          <div class="cardText">
            本周已定 52 份
          </div>
        </div>
      </div>
      <div class="cardBox">
        <div class="card">
          <div class="cardText">
            本周已定 52 份
          </div>
        </div>
        <div class="card card4">
          <div class="cardText">
            本周已定 52 份
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nutrition',
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
  }
}
</script>

<style scoped>
  .nutrition {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .left {
    padding: 1rem 3rem;
    width: 20%;
  }
  .left .btn {
    padding: 1rem 3rem;
    color: #fb882b;
    background: #3c2a36;
    border: 1px solid #653428;
    border-radius: 50px;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: 1rem;
  }
  .left .smallBtn {
    display: inline-block;
    padding: 1rem 2.86rem;
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
    border: 1px solid #c29b29;
    border-radius: 10px;
    margin-top: 1rem;
    background: #3c2a26;
  }
  .cardBox {
    display: flex;
    text-align: center;
    justify-content: center;
  }
  .card {
    width: 40%;
    height: 8rem;
    background-size: 100% 100%;
    margin-right: 4%;
    margin-top: 3%;
    margin-bottom: 3%;
    box-sizing: border-box;
    color: #fff;
    border: 1px solid #663024;
  }
  .card2 {
    background: url(~@/assets/monthlyReport_02.png) no-repeat;
    background-size: 100% 100%;
  }
  .card3 {
  }
  .card4 {
    background: url(~@/assets/monthlyReport_03.png) no-repeat;
    background-size: 100% 100%;
  }
  .cardText {
    font-size: 1.2rem;
    width: fit-content;
    margin: 0 auto;
    padding-top: .6rem;
  }
  .card4 .cardText,
  .card2 .cardText {
    font-size: 2rem;
    padding-top: 2.2rem;
  }
  .rateBox {
    padding-top: .6rem;
  }
  .cardContent {
    padding-top: 5%;
  }
  .cardContent img {
    width: 2rem;
  }
  .cardContentSpan {
    font-size: 1.5rem;
  }
  .cardContent .cardImg {
    width: 1.2rem;
  }
</style>
