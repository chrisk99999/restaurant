<template>
  <div class="nutrition">
    <!-- 营养 -->
    <div class="left">
      <div class="block">
        <el-date-picker
          v-model="month"
          type="month"
          :placeholder="$t('nutrition.nutritionText1')"
          @change="monthChange">
        </el-date-picker>
      </div>
      <div v-for="(item, i) in monthList" :key="i">
        <div :class="!item.isSelect ? 'btn' : 'btn btnHover'" @click="selectDate(item)">{{item.lists}} </div>
          <div v-if="item.isSelect" style="display: flex;flex-flow: row nowrap;justify-content: space-between;">
            <div @click="statusChange(1, item)"  :class="item.status === 1 ? 'btn smallBtn btnHover' : 'btn smallBtn'">{{$t("nutrition.nutritionText2")}}</div>
            <div @click="statusChange(2, item)" :class="item.status === 2 ? 'btn smallBtn btnHover' : 'btn smallBtn'">{{$t("nutrition.nutritionText3")}}</div>
        </div>
          <div v-if="item.isSelect" style="display: flex;flex-flow: row nowrap;justify-content: space-between;">
            <div @click="statusChange(3, item)" :class="item.status === 3 ? 'btn smallBtn btnHover' : 'btn smallBtn'">{{$t("nutrition.nutritionText4")}}</div>
            <div @click="statusChange(4, item)" :class="item.status === 4 ? 'btn smallBtn btnHover' : 'btn smallBtn'">{{$t("nutrition.nutritionText5")}}</div>
        </div>
          <div v-if="item.isSelect" style="display: flex;flex-flow: row nowrap;justify-content: space-between;">
            <div @click="statusChange(5, item)" :class="item.status === 5 ? 'btn smallBtn btnHover' : 'btn smallBtn'">{{$t("nutrition.nutritionText6")}}</div>
            <div @click="statusChange(6, item)" :class="item.status === 6 ? 'btn smallBtn btnHover' : 'btn smallBtn'">{{$t("nutrition.nutritionText7")}}</div>
        </div>
          <div v-if="item.isSelect" style="display: flex;flex-flow: row nowrap;justify-content: space-between;">
            <div @click="statusChange(7, item)" :class="item.status === 7 ? 'btn smallBtn btnHover' : 'btn smallBtn'">{{$t("nutrition.nutritionText8")}}</div>
        </div>
      </div>
    </div>
    <div class="right">
      <div v-if="!isUpdata" class="rightBox">
        <div class="cardList">
          <div class="cardBox" v-for="(item, i) in melaList" :key="i">
            <div class="card" @click="checkUpdata('updata', i)">
              <div class="cardContent">
                <div class="cardImg">
                  <el-image class="photo" fit="cover" :src="item.imageUrl">
                    <div slot="error" style="width: 1rem;height: 1rem;box-sizing: border-box;border: 1px solid #663024;" class="image-slot">
                      <i style="font-size: .3rem;margin-top: 0.35rem;" class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <!-- <img src="@/assets/nutrition_01.png" alt=""> -->
                  <div class="cardImgHeadTag" v-if="item.type">
                    <span style="color: #e9bc2a;padding-left: .02rem;padding-right: .15rem;">{{$t('nutrition.nutritionText9')}}</span>
                    <span style="color: #4b3626;">{{$t('nutrition.nutritionText10')}}</span>
                  </div>
                  <div class="cardImgBottomTag" v-if="item.limit">{{$t('nutrition.nutritionText16')}}{{item.limit}}</div>
                </div>
                <div class="cardContent_box">
                  <div class="cardContent_tit">{{item.title}}</div>
                  <div class="cardContent_text">{{item.content}}</div>
                </div>
              </div>
            </div>
            <div class="card card2">
              <div class="cardText">
                {{$t('nutrition.nutritionText21')}} {{item.click}} {{$t('nutrition.nutritionText22')}}
              </div>
            </div>
          </div>
        </div>
        <div class="bottomBtn" style="padding-right: .15rem;">
          <el-button type="warning" @click="checkUpdata" round>{{$t('nutrition.nutritionText11')}}</el-button>
        </div>
      </div>
      <div v-else class="updataBox">
        <div class="phoneView">
          <div class="phone_head">{{selectMonth.lists}}</div>
          <div class="cardList">
          <div class="cardBox" @click="clickCard(item)" v-for="(item, i) in melaList" :key="i">
            <div class="card">
              <div class="cardContent">
                <div class="cardImg">
                  <el-image class="photo" fit="cover" :src="item.imageUrl">
                    <div slot="error" style="width: 1rem;height: 1rem;box-sizing: border-box;border: 1px solid #663024;" class="image-slot">
                      <i style="font-size: .3rem;margin-top: 0.35rem;" class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <!-- <img src="@/assets/nutrition_01.png" alt=""> -->
                  <div class="cardImgHeadTag" v-if="item.type">
                    <span style="color: #e9bc2a;padding-left: .02rem;padding-right: .15rem;">{{$t('nutrition.nutritionText9')}}</span>
                    <span style="color: #4b3626;">{{$t('nutrition.nutritionText10')}}</span>
                  </div>
                  <div class="cardImgBottomTag" v-if="item.limit">{{$t('nutrition.nutritionText16')}}{{item.limit}}</div>
                </div>
                <div class="cardContent_box">
                  <div class="cardContent_tit">{{item.title}}</div>
                  <div class="cardContent_text">{{item.content}}</div>
                </div>
              </div>
            </div>
          </div>
            <div class="addCard" @click="addCard">
              <img src="@/assets/nutrition_03.png" alt="">
            </div>
          </div>
        </div>
        <div class="updataPhone">
          <el-input v-model="phone.title" :placeholder="$t('nutrition.nutritionText17')"></el-input>
          <el-input v-model="phone.num" class="num" style="width: 35%;padding-top: .1rem;font-size: .05rem;"  :placeholder="$t('nutrition.nutritionText18')">
            <template slot="prepend">{{$t('nutrition.nutritionText19')}}</template>
          </el-input>
          <el-input type="textarea" resize="none" v-model="phone.content" :rows="6" :placeholder="$t('nutrition.nutritionText20')" style="font-size: .1rem;padding-top: .1rem;" ></el-input>
          <el-upload
            class="avatar-uploader"
            action="/admin/api/webUploaderImages"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <div class="uploadBox">
              <img v-if="phone.imageUrl" style="max-width: 90%;height: 85%;margin-top: 2%;" :src="phone.imageUrl" class="avatar">
              <img v-else style="width: .5rem;margin: .3rem 0;" src="@/assets/nutrition_03.png" alt="">
            </div>
          </el-upload>
          <div style="margin-top: .1rem;display: flex;">
            <div style="display: flex;margin-right: .2rem;" v-if="phone.type" @click="phone.type = 0">
              <div class="cardImgHeadTag">
                <span style="color: #e9bc2a;padding-left: .02rem;padding-right: .15rem;">{{$t(nutrition.nutritionText9)}}</span>
                <span style="color: #4b3626;">{{$t(nutrition.nutritionText10)}}</span>
              </div>
              <img style="cursor: pointer;height: 0.15rem;padding-top: .04rem;padding-left: .04rem;" src="@/assets/nutrition_04.png" alt="">
            </div>
            <div style="display: flex;margin-right: .2rem;" v-else @click="phone.type = 1">
              <div class="cardImgHeadTag noneTag">
                <span style="color: #aaa;padding-left: .02rem;padding-right: .4rem;">+</span>
                <span style="color: #aaa;padding-right: .05rem;">+</span>
              </div>
              <img style="cursor: pointer;height: 0.15rem;padding-top: .04rem;padding-left: .04rem;" src="@/assets/nutrition_06.png" alt="">
            </div>
            <div class="addTag" v-if="!phone.limit" @click="phone.limit = 1">
              <img src="@/assets/nutrition_07.png" alt="">
            </div>
            <div class="addTag" v-else style="padding: .02rem .1rem;">
              <input v-model="phone.limit" maxlength="5" @input="isNumber" type="text">
              <img src="@/assets/nutrition_04.png" @click="phone.limit = 0" alt="">
            </div>
          </div>
          <div class="bottomBtn">
            <el-button type="warning" @click="savePhone" round>{{$t('nutrition.nutritionText11')}}</el-button>
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
      month: '',
      monthList: [],
      selectMonth: {},
      isUpdata: false,
      phone: {
        imageUrl: '',
        title: ' ',
        num: '',
        content: '',
        time: '',
        photo: '',
        type: '',
        limit: '',
        week: 1

      },
      melaList: []
    }
  },
  mounted () {
  },
  methods: {
    // 选择天
    statusChange (status, item) {
      console.log(item)
      item.status = status
      this.phone.week = status
      let obj = this.$qs.stringify({
        time: item.time,
        week: status
      })
      this.$api.post('/admin/api/GetMeal', obj).then(res => {
        if (res.data.code === 1) {
          console.warn(res.data)
          let list = res.data.lists
          let data = []
          list.forEach(item => {
            data.push({
              ...item,
              imageUrl: item.photo === null ? '' : 'http://ep.zerom.cn' + item.photo
            })
          })
          this.melaList = data
          if (list.length === 0) {
            this.$message.error(this.$t('nutrition.nutritionText12'))
          }
        } else {
          console.warn(res.data.msg)
          this.$message.error(res.data.msg)
        }
      })
    },

    // 时间格式转换
    formatDate (date) {
      var year = date.getFullYear()
      var month = this.format(date.getMonth() + 1)
      return year + '-' + month
    },
    format (val) {
      return Number(val) < 10 ? '0' + val : '' + val
    },
    // 获取月周列表
    getMonthList (date) {
      console.log(date)
      let obj = this.$qs.stringify({
        date: date
      })
      this.$api.post('/admin/api/weekly', obj).then(res => {
        if (res.data.code === 1) {
          console.warn(res.data, 'weekly')
          let list = res.data.date
          let data = []
          list.forEach(item => {
            data.push({
              ...item,
              isSelect: false,
              status: 1
            })
          })
          data[0].isSelect = true
          this.selectMonth = data[0]
          this.getMeal(this.selectMonth)
          this.monthList = data
          this.phone.time = this.selectMonth.time
          // this.$router.push({path: '/home'})
        } else {
          console.warn(res.data.msg)
          this.$message.error(res.data.msg)
        }
      })
    },
    // 选择月份
    monthChange (val) {
      this.getMonthList(this.formatDate(val))
    },
    // 选择月周列表
    selectDate (item) {
      this.monthList.forEach(monthItem => {
        monthItem.isSelect = false
      })
      console.log(item, '213')
      item.isSelect = true
      this.selectMonth = item
      this.isUpdata = false
      this.getMeal(item)
      this.phone.time = item.time
      console.log(this.phone.time)
    },
    // 卡片列表
    getMeal (item) {
      let obj = this.$qs.stringify({
        time: item.time,
        week: this.phone.week
      })
      this.$api.post('/admin/api/GetMeal', obj).then(res => {
        if (res.data.code === 1) {
          console.warn(res.data)
          let list = res.data.lists
          let data = []
          list.forEach(item => {
            data.push({
              ...item,
              imageUrl: item.photo === null ? '' : 'http://ep.zerom.cn' + item.photo
            })
          })
          this.melaList = data
          if (list.length === 0) {
            this.$message.error(this.$t('nutrition.nutritionText12'))
          }
        } else {
          console.warn(res.data.msg)
          this.$message.error(res.data.msg)
        }
      })
    },
    handleAvatarSuccess (res, file) {
      this.phone.imageUrl = 'http://ep.zerom.cn' + res.data.path
      this.phone.photo = res.data.path
      console.log(this.phone.imageUrl)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      console.log(file.type)

      if (!isJPG) {
        this.$message.error(this.$t('nutrition.nutritionText13'))
      }
      if (!isLt2M) {
        this.$message.error(this.$t('nutrition.nutritionText14'))
      }
      return isJPG && isLt2M
    },
    checkUpdata (type, i) {
      this.isUpdata = !this.isUpdata
      if (type === 'updata') {
        this.phone = this.melaList[i]
      }
      // if (type === 'add') {
      // } else {
      // }
    },
    savePhone () {
      let obj = {
        title: this.phone.title,
        num: this.phone.num,
        content: this.phone.content,
        time: this.phone.time,
        photo: this.phone.photo || '',
        type: this.phone.type,
        limit: this.phone.limit || 0,
        week: this.phone.week || 1
      }
      console.log(this.phone.time)
      if (this.phone.id) {
        obj.id = this.phone.id
      }
      console.log(obj)
      this.$api.post('/admin/api/InsertSetMeal', this.$qs.stringify({...obj})).then(res => {
        if (res.data.code === 1) {
          this.$message({
            showClose: true,
            message: this.$t('nutrition.nutritionText15'),
            type: 'success'
          })
        } else {
          console.warn(res.data.msg)
          this.$message.error(res.data.msg)
        }
      })
    },
    // 正则
    isNumber () {
      if (/^[0-9]*$/.test(Number(this.phone.limit))) {
        console.log('111')
      } else {
        this.phone.limit = this.phone.limit.match(/\d+/g) || 0
      }
    },
    // 新增卡片
    addCard () {
      var item = {
        title: '',
        num: 0,
        content: '',
        imageUrl: '',
        photo: '',
        type: '',
        limit: 0,
        time: this.selectMonth.time
      }
      this.melaList.unshift(item)
      this.clickCard(item)
    },
    // 点击手机卡片编辑
    clickCard (item) {
      this.phone = item
    }
  }
}
</script>

