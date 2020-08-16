<template>
  <div class="score">
    <!-- 评分 -->
    <div class="left">
      <div>
        <div :class="selectIndex === 0 ? 'btn btnHover' : 'btn'" @click="changeBtn(0)">营养餐评分</div>
      </div>
      <div>
        <div :class="selectIndex === 1 ? 'btn btnHover' : 'btn'" @click="changeBtn(1, 0)">固定菜品评价</div>
        <div v-if="selectIndex === 1" style="display: flex;flex-flow: row nowrap;justify-content: space-between;">
          <div :class="smIndex === 0 ? 'btn smallBtn btnHover' : 'btn smallBtn'" @click="changeBtn(1, 0)">查看</div>
          <div :class="smIndex === 1 ? 'btn smallBtn btnHover' : 'btn smallBtn'" @click="changeBtn(1, 1)">编辑</div>
        </div>
      </div>
      <div>
        <div :class="selectIndex === 2 ? 'btn btnHover' : 'btn'" @click="changeBtn(2)">餐厅评价</div>
      </div>
    </div>
    <div v-if="selectIndex === 0" class="right">
      <div class="rightList">
        <div class="listHead">
          <div class="headSelect">
            <el-select v-model="month" style="width: 1rem;margin-right: .1rem;" @change="fliterMonth" placeholder="请选择">
              <el-option
                v-for="(item) in monthList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
            <el-select v-model="week" style="width: 1rem;" @change="fliterWeek" placeholder="请选择">
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
              <img src="@/assets/score_01.png" style="position: absolute;left: -0.05rem;top: 0;width: .2rem;" alt="">
              {{evaluateStatus.like}}
            </div>
            <div class="num">
              <img src="@/assets/score_02.png" style="position: absolute;left: -0.05rem;top: 0;width: .2rem;" alt="">
              {{evaluateStatus.dislike}}
            </div>
          </div>
        </div>
        <template v-if="dataList !==[]">
        <div class="li" v-for="(item,i) in dataList " :key ='i' >
          <div class="userInfo">
            姓名 <span>{{item.name}}</span>
            工号 <span>NO.{{item.tem}}</span>
            已选 <span>{{item.title}}</span>
          </div>
          <div class="content">
            {{item.content}}
          </div>
          <div class="time">
            <div style="text-align: right;">
              <img v-if="item.like === 1" src="@/assets/score_01.png" style="width: .2rem;" alt="">
              <img v-else src="@/assets/score_02.png" style="width: .2rem;" alt="">
            </div>
            <p style="color: #aaa;margin-top: 0;">{{item.create_time}}</p>
          </div>
        </div>
        </template>
      </div>
    </div>
    <div v-if="selectIndex === 1 && smIndex === 0" class="right">
      <div class="rightList">
        <div class="listHead">
          <div class="headSelect">
            <el-select v-model="month" style="width: 1rem;margin-right: .1rem;" @change="fliterMonth" placeholder="请选择">
              <el-option
                v-for="item in monthList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="week" style="width: 1rem;" @change="fliterWeek" placeholder="请选择">
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
              <img src="@/assets/score_01.png" style="position: absolute;left: -0.05rem;top: 0;width: .19rem;" alt="">
              {{evaluateStatus.like}}
            </div>
            <div class="num">
              <img src="@/assets/score_02.png" style="position: absolute;left: -0.05rem;top: 0;width: .19rem;" alt="">
              25
            </div>
          </div>
        </div>
        <div class="li" v-for="(item, i) in setmealList" :key="i">
          <div class="userInfo">
            姓名 <span>{{item.name}}</span>
            工号 <span>NO.100532</span>
            已选 <span>套餐A</span>
          </div>
          <div class="content">
            {{item.content === null ? '暂无评价' : item.content}}
          </div>
          <div class="time">
            <div style="text-align: right;">
              <img v-if="item.like === 1" src="@/assets/score_01.png" style="width: .2rem;" alt="">
              <img v-else src="@/assets/score_02.png" style="width: .2rem;" alt="">
            </div>
            <p style="color: #aaa;margin-top: 0;">{{item.create_time}}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectIndex === 1 && smIndex === 1" class="right">
      <div class="updataBox">
        <div class="phoneView">
          <!-- <div class="phone_head">精品菜</div> -->
          <!-- <el-input v-model="phone.title" placeholder="请输入标题"></el-input> -->
          <el-select v-model="month" class="headSelect1" style="width: 1.5rem;margin: 0 auto;margin-top: .3rem;background: #51352b;" @change="fliterMonth" placeholder="请选择">
            <el-option
              v-for="item in monthList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="tags-bar">
            <div class="tag"><p class="t">周一</p></div>
            <div class="tag"><p class="t">早餐</p></div>
            <div class="tag"><p class="t">套餐</p></div>
          </div>
          <div class="cardList" v-if="nowWeeklyList.length > 0">
            <div class="card">
              <div class="cardTextBox">
                <div class="cardTit">
                  <!-- {{item.title}} -->
                  套餐
                </div>
              </div>
              <div class="box-bottom">
              <el-image class="photo" fit="cover" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png">
              <!-- <el-image class="photo" fit="cover" :src="item.imageUrl">
                <div slot="error" style="width: 1rem;height: 1rem;box-sizing: border-box;border: 1px solid #663024;" class="image-slot">
                  <i style="font-size: .3rem;margin-top: 0.35rem;" class="el-icon-picture-outline"></i>
                </div> -->
              </el-image>
                <div class="bot-con">
                    <p>红烧牛肉</p>
                    <p>红烧牛肉</p>
                    <p>红烧牛肉</p>
                    <p>红烧牛肉</p>
                </div>
              </div>
              <img class="delIcon" src="@/assets/nutrition_04.png" alt="">
            </div>
            <!-- <div class="addCard">
              <img src="@/assets/nutrition_03.png" alt="">
            </div> -->
          </div>
        </div>
        <div class="updataPhone">
          <div class="phoneContent">
            <div class="updataCard" v-if="nowWeeklyList.length">
              <div class="updataCardText">
                <div class="updataCardHead">
                  <div class="tag">周一</div>
                  <div class="tag">早餐</div>
                </div>
                <div class="updataCardText_name">
                  套餐A
                </div>
              </div>
              <div class="uploadBox">
                <img src="@/assets/nutrition_03.png" alt="">
              </div>
            </div>
          </div>
          <div class="bottomBtn">
            <el-button type="warning" v-if="nowWeeklyList.length" round>保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectIndex === 2" class="right">
      <div class="rightList">
        <div class="listHead">
          <div class="headSelect">
            <el-select v-model="month" style="width: 1rem;margin-right: .1rem;" @change="fliterMonth" placeholder="请选择">
              <el-option
                v-for="item in monthList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="week" style="width: 1rem;" @change="fliterWeek" placeholder="请选择">
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
              :value="Number(Number(restaurant).toFixed(1))"
              disabled
              show-score
              text-color="#ff9900">
            </el-rate>
          </div>
        </div>
        <div class="li" v-for="(item, i) in getRestaurantList" :key="i">
          <div class="userInfo" >
            姓名 <span>{{item.name}}</span>
            工号 <span>NO.{{item.tem}}</span>
            <!-- 已选 <span>套餐A</span> -->
          </div>
          <div class="content">
            {{item.content}}
          </div>
          <div class="time">
            <div style="text-align: right;">
              <el-rate
                :value="Number(item.stars)"
                disabled
                show-score
                text-color="#ff9900">
              </el-rate>
            </div>
            <p style="color: #aaa;">{{item.create_time}}</p>
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
      dataList: [],
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
        }, {
          label: '第5周',
          value: '5'
        }
      ],
      isReta: false,
      rate: 4,
      selectIndex: 0,
      smIndex: 0,
      setmealList: [],
      getRestaurantList: [],
      boutiqueList: [],
      phone: {},
      nowWeeklyList: [],
      evaluateStatus: {
        dislike: 0,
        like: 0
      },
      Restaurant: 0,
      queryMont: '',
      queryWeek: ''
    }
  },
  mounted () {
    this.getEvaluate()
  },
  methods: {
    fliterMonth (val) {
      this.queryMont = val
      let saveObj = {
        time: this.queryMont
      }
      let obj = this.$qs.stringify(saveObj)
      switch (this.selectIndex) {
        case 0:
          this.$api.post('/admin/api/GetEvaluate', obj).then(res => {
            if (res.data.code === 1) {
              this.dataList = res.data.lists
            } else {
              this.$message.error(res.data.msg)
              this.dataList = []
            }
          })
          break
        case 1:
          this.$api.post('/admin/api/GetSetmeal', obj).then(res => {
            if (res.data.code === 1) {
              this.setmealList = res.data.lists
            } else {
              this.$message.error(res.data.msg)
              this.setmealList = []
            }
          })
          break
        case 2:
          this.$api.post('/admin/api/GetRestaurant', obj).then(res => {
            if (res.data.code === 1) {
              this.getRestaurantList = res.data.lists
            } else {
              this.$message.error(res.data.msg)
              this.getRestaurantList = []
            }
          })
          break
        default:
          break
      }
    },
    fliterWeek (i) {
      this.queryWeek = i
      let saveObj = {
        time: this.queryMont,
        week: this.queryWeek
      }
      let obj = this.$qs.stringify(saveObj)
      switch (this.selectIndex) {
        case 0:
          this.$api.post('/admin/api/GetEvaluate', obj).then(res => {
            if (res.data.code === 1) {
              this.dataList = res.data.lists
            } else {
              this.$message.error(res.data.msg)
              this.dataList = []
            }
          })
          break
        case 1:
          this.$api.post('/admin/api/GetSetmeal', obj).then(res => {
            if (res.data.code === 1) {
              this.setmealList = res.data.lists
            } else {
              this.$message.error(res.data.msg)
              this.setmealList = []
            }
          })
          break
        case 2:
          this.$api.post('/admin/api/GetRestaurant', obj).then(res => {
            if (res.data.code === 1) {
              this.getRestaurantList = res.data.lists
            } else {
              this.$message.error(res.data.msg)
              this.getRestaurantList = []
            }
          })
          break
        default:
          break
      }
    },
    getEvaluate (isSelect, val) {
      this.selectIndex = 0
      isSelect = isSelect || false
      let obj = {}
      if (isSelect) {
        let saveObj = {
          time: val
        }
        obj = this.$qs.stringify(saveObj)
      }
      this.$api.post('/admin/api/GetEvaluate', obj).then(res => {
        if (res.data.code !== 1) {
          this.$message.error(res.data.msg)
          return
        }
        console.log(res)
        let resDate = res.data.date
        let data = []
        let mont = []
        this.evaluateStatus = res.data.status
        res.data.lists.forEach(item => {
          data.push({
            ...item
          })
        })
        this.dataList = data
        if (!isSelect) {
          resDate.forEach(item => {
            if (mont.length === 0) {
              mont.push({
                value: item.time,
                label: item.date + '月'
              })
            } else {
              for (var i = 0; i < mont.length; i++) {
                let montItem = mont[i]
                console.warn(mont, item)
                if (montItem.value !== item.time && i === mont.length - 1) {
                  mont.push({
                    value: item.time,
                    label: item.date + '月'
                  })
                  break
                }
              }
            }
          })
          this.monthList = mont
        }
      })
    },
    getSetmeal () {
      this.selectIndex = 1
      this.$api.post('/admin/api/GetSetmeal', {}).then(res => {
        if (res.data.code !== 1) {
          this.$message.error(res.data.msg)
          return
        }
        console.log(res)
        let resDate = res.data.date
        let data = []
        let mont = []
        res.data.lists.forEach(item => {
          data.push({
            ...item
          })
        })
        this.setmealList = data
        resDate.forEach(item => {
          if (mont.length === 0) {
            mont.push({
              value: item.time,
              label: item.date + '月'
            })
          } else {
            // mont.forEach(dateItem => {
            //   console.warn(dateItem, item)
            //   if () {}
            // })
            for (var i = 0; i < mont.length; i++) {
              let montItem = mont[i]
              console.warn(mont, item)
              if (montItem.value !== item.time && i === mont.length - 1) {
                mont.push({
                  value: item.time,
                  label: item.date + '月'
                })
                break
              }
            }
          }
        })
        this.monthList = mont
      })
    },
    getRestaurant () {
      this.selectIndex = 2
      this.$api.post('/admin/api/GetRestaurant', {}).then(res => {
        console.log(res)
        if (res.data.code !== 1) {
          this.$message.error(res.data.msg)
          return
        }
        let resDate = res.data.date
        let data = []
        let mont = []
        this.restaurant = res.data.stars
        res.data.lists.forEach(item => {
          data.push({
            ...item
          })
        })
        this.getRestaurantList = data
        resDate.forEach(item => {
          if (mont.length === 0) {
            mont.push({
              value: item.time,
              label: item.date + '月'
            })
          } else {
            // mont.forEach(dateItem => {
            //   console.warn(dateItem, item)
            //   if () {}
            // })
            for (var i = 0; i < mont.length; i++) {
              let montItem = mont[i]
              console.warn(mont, item)
              if (montItem.value !== item.time && i === mont.length - 1) {
                mont.push({
                  value: item.time,
                  label: item.date + '月'
                })
                break
              }
            }
          }
        })
        this.monthList = mont
      })
    },
    getNowWeekly () {
      this.smIndex = 1
      let saveObj = {
        time: 1593532800
      }
      let obj = this.$qs.stringify(saveObj)
      this.$api.post('/admin/api/getNowWeekly', obj).then(res => {
        if (res.data.code === 1) {
          console.log(res)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    changeBtn (index, smIndex) {
      this.selectIndex = index
      this.smIndex = smIndex === undefined ? this.smIndex : smIndex
      this.week = ''
      if (smIndex === undefined) {
        this.monthList = []
        this.month = ''
      }
      if (index === 0) {
        this.getEvaluate()
      } else if (index === 1) {
        if (smIndex === 0) {
          this.getSetmeal()
        } else {
          this.getNowWeekly()
        }
      } else {
        this.getRestaurant()
      }
    }
    // fliterWeek(){
    // }
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
    margin: .28rem;
    width: 20%;
    height: 80%;
    box-sizing: border-box;
    overflow: auto;
  }
  .left .btn {
    padding: .1rem .44rem;
    font-size: .1rem;
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
    padding: 0;
    height: .3rem;
    line-height: .3rem;
    width: 45%;
  }
  .left .btnHover,
  .left .btn:hover {
    background: #fbcd2b;
    color: #333;
    border: 1px solid #fbcd2b;
  }
  .right {
    flex: 1;
    padding: 3%;
    box-sizing: border-box;
    height: 90%;
  }
  .rightList {
    height: 100%;
    border: 2px solid #aa8629;
    border-radius: 20px;
    background: #3c2a26;
    box-sizing: border-box;
    padding: .1rem;
    overflow: auto;
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
    padding: .05rem .15rem;
    display: inline-block;
    border-radius: 50px;
    margin-right: .05rem;
    position: relative;
    min-width: 40px;
    text-align: right;
  }
  .li {
    display: flex;
    color: #fff;
    font-size: .08rem;
    text-align: left;
    padding: .05rem .1rem;
    margin: .05rem 0;
    border: 1px solid #663024;
  }
  .userInfo {
    width: 1.1rem;
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
  .updataBox{
    border: 1px solid #c29b29;
    border-radius: 10px;
    background: #3c2a26;
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
     height: 98%;
    display: flex;
    padding: 0;
    border-radius: .2rem;
  }
  .updataBox .phoneView {
    width: 2.2rem;
    border: 1px solid #fbcd2b;
    border-radius: .2rem;
    height: 100%;
    box-sizing: border-box;
    background: #51352b;
    overflow: auto;
    text-align: left;
    display: flex;
    flex-flow: column;
  }
  .updataBox .phoneView .phone_head {
    color: #fbcd2b;
    font-size: .14rem;
    padding: .14rem 0;
    padding-bottom: .05rem;
    text-align: center;
    width: fit-content;
    margin: 0 auto;
    border-bottom: .02rem solid #fbcd2b;
  }
  .tags-bar{
    width: 100%;
    padding: .15rem;
    box-sizing: border-box;
    display: flex;
    font-size: .1rem;
    color: #fbcd2b;
  }
  .tag{
    /* width: .5rem; */
    border: 2px solid #663024;
    /* padding-left: .1rem; */
    padding: .05rem;
    margin-right: .1rem;
    background: #3C2A26;
  }
  .tag .t{
    padding: 0;
    padding-left: .1rem;
    margin: 0;
    /* height: 40%; */
    border-left: 4px solid #fbcd2b;
  }
  .updataPhone {
    flex: 1;
    box-sizing: border-box;
    padding: .15rem .3rem;
    text-align: left;
    display: flex;
    flex-flow: column;
  }
  .phoneContent {
    margin-top: .1rem;
    box-sizing: border-box;
    color: #fff;
    font-size: .1rem;
    overflow: auto;
    height: 80%;
  }
  .phoneContent_img {
    width: 100%;
    height: 1.7rem;
    border-radius: .1rem;
    margin: .1rem 0;
  }
  .cardList {
    padding: .06rem .13rem;
    overflow: auto;
  }
  .card .photo {
    width: 1.14rem;
    height: .7rem;

  }
  .box-bottom{
    display: flex;
    /* max-height: .76rem; */
    padding: .1rem;
    box-sizing: border-box;
  }
  .box-bottom p{
    padding: 0;
    margin: 0.05rem;
  }
  .card {
    width: 2.3rem;
    text-align: left;
    color: #fff;
    /* border-radius: .1rem; */
    display: inline-block;
    margin-right: 4%;
    margin-bottom: .1rem;
    position: relative;
    border: 0.005208rem solid #663024;
    background: #3c2a26;
    /* border-top-right-radius: .07rem; */

  }
  .card .delIcon {
    height: .14rem;
    width: .14rem;
    position: absolute;
    top: -0.07rem;
    right: -0.07rem;
  }
  .card .cardTextBox {
    background: #3c2a26;
    padding: .05rem;
    border-bottom: 1px solid #4d322b;
  }
  .card .cardTit {
    font-size: .1rem;
    color: #dc6841;
    /* padding: .07rem 0; */
  }
  .phoneView .addCard {
    padding: .3rem .37rem;;
    background: #3c2a26;
    width: max-content;
    cursor: pointer;
  }
  .updataBox .phoneView .addCard img {
    height: .3rem;
  }
  .btnPhone {
    padding: .15rem .2rem 0 0 ;
    position: relative;
  }
  .btnBox {
    padding: .15rem;
    border: 1px solid #663024;
    position: relative;
    margin-bottom: .2rem;
  }
  .btnBox .addIcon {
    position: absolute;
    height: .14rem;
    width: .14rem;
    top: -0.07rem;
    right: -0.07rem;
  }
  .bottomBtn {
    position: absolute;
    bottom: .3rem;
    right: .2rem;
  }
  .bottomBtn .el-button {
    padding: .06rem .2rem;
    border-radius: 5rem;
  }
  .bottomBtn .el-button--warning {
    color: #333;
  }
  .updataCard {
    display: flex;
    border: 0.010417rem solid #663024;
    padding: .1rem .15rem;
  }
  .updataCardText {
    display: flex;
    flex-flow: column;
    width: 60%;
  }
  .updataCardText_name {
    border: 0.010417rem solid #663024;
    padding: .05rem;
    background: #3C2A26;
    margin-top: .1rem;
    height: .4rem;
  }
  .updataCard .updataCardHead {
    display: flex;
  }
  .updataCard .updataCardHead .tag {
    flex: 1;
  }
  .updataCard .updataCardHead .tag:last-child {
    margin-right: 0;
  }
  .uploadBox {
    padding: .26rem;
    border: 0.010417rem solid #663024;
    margin-left: .2rem;
  }
  .uploadBox img{
    width: .3rem;
  }
</style>
