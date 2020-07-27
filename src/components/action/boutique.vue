<template>
  <div class="boutique">
    <!-- 精品 -->
    <div class="left">
      <div>
        <div class="btn">06-11 第一周</div>
      </div>
      <div>
        <div class="btn btnHover">06-11 第二周</div>
        <div>
          <div class="btn smallBtn btnHover">早餐</div>
          <div class="btn smallBtn">中餐</div>
          <div class="btn smallBtn">晚餐</div>
          <div class="btn smallBtn">宵夜</div>
        </div>
      </div>
      <div>
        <div class="btn">06-11 第三周</div>
      </div>
      <div>
        <div class="btn">06-11 第四周</div>
      </div>
    </div>
    <div class="right">
    </div>
  </div>
</template>

<script>
export default {
  name: 'boutique',
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
  .boutique {
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
  .right {
    flex: 1;
  }
</style>
