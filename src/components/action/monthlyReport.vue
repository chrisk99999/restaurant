<template>
  <div class="monthlyReport">
    <!-- 月报 -->
    <div class="left">
      <div v-for="(item, i) in btnList" :key="i">
        <div :class="!item.isSelect ? 'btn' : 'btn btnHover'" @click="selectBtn(item)">{{item.date}}</div>
      </div>
    </div>
    <div class="right">
      <div class="cardBox">
        <div class="card">
          <div class="cardHead">
            <img v-show="false" src="@/assets/updata.png" alt />
          </div>
          <div class="cardTit">上周最欢迎菜品</div>
          <div class="cardText">{{month}}</div>
        </div>
        <div class="card card2" @click="linkScore">
          <div class="cardHead">
            <img src="@/assets/query.png" alt />
          </div>
          <div class="cardTit">餐厅服务评价</div>
          <el-rate disabled class="rateBox" v-model="rate"></el-rate>
        </div>
      </div>
      <div class="cardBox">
        <div class="card card3" @click="dialogVisible = true">
          <div class="cardHead">
            <img src="@/assets/updata.png" alt />
          </div>
          <div class="cardContent">
            <img src="@/assets/monthlyReport_06.png" alt />
            <span v-if="notTaken !== ''">
              本月累计未取食物
              <span class="cardContentSpan">{{notTaken}}份</span>
            </span>
            <span v-else>暂无数据</span>
          </div>
        </div>
        <div class="card card4" @click="dialogVisible2 = true">
          <div class="cardHead">
            <img src="@/assets/updata.png" alt />
          </div>
          <div class="cardContent">
            <img class="cardImg" src="@/assets/monthlyReport_07.png" alt />
            <span v-if="waste !== ''">
              本月累计厨余垃圾
              <span class="cardContentSpan">{{waste}}吨</span>
            </span>
            <span v-else>暂无数据</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="40%"
      height="40%"
      custom-class="dialog"
      :before-close="handleClose"
      top="14%"
      center
    >
      <!-- <span>这是一段信息</span> -->
      <div class="dialogBody">
        <div class="dialog-text">
          本月累计未取食物
          <input class="dialog-input" v-model="notTaken" /> 份
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="warning" @click="save(1)" style="margin-right: 10%;" round>保存</el-button>
          <el-button type="success" @click="dialogVisible = false" round>取消</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible2"
      width="40%"
      height="40%"
      custom-class="dialog"
      :before-close="handleClose"
      top="14%"
      center
    >
      <!-- <span>这是一段信息</span> -->
      <div class="dialogBody">
        <div class="dialog-text">
          本月累计厨余垃圾
          <input class="dialog-input" v-model="waste" /> 吨
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="warning" @click="save(2)" style="margin-right: 10%;" round>保存</el-button>
          <el-button type="success" @click="dialogVisible2 = false " round>取消</el-button>
        </span>
      </div>
    </el-dialog>
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
      rate: 4,
      month: '',
      notTaken: '',
      notTakenid: '',
      waste: '',
      wasteid: '',
      mTime: '',
      btnList: [],
      dialogVisible: false,
      dialogVisible2: false
    }
  },
  created () {},
  mounted () {
    this.getAllMonth()
    this.getMonth()
    this.getRestaurant()
    this.getGarbage()
    this.GetFood()
  },
  methods: {
    linkScore () {
      this.$emit('linkScore')
    },
    getMonth () {
      this.$api.post('/admin/api/GetMonth', {}).then((res) => {
        if (res.data.code === 1) {
          console.log(res.data)
          this.month = res.data.msg.title
        } else {
          console.warn(res.data.msg)
          this.$message.error(res.data.msg)
        }
      })
    },
    getAllMonth () {
      this.$api.post('/admin/api/GetMenu').then((res) => {
        let list = []
        res.data.lists.forEach((item) => {
          // item.isSelect = false;
          list.push({
            ...item,
            isSelect: false
          })
        })
        list[list.length - 1].isSelect = true
        this.mTime = list[list.length - 1].time
        this.btnList = list
        // this.btnList[this.btnList.length-1].isSelect = true
        // console.log(this.btnList,'213yue')
      })
    },
    selectBtn (btnItem) {
      console.log(btnItem)

      this.btnList.forEach((item) => {
        item.isSelect = false
      })

      btnItem.isSelect = true
      this.mTime = btnItem.time
      console.log(this.mTime)
      this.GetFood()
      this.getGarbage()
    },
    getRestaurant () {
      this.$api.post('/admin/api/GetRestaurant', {}).then((res) => {
        if (res.data.code === 1) {
          console.log(res.data)
          this.rate = res.data.stars
        } else {
          console.warn(res.data.msg)
          this.$message.error(res.data.msg)
        }
      })
    },
    getGarbage () {
      let obj
      if (!this.mTime) {
        obj = ''
      } else {
        obj = { time: this.mTime }
      }
      this.$api.post('/admin/api/GetGarbage', obj).then((res) => {
        if (res.data.code === -1) {
          this.$message.error(res.data.msg)
          this.waste = ''
          this.wasteid = ''
        } else {
          this.waste = res.data.res.num
          this.wasteid = res.data.res.id
        }
      })
    },
    GetFood () {
      let obj
      if (!this.mTime) {
        obj = ''
      } else {
        obj = { time: this.mTime }
      }
      this.$api.post('/admin/api/GetFood', obj).then((res) => {
        if (res.data.code === -1) {
          this.$message.error(res.data.msg)
          this.notTaken = ''
          this.notTakenid = ''
        } else {
          this.notTaken = res.data.res.num
          this.notTakenid = res.data.res.id
        }
      })
    },
    save (type) {
      // type 1 未取 ----      type 2 --- 厨余垃圾
      switch (type) {
        case 1:
          // 未取
          if (this.notTakenid === '') {
            let notTaken = this.notTaken
            this.$api
              .post('/admin/api/InsertFood', {
                num: notTaken,
                time: this.mTime
              })
              .then((res) => {
                console.log(res)
                this.GetFood()
              })
          } else {
            // 有id 修改
            let notTaken = this.notTaken
            this.$api
              .post('/admin/api/InsertFood', {
                id: this.notTakenid,
                num: notTaken,
                time: this.mTime
              })
              .then((res) => {
                this.GetFood()
              })
          }
          this.dialogVisible = false
          break
        case 2:
          // 厨余垃圾
          // 没有id 新增
          if (this.wasteid === '') {
            let waste = this.waste
            this.$api
              .post('/admin/api/InsertGarbage', {
                num: waste,
                time: this.mTime
              })
              .then((res) => {
                console.log(res)
                this.getGarbage()
              })
          } else {
            // 有id 修改
            let waste = this.waste
            this.$api
              .post('/admin/api/InsertGarbage', {
                id: this.wasteid,
                num: waste,
                time: this.mTime
              })
              .then((res) => {
                this.getGarbage()
              })
          }
          this.dialogVisible2 = false
          break

        default:
          break
      }
    },
    // 弹窗
    handleClose (done) {
      done()
    }
  }
}
</script>

