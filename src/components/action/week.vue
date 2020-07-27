<template>
  <div class="week">
    <!-- 每周 -->
    <div class="left">
      <div>
        <div class="btn">06-11 第一周</div>
      </div>
      <div>
        <div class="btn btnHover">06-11 第二周</div>
        <div style="display: flex;">
          <div class="btn smallBtn btnHover">早餐</div>
          <div class="btn smallBtn">中餐</div>
      </div>
      <div style="display: flex;">
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
      <div class="rightTab">
        <div class="tabHeadBox">
          <div class="tabHead" v-for="(item, i) in tableHead" :key="i">{{item.name}}</div>
        </div>
        <div class="tabBodyBox">
          <div class="tabBody" v-for="(item, i) in tableData" :key="i">
            <div class="tab">{{item.type}}</div>
            <div class="tab">{{item.setMeal}}</div>
            <div class="tab">{{item.drink}}</div>
            <div class="tab">{{item.characteristic}}</div>
            <div class="tab">{{item.sideDishes}}</div>
            <div class="tab">{{item.else1}}</div>
            <div class="tab">{{item.else2}}</div>
            <div class="tab">{{item.else3}}</div>
          </div>
        </div>
        <div class="bottomBtn">
          <el-button type="warning" round>编辑</el-button>
          <el-button type="success" round>上传</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'week',
  props: {
    rightText: {
      type: String,
      default: ''
    }
  },
  components: {},
  data () {
    return {
      tableHead: [
        {
          name: '类别'
        }, {
          name: '套餐'
        }, {
          name: '水果/饮料'
        }, {
          name: '特色餐'
        }, {
          name: '配菜'
        }, {
          name: '+'
        }, {
          name: '+'
        }, {
          name: '+'
        }
      ],
      tableData: [
        {
          type: '星期一',
          setMeal: '红烧豹子头套餐，红烧豹子头套餐',
          drink: '快乐水',
          characteristic: '泡面',
          sideDishes: '火腿',
          else1: '-',
          else2: '-',
          else3: '-'
        }, {
          type: '星期二',
          setMeal: '红烧豹子头套餐，红烧豹子头套餐',
          drink: '快乐水',
          characteristic: '泡面',
          sideDishes: '火腿',
          else1: '-',
          else2: '-',
          else3: '-'
        }, {
          type: '星期三',
          setMeal: '红烧豹子头套餐，红烧豹子头套餐',
          drink: '快乐水',
          characteristic: '泡面',
          sideDishes: '火腿',
          else1: '-',
          else2: '-',
          else3: '-'
        }, {
          type: '星期四',
          setMeal: '红烧豹子头套餐，红烧豹子头套餐',
          drink: '快乐水',
          characteristic: '泡面',
          sideDishes: '火腿',
          else1: '-',
          else2: '-',
          else3: '-'
        }, {
          type: '星期五',
          setMeal: '红烧豹子头套餐，红烧豹子头套餐',
          drink: '快乐水',
          characteristic: '泡面',
          sideDishes: '火腿',
          else1: '-',
          else2: '-',
          else3: '-'
        }, {
          type: '星期六',
          setMeal: '红烧豹子头套餐，红烧豹子头套餐',
          drink: '快乐水',
          characteristic: '泡面',
          sideDishes: '火腿',
          else1: '-',
          else2: '-',
          else3: '-'
        }, {
          type: '星期日',
          setMeal: '红烧豹子头套餐，红烧豹子头套餐',
          drink: '快乐水',
          characteristic: '泡面',
          sideDishes: '火腿',
          else1: '-',
          else2: '-',
          else3: '-'
        }
      ]
    }
  },
  mounted () {},
  methods: {
  }
}
</script>

<style scoped>
  .week {
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
    padding: 1rem;
    box-sizing: border-box;
  }
  .right .rightTab {
    height: 100%;
    border: 2px solid #aa8629;
    border-radius: 20px;
    background: #3c2a26;
    box-sizing: border-box;
    padding: 1rem;
  }
  .tabHeadBox {
    display: flex;
    width: 100%;
  }
  .tabHead {
    width: 12%;
    color: #fff;
    box-sizing: border-box;
    padding: .5rem;
    border: 1px solid #4c322b;
    font-size: .4rem;
  }
  .tabHead:nth-child(2) {
    flex: 1;
  }
  .tabHead:nth-child(1) {
    color: #e16e11;
  }
  .tabBody {
    display: flex;
    width: 100%;
  }
  .tab {
    width: 12%;
    color: #fff;
    box-sizing: border-box;
    padding: .5rem;
    border: 1px solid #3c2a26;
    font-size: .4rem;
    background: #4c322b;
  }
  .tab:nth-child(1) {
    color: #e16e11;
    background: none;
    border: 1px solid #4c322b;
  }
  .tab:nth-child(2) {
    flex: 1;
  }
  .bottomBtn {
    padding-top: 6%;
  }
</style>
