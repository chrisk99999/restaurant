<template>
  <div class="week">
    <!-- 每周 -->
    <div class="left">
      <div class="block">
        <el-date-picker
          v-model="month"
          type="month"
          :placeholder="$t('week.week1')"
          @change="monthChange">
        </el-date-picker>
      </div>
      <div v-for="(item, i) in monthList" :key="i">
        <div :class="!item.isSelect ? 'btn' : 'btn btnHover'" @click="selectDate(item)">{{item.lists}}</div>
        <div v-if="item.isSelect" style="display: flex;flex-flow: row nowrap;justify-content: space-between;">
            <div @click="statusChange(0, item)" :class="item.status === 0 ? 'btn smallBtn btnHover' : 'btn smallBtn'">{{$t("week.week2")}}</div>
            <div @click="statusChange(1, item)" :class="item.status === 1 ? 'btn smallBtn btnHover' : 'btn smallBtn'">{{$t("week.week3")}}</div>
        </div>
        <div v-if="item.isSelect" style="display: flex;flex-flow: row nowrap;justify-content: space-between;">
            <div @click="statusChange(2, item)" :class="item.status === 2 ? 'btn smallBtn btnHover' : 'btn smallBtn'">{{$t("week.week4")}}</div>
            <div @click="statusChange(3, item)" :class="item.status === 3 ? 'btn smallBtn btnHover' : 'btn smallBtn'">{{$t("week.week5")}}</div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="rightTab">
        <div class="tabHeadBox">
          <div class="tabHead" v-for="(item, i) in tableHead" :key="i">{{i === tableHead.length - 1 ? $t('week.week13') : item.name}}</div>
        </div>
        <div class="tabBodyBox">
          <div class="tabBody" v-for="(item, i) in tableData" :key="i">
            <div class="tab">{{item.menu1 || '-'}}</div>
            <div class="tab">
              <el-input v-if="item.isUpdata && tableHead[1].name !== '+'" v-model="item.menu2" :placeholder="$t('week.week6') + tableHead[1].name"></el-input>
              <span v-else>{{item.menu2 || '-'}}</span>
            </div>
            <div class="tab">
              <el-input v-if="item.isUpdata && tableHead[2].name !== '+'" v-model="item.menu3" :placeholder="$t('week.week6') + tableHead[2].name"></el-input>
              <span v-else>{{item.menu3 || '-'}}</span>
            </div>
            <div class="tab">
              <el-input v-if="item.isUpdata && tableHead[3].name !== '+'" v-model="item.menu4" :placeholder="$t('week.week6') + tableHead[3].name"></el-input>
              <span v-else>{{item.menu4 || '-'}}</span>
            </div>
            <div class="tab">
              <el-input v-if="item.isUpdata && tableHead[4].name !== '+'" v-model="item.menu5" :placeholder="$t('week.week6') + tableHead[4].name"></el-input>
              <span v-else>{{item.menu5 || '-'}}</span>
            </div>
            <div class="tab">
              <el-input v-if="item.isUpdata && tableHead[5].name !== '+'" v-model="item.menu6" :placeholder="$t('week.week6') + tableHead[5].name"></el-input>
              <span v-else>{{item.menu6 || '-'}}</span>
            </div>
            <div class="tab">
              <el-input v-if="item.isUpdata && tableHead[6].name !== '+'" v-model="item.menu7" :placeholder="$t('week.week6') + tableHead[6].name"></el-input>
              <span v-else>{{item.menu7 || '-'}}</span>
            </div>
            <div class="tab">
              <el-input v-if="item.isUpdata && tableHead[7].name !== '+'" v-model="item.menu8" :placeholder="$t('week.week6') + tableHead[7].name"></el-input>
              <span v-else>{{item.menu8 || '-'}}</span>
            </div>
            <div class="tab" @click="changeTab(item)">{{item.isUpdata ? $t('week.week7') : $t('week.week8')}}</div>
          </div>
        </div>
        <div class="bottomBtn"  v-if="monthList.length > 1">
          <!-- <el-button type="warning" style="margin-right: 5%;" round>编辑</el-button> -->
          <el-button type="success" @click="dialogVisible = true" round>{{$t('week.week9')}}</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="40%"
      custom-class="dialog"
      :before-close="handleClose"
      top="20%"
      center>
      <!-- <span>这是一段信息</span> -->
      <div class="dialogBody">
        <el-upload
          class="upload-demo"
          action="/admin/api/insertall"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-success="saveFile"
          multiple
          :limit="1"
          accept=".xls,.xlsx"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :data="{...selectMonth, status: selectMonthStatus, table: 'weekly'}">
            {{$t('week.week10')}}<el-button size="mini" type="warning">{{$t('week.week11')}}</el-button> *{{$t('week.week12')}}
        </el-upload>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="saveFile" style="margin-right: 5%;" round>保存</el-button>
        <el-button type="success" @click="dialogVisible = false" round>取消</el-button>
      </span> -->
    </el-dialog>
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
          name: '+'
        }, {
          name: '+'
        }, {
          name: '+'
        }, {
          name: '+'
        }, {
          name: '+'
        }, {
          name: '+'
        }, {
          name: '+'
        }, {
          name: '+'
        }, {
          name: this.$t('week.week13')
        }
      ],
      tableData: [
        {}
      ],
      month: '',
      monthList: [],
      dialogVisible: false,
      fileList: [],
      selectMonth: {
        week: '',
        time: ''
      },
      selectMonthStatus: ''
    }
  },
  mounted () {
  },
  methods: {
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
      let obj = this.$qs.stringify({
        date: date
      })
      this.$api.post('/admin/api/weekly', obj).then(res => {
        if (res.data.code === 1) {
          console.warn(res.data)
          let list = res.data.date
          let data = []
          list.forEach(item => {
            data.push({
              ...item,
              isSelect: false,
              status: 0
            })
          })
          data[0].isSelect = true
          this.selectMonth = {
            time: data[0].time,
            week: data[0].lists
          }
          this.selectMonthStatus = 0
          this.weeklySelect({
            time: this.selectMonth.time,
            status: this.selectMonthStatus
          })
          this.monthList = data
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
      item.isSelect = true
      // this.selectMonth = item.time
      this.selectMonth = {
        time: item.time,
        week: item.lists
      }
      this.selectMonthStatus = 0
      this.weeklySelect(item)
    },
    // 选择早中晚宵夜
    statusChange (status, item) {
      item.status = status
      // this.selectMonth = item.time
      this.selectMonth = {
        time: item.time,
        week: item.lists
      }
      this.selectMonthStatus = item.status
      console.warn(this.selectMonth, this.selectMonthStatus)
      this.weeklySelect(item)
    },
    // 加载右边tab
    weeklySelect (item) {
      let obj = this.$qs.stringify({
        time: item.time,
        status: item.status
      })
      this.$api.post('/admin/api/WeeklySelect', obj).then(res => {
        if (res.data.code === 1) {
          console.warn(res.data)
          let list = res.data.lists
          let tdata = []
          let thead = []
          list.forEach((item, i) => {
            if (i === 0) {
              thead = [
                {
                  name: item.menu1 || '+'
                }, {
                  name: item.menu2 || '+'
                }, {
                  name: item.menu3 || '+'
                }, {
                  name: item.menu4 || '+'
                }, {
                  name: item.menu5 || '+'
                }, {
                  name: item.menu6 || '+'
                }, {
                  name: item.menu7 || '+'
                }, {
                  name: item.menu8 || '+'
                }, {
                  name: this.$t('week.week13')
                }
              ]
            } else {
              tdata.push({
                ...item,
                isUpdata: false
              })
            }
          })
          if (list.length === 0) {
            for (let i = 0; i < 8; i++) {
              thead.push({name: '+'})
            }
            thead.push({name: this.$t('week.week13')})
            tdata = [{}]
            this.$message.error(this.$t('week.week14'))
          } else {
            this.$message({
              showClose: true,
              message: this.$t('week.week15'),
              type: 'success'
            })
          }
          this.tableHead = thead
          this.tableData = tdata
          console.warn(this.tableHead)
          // this.monthList = data
        } else {
          console.warn(res.data.msg)
          this.$message.error(res.data.msg)
        }
      })
    },
    // 弹窗
    handleClose (done) {
      this.fileList = []
      done()
    },
    saveFile () {
      this.$message({
        showClose: true,
        message: '上传成功！',
        type: 'success'
      })
      this.fileList = []
      this.dialogVisible = false
      this.weeklySelect({
        time: this.selectMonth.time,
        status: this.selectMonthStatus
      })
    },
    // 文件
    handlePreview (file) {
      console.log('=========')
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handleExceed (files, fileList) {
      this.$message.warning(this.$t('week.week17'))
    },
    beforeRemove (file, fileList) {
      // return this.$confirm(`确定移除 ${ file.name }？`)
      console.log(file, fileList)
    },
    // 编辑
    changeTab (item) {
      item.isUpdata = !item.isUpdata
      if (!item.isUpdata) {
        this.save(item)
      }
    },
    save (item) {
      let obj = this.$qs.stringify({
        id: item.id,
        menu2: item.menu2,
        menu3: item.menu3,
        menu4: item.menu4,
        menu5: item.menu5
      })
      this.$api.post('/admin/api/editWeekly', obj).then(res => {
        if (res.data.code === 1) {
          // this.$router.push({path: '/home'})
          this.$message({
            showClose: true,
            message: this.$t('week.week18'),
            type: 'success'
          })
          this.weeklySelect()
        } else {
          console.warn(res.data.msg)
          this.$message.error(res.data.msg)
        }
      })
    }
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
    padding: .1rem .28rem;
    width: 20%;
  }
  .week .left .el-date-editor.el-input {
    width: 100%;
    margin-bottom: .2rem;
  }
  /* .el-input--prefix .el-input__inner */
  .week .left .el-input--prefix .el-input__inner {
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
  /* .left .smallBtn {
    display: inline-block;
    padding: 1rem 2.86rem;
    flex: 1;
    box-sizing: border-box;
  } */
  .left .btnHover,
  .left .btn:hover {
    background: #fbcd2b;
    color: #333;
    border: 1px solid #fbcd2b;
  }
  .right {
    flex: 1;
    padding: .1rem;
    box-sizing: border-box;
    height: 95%;
  }
  .right .rightTab {
    height: 97%;
    border: 2px solid #aa8629;
    border-radius: .4rem;
    background: #3c2a26;
    box-sizing: border-box;
    padding: .27rem .57rem;
  }
  .tabHeadBox {
    display: flex;
    width: 100%;
  }
  .tabHead {
    width: 11%;
    color: #fff;
    box-sizing: border-box;
    padding: 2% 1%;
    border: 1px solid #4c322b;
    font-size: .1rem;
  }
  /* .tab:last-child,
  .tabHead:last-child{
    width: 7%;
  } */
  .tab:last-child {
    cursor: pointer;
  }
  .tabHead:nth-child(2) {
    flex: 1;
  }
  .tabHead:nth-child(1) {
    color: #e16e11;
    text-align: left;
  }
  .tabBody {
    display: flex;
    width: 100%;
  }
  .tab {
    width: 11%;
    color: #fff;
    box-sizing: border-box;
    padding: 1%;
    border: 1px solid #3c2a26;
    font-size: .09rem;
    background: #4c322b;
  }
  .tab:nth-child(1) {
    color: #e16e11;
    background: none;
    border: 1px solid #4c322b;
    text-align: left;
  }
  .tab:nth-child(2) {
    flex: 1;
  }
  .bottomBtn {
    padding-top: 6%;
  }
  .bottomBtn .el-button {
    padding: .06rem .2rem;
    border-radius: 5rem;
  }
  .bottomBtn .el-button--warning {
    color: #333;
  }
  .dialogBody {
    color: #fff;
  }
</style>