<style scoped>
.dialogBody {
  width: 100%;
  height: 2rem;
  line-height: 4;
  text-align: center;
}
.dialog-text {
  text-align: center;
  font-size: 0.27rem;
  padding-bottom: 0.5rem;
  color: #fff;
}
.dialog-input {
  height: 100%;
  background-color: transparent !important;
  border: none;
  overflow: hidden;
  border-bottom: 0.02rem solid #fff;
  outline: none;
  font-size: 0.2rem;
  width: 10%;
  border-radius: 0;
  box-shadow: none;
  color: #fff;
}
.monthlyReport {
  width: 100%;
  height: 100%;
  display: flex;
}
.left {
  margin: 0.28rem;
  width: 20%;
  height: 80%;
  box-sizing: border-box;
  overflow: auto;
}
.left .btn {
  padding: 0.1rem 0.44rem;
  font-size: 0.15rem;
  color: #fb882b;
  background: #3c2a36;
  border: 1px solid #653428;
  border-radius: 5rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 0.2rem;
}
.left .smallBtn {
  display: inline-block;
  padding: 0.11rem 0.29rem;
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
  margin-bottom: 0.5rem;
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
  margin-right: 0.3rem;
}
.card2 {
  background: url(~@/assets/monthlyReport_03.png) no-repeat;
  background-size: 100% 100%;
  margin-right: 0rem;
}
.card3 {
  background: url(~@/assets/monthlyReport_04.png) no-repeat;
  background-size: 100% 100%;
  margin-right: 0.3rem;
}
.card4 {
  background: url(~@/assets/monthlyReport_05.png) no-repeat;
  background-size: 100% 100%;
  margin-right: 0rem;
}
.cardHead {
  text-align: right;
  padding: 0.07rem;
  padding-bottom: 0;
}
.cardHead img {
  height: 0.15rem;
}
.cardTit {
  font-size: 0.2rem;
  border-bottom: 1px solid #fff;
  width: fit-content;
  margin: 0 auto;
  padding-top: 0.07rem;
  padding-bottom: 0.17rem;
}
.cardText {
  font-size: 0.18rem;
  width: fit-content;
  margin: 0 auto;
  margin-top: 0.17rem;
  margin-bottom: 0.3rem;
}
.rateBox {
  padding: 0.15rem 0;
}
.cardContent {
  padding-top: 0.3rem;
  padding-bottom: 0.5rem;
  font-size: 0.13rem;
}
.cardContent img {
  width: 0.37rem;
}
.cardContentSpan {
  font-size: 0.27rem;
}
.cardContent .cardImg {
  width: 0.26rem;
}
</style>