<style scoped>
  .nutrition {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
  }
  .left {
    padding: .28rem;
    width: 20%;
    min-width: 218px;
  }
  .left .el-date-editor.el-input {
    width: 100%;
    margin-bottom: .2rem;
  }
  /* .el-input--prefix .el-input__inner */
  .left .el-input--prefix .el-input__inner {
    padding-left: .2rem;
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
  .left .addBtn {
    background: #ffffcc;
  }
  .left .addBtn img {
    height: .1rem;
  }
  .right {
    width: 100%;
    flex: 1;
    height: 99%;
    overflow: hidden;
    padding-top: 1%;
    padding-right: 1%;
    box-sizing: border-box;
  }
  .updataBox,
  .rightBox {
    border: 1px solid #c29b29;
    border-radius: 10px;
    background: #3c2a26;
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
     height: 90%;
    display: flex;
    flex-flow: column;
    padding: 2% 0;
  }
  .cardList {
    flex: 1;
    overflow: auto;
    padding: 0 2%;
    height: 50%;
  }
  .cardBox {
    display: flex;
    text-align: center;
    justify-content: center;
    margin-bottom: 2%;
  }
  .card:nth-child(1) {
    margin-right: 5%;
  }
  .card {
    /* width: 40%; */
    flex: 1;
    background-size: 100% 100%;
    /* margin-right: 4%;
    margin-top: 3%;
    margin-bottom: 3%; */
    box-sizing: border-box;
    color: #fff;
    border: 1px solid #663024;
    cursor: pointer;
  }
  .bottomBtn {
    padding-top: 3%;
  }
  .bottomBtn .el-button {
    padding: .06rem .2rem;
    border-radius: 5rem;
  }
  .bottomBtn .el-button--warning {
    color: #333;
  }
  .card2 {
    background: url(~@/assets/monthlyReport_02.png) no-repeat;
    background-size: 100% 100%;
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
    font-size: .29rem;
    padding: 10% 0;
  }
  .rateBox {
    padding-top: .6rem;
  }
  .cardContent {
    display: flex;
    padding: .03rem;
    position: relative;
  }
  .cardContent .cardImg .photo{
    height: 1rem;
    width: 1rem;
  }
  .cardContent .cardImgHeadTag {
    display: flex;
    background: url(~@/assets/nutrition_02.png) no-repeat;
    background-size: 100% 100%;
    width: max-content;
    padding: .05rem;
    position: absolute;
    top: 5%;
    left: 0.5%;
  }
  .cardContent .cardImgBottomTag {
    position: absolute;
    padding: .02rem;
    bottom: 8%;
    left: 2%;
    background: rgba(0, 0, 0, .3);
    border-radius: .03rem;
  }
  .cardContent_box {
    text-align: left;
    padding: .05rem;
  }
  .cardContent_box .cardContent_tit {
    font-size: .13rem;
    color: #fb882b;
  }
  .cardContent_box .cardContent_text {
    font-size: .07rem;
    padding-top: .1rem;
    line-height: 1.8;
  }
  .updataBox {
    flex-flow: nowrap;
    padding: 0;
    border-radius: .2rem;
  }
  .updataBox .phoneView {
    width: 2.6rem;
    border: 1px solid #fbcd2b;
    border-radius: .2rem;
    height: 100%;
    box-sizing: border-box;
    background: #51352b;
    overflow: auto;
  }
  .updataBox .phoneView .phone_head {
    color: #fff;
    font-size: .14rem;
    padding: .14rem;
    text-align: left;
  }
  .updataBox .phoneView .cardList {
    height: 80%;
    padding: 0 .14rem;
  }
  .updataBox .phoneView .card {
    background: #3c2a26;
  }
  .updataBox .phoneView .addCard {
    padding: .25rem;
    background: #3c2a26;
    width: max-content;
    cursor: pointer;
  }
  .updataBox .phoneView .addCard img {
    height: .3rem;
  }
  .updataPhone {
    flex: 1;
    box-sizing: border-box;
    padding: .15rem .3rem;
    text-align: left;
  }
  .uploadBox {
    border: 0.005208rem solid #663024;
    border-radius: .05rem;
    text-align: center;
    width: 3.91rem;
    height: 1.2rem;
    margin-top: .1rem;
    box-sizing: border-box;
  }
  .updataPhone .cardImgHeadTag {
    display: flex;
    background: url(~@/assets/nutrition_02.png) no-repeat;
    background-size: 100% 100%;
    width: max-content;
    padding: .05rem;
    /* position: absolute;
    top: 5%;
    left: 0.5%; */
  }
  .updataPhone .noneTag {
    display: flex;
    background: url(~@/assets/nutrition_05.png) no-repeat;
    background-size: 100% 100%;
    width: max-content;
    padding: .05rem;
    /* position: absolute;
    top: 5%;
    left: 0.5%; */
  }
  .updataPhone .addTag {
    background: rgba(255, 255, 255, .1);
    padding: .02rem .3rem;
    border-radius: .05rem;
    cursor: pointer;
    display: flex;
  }
  .updataPhone .addTag img {
    height: 0.15rem;
  }
  .updataPhone .addTag input {
    background: none;
    border: none;
    outline: none;
    width: .3rem;
    height: 0.15rem;
  }
  .bottomBtn {
    padding: .1rem 0;
    text-align: right;
  }
  .bottomBtn .el-button--warning {
    color: #333;
  }
</style>
