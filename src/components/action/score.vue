<template>
  <div class="score">
    <!-- 评分 -->
    <div class="left">
      <div>
        <div class="btn">营养餐评分</div>
      </div>
      <div>
        <div class="btn">固定菜品评价</div>
      </div>
      <div>
        <div class="btn">餐厅评价</div>
      </div>
    </div>
    <div v-if="isReta" class="right">
      <div class="rightList">
        <div class="listHead">
          <div class="headSelect">
            <el-select v-model="month" style="width: 10rem;margin-right: 1rem;" placeholder="请选择">
              <el-option
                v-for="item in monthList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="week" style="width: 10rem;" placeholder="请选择">
              <el-option
                v-for="item in weekList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="headNum">
            <div class="num">
              <img src="@/assets/score_01.png" style="position: absolute;left: -0.6rem;top: 0;width: 2.3rem;" alt="">
              1588
            </div>
            <div class="num">
              <img src="@/assets/score_02.png" style="position: absolute;left: -0.6rem;top: 0;width: 2.3rem;" alt="">
              25
            </div>
          </div>
        </div>
        <div class="li">
          <div class="userInfo">
            姓名 <span>Frank</span>
            工号 <span>NO.100532</span>
            已选 <span>套餐A</span>
          </div>
          <div class="content">
            测试文本测试文本测试文本，测试文本测试文本测试文本，测试文本，测试文本测试文本测试文本，测试文本测试文本测试文本，测试文本
          </div>
          <div class="time">
            <div style="text-align: right;">
              <img src="@/assets/score_01.png" style="width: 2rem;" alt="">
            </div>
            <p style="color: #aaa;margin-top: 0;">2020.07.27 11:25:53</p>
          </div>
        </div>
        <div class="li">
          <div class="userInfo">
            姓名 <span>Frank</span>
            工号 <span>NO.100532</span>
            已选 <span>套餐A</span>
          </div>
          <div class="content">
            测试文本测试文本测试文本，测试文本测试文本测试文本，测试文本，测试文本测试文本测试文本，测试文本测试文本测试文本，测试文本
          </div>
          <div class="time">
            <div style="text-align: right;">
              <img src="@/assets/score_02.png" style="width: 2rem;" alt="">
            </div>
            <p style="color: #aaa;margin-top: 0;">2020.07.27 11:25:53</p>
          </div>
        </div>
        <div class="li">
          <div class="userInfo">
            姓名 <span>Frank</span>
            工号 <span>NO.100532</span>
            已选 <span>套餐A</span>
          </div>
          <div class="content">
            测试文本测试文本测试文本，测试文本测试文本测试文本，测试文本，测试文本测试文本测试文本，测试文本测试文本测试文本，测试文本
          </div>
          <div class="time">
            <div style="text-align: right;">
              <img src="@/assets/score_01.png" style="width: 2rem;" alt="">
            </div>
            <p style="color: #aaa;margin-top: 0;">2020.07.27 11:25:53</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="right">
      <div class="rightList">
        <div class="listHead">
          <div class="headSelect">
            <el-select v-model="month" style="width: 10rem;margin-right: 1rem;" placeholder="请选择">
              <el-option
                v-for="item in monthList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="week" style="width: 10rem;" placeholder="请选择">
              <el-option
                v-for="item in weekList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="headNum">
            <el-rate
              v-model="rate"
              disabled
              show-score
              text-color="#ff9900">
            </el-rate>
          </div>
        </div>
        <div class="li">
          <div class="userInfo">
            姓名 <span>Frank</span>
            工号 <span>NO.100532</span>
            已选 <span>套餐A</span>
          </div>
          <div class="content">
            测试文本测试文本测试文本，测试文本测试文本测试文本，测试文本，测试文本测试文本测试文本，测试文本测试文本测试文本，测试文本
          </div>
          <div class="time">
            <div style="text-align: right;">
              <el-rate
                v-model="rate"
                disabled
                show-score
                text-color="#ff9900">
              </el-rate>
            </div>
            <p style="color: #aaa;">2020.07.27 11:25:53</p>
          </div>
        </div>
        <div class="li">
          <div class="userInfo">
            姓名 <span>Frank</span>
            工号 <span>NO.100532</span>
            已选 <span>套餐A</span>
          </div>
          <div class="content">
            测试文本测试文本测试文本，测试文本测试文本测试文本，测试文本，测试文本测试文本测试文本，测试文本测试文本测试文本，测试文本
          </div>
          <div class="time">
            <div style="text-align: right;">
            <el-rate
              v-model="rate"
              disabled
              show-score
              text-color="#ff9900">
            </el-rate>
            </div>
            <p style="color: #aaa;">2020.07.27 11:25:53</p>
          </div>
        </div>
        <div class="li">
          <div class="userInfo">
            姓名 <span>Frank</span>
            工号 <span>NO.100532</span>
            已选 <span>套餐A</span>
          </div>
          <div class="content">
            测试文本测试文本测试文本，测试文本测试文本测试文本，测试文本，测试文本测试文本测试文本，测试文本测试文本测试文本，测试文本
          </div>
          <div class="time">
            <div style="text-align: right;">
            <el-rate
              v-model="rate"
              disabled
              show-score
              text-color="#ff9900">
            </el-rate>
            </div>
            <p style="color: #aaa;">2020.07.27 11:25:53</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'score',
  props: {
    rightText: {
      type: String,
      default: ''
    }
  },
  components: {},
  data () {
    return {
      month: '',
      monthList: [
        {
          value: '7',
          label: '7月'
        }, {
          value: '8',
          label: '8月'
        }, {
          value: '9',
          label: '9月'
        }, {
          value: '10',
          label: '10月'
        }
      ],
      week: '',
      weekList: [
        {
          label: '第1周',
          value: '1'
        }, {
          label: '第2周',
          value: '2'
        }, {
          label: '第3周',
          value: '3'
        }, {
          label: '第4周',
          value: '4'
        }
      ],
      isReta: true,
      rate: 4
    }
  },
  mounted () {},
  methods: {
  }
}
</script>

<style scoped>
  .score {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .left {
    padding: 1rem;
    width: 20%;
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
    padding: .34rem .86rem;
  }
  .left .btnHover,
  .left .btn:hover {
    background: #fbcd2b;
    color: #333;
    border: 1px solid #fbcd2b;
  }
  .right {
    flex: 1;
    padding: 1rem;
    box-sizing: border-box;
  }
  .rightList {
    height: 100%;
    border: 2px solid #aa8629;
    border-radius: 20px;
    background: #3c2a26;
    box-sizing: border-box;
    padding: 1rem;
  }
  .listHead {
    text-align: left;
    display: flex;
  }
  .headSelect {
    flex: 1;
  }
  .headNum .num{
    background: #fff;
    padding: .5rem 1.5rem;
    display: inline-block;
    border-radius: 50px;
    margin-right: .5rem;
    position: relative;
    min-width: 40px;
    text-align: right;
  }
  .li {
    display: flex;
    color: #fff;
    font-size: .8rem;
    text-align: left;
    padding: .5rem 1rem;
    margin: .5rem 0;
    border: 1px solid #663024;
  }
  .userInfo {
    width: 11rem;
  }
  .userInfo span {
    color: #fb882b;
  }
  .content {
    flex: 1;
    padding-right: 5%;
  }
  .time {
    padding-left: .5rem;
  }
  .time p {
    margin-bottom: 0;
  }
</style>
