<template>
  <div class="week">
    <!-- 每周 -->
    <div class="left">
      <div class="block">
        <el-date-picker
          v-model="month"
          type="month"
          placeholder="选择月"
          @change="monthChange">
        </el-date-picker>
      </div>
      <div v-for="(item, i) in monthList" :key="i">
        <div :class="!item.isSelect ? 'btn' : 'btn btnHover'" @click="selectDate(item)">{{item.lists}}</div>
        <div v-if="item.isSelect" style="display: flex;flex-flow: row nowrap;justify-content: space-between;">
            <div @click="statusChange(0, item)" :class="item.status === 0 ? 'btn smallBtn btnHover' : 'btn smallBtn'">早餐</div>
            <div @click="statusChange(1, item)" :class="item.status === 1 ? 'btn smallBtn btnHover' : 'btn smallBtn'">中餐</div>
        </div>
        <div v-if="item.isSelect" style="display: flex;flex-flow: row nowrap;justify-content: space-between;">
            <div @click="statusChange(2, item)" :class="item.status === 2 ? 'btn smallBtn btnHover' : 'btn smallBtn'">晚餐</div>
            <div @click="statusChange(3, item)" :class="item.status === 3 ? 'btn smallBtn btnHover' : 'btn smallBtn'">宵夜</div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="rightTab">
        <div class="tabHeadBox">
          <div class="tabHead" v-for="(item, i) in tableHead" :key="i">{{item.name}}</div>
        </div>
        <div class="tabBodyBox">
          <div class="tabBody" v-for="(item, i) in tableData" :key="i">
            <div class="tab">{{item.menu0 || '-'}}</div>
            <div class="tab">{{item.menu1 || '-'}}</div>
            <div class="tab">{{item.menu2 || '-'}}</div>
            <div class="tab">{{item.menu3 || '-'}}</div>
            <div class="tab">{{item.menu4 || '-'}}</div>
            <div class="tab">{{item.menu5 || '-'}}</div>
            <div class="tab">{{item.menu6 || '-'}}</div>
            <div class="tab">{{item.menu7 || '-'}}</div>
          </div>
        </div>
        <div class="bottomBtn"  v-if="monthList.length > 1">
          <el-button type="warning" style="margin-right: 5%;" round>编辑</el-button>
          <el-button type="success" @click="dialogVisible = true" round>上传</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      title="提示"
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
          action="/admin/admin/api/insertall"
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
            文件：<el-button size="mini" type="warning">点击上传</el-button> *仅限xls与xlsx文件类型上传
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
        }
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
                  name: item.menu0 || '+'
                }, {
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
                }
              ]
            } else {
              tdata.push(item)
            }
          })
          if (list.length === 0) {
            for (let i = 0; i < 8; i++) {
              thead.push({name: '+'})
            }
            tdata = [{}]
            this.$message.error('暂无菜单，请上传菜单或编辑')
          } else {
            this.$message({
              showClose: true,
              message: '查询成功！',
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
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      // return this.$confirm(`确定移除 ${ file.name }？`)
      console.log(file, fileList)
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
    padding: .28rem;
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
    width: 12%;
    color: #fff;
    box-sizing: border-box;
    padding: 2% 1%;
    border: 1px solid #4c322b;
    font-size: .1rem;
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
    width: 12%;
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
