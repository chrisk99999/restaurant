<template>
  <div class="staff">
    <!-- 员工 -->
    <div class="left">
      <div>
        <div class="btn" @click="dialogVisible = true"><img src="@/assets/staff_01.png" alt=""></div>
      </div>
      <div>
        <div class="btn" @click="downFile"><img src="@/assets/staff_02.png" alt=""></div>
      </div>
    </div>
    <div class="right">
      <div class="rightTab">
        <div class="tabHeadBox">
          <div class="tabHead" v-for="(item, i) in tableHead" :key="i">
            {{item.name}}
            <div class="tabSpan">{{item.enName}}</div>
          </div>
        </div>
        <div class="tabBodyBox">
          <div class="tabBody" v-for="(item, i) in tableData" :key="i">
            <div class="tab">{{item.name}}</div>
            <div class="tab">{{item.tel}}</div>
            <div class="tab">{{item.group_name}}</div>
            <div class="tab">{{item.tem}}</div>
            <div class="tab">{{item.status === 1 ? '已激活' : '未激活'}}</div>
            <div class="tab updata">编辑</div>
          </div>
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
          :data="{table: 'staff'}">
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
  name: 'staff',
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
          name: '姓名',
          enName: 'Name'
        }, {
          name: '电话',
          enName: 'Tel'
        }, {
          name: '部门',
          enName: 'Dep'
        }, {
          name: '工号',
          enName: 'Tem'
        }, {
          name: '状态',
          enName: 'Type'
        }, {
          name: '操作',
          enName: 'Action'
        }
      ],
      tableData: [
        {
          name: 'Chris',
          tel: '19811111111',
          dep: '行政部',
          tem: 'No.001',
          type: '已激活'
        }
      ],
      dialogVisible: false,
      fileList: []
    }
  },
  mounted () {
    this.getStaff()
  },
  methods: {
    // 加载右边tab
    getStaff (item) {
      this.$api.post('/api/GetStaff', {}).then(res => {
        if (res.data.code === 1) {
          console.warn(res.data)
          let data = res.data.lists
          let list = []
          data.forEach((item, i) => {
            list.push(item)
          })
          if (data.length === 0) {
            this.$message.error('暂员工信息，请上传员工信息')
          } else {
            this.$message({
              showClose: true,
              message: '查询成功！',
              type: 'success'
            })
          }
          this.tableData = list
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
    },
    saveFile () {
      this.$message({
        showClose: true,
        message: '上传成功！',
        type: 'success'
      })
      this.fileList = []
      this.dialogVisible = false
    },
    downFile () {
      window.location.href = 'http://ep.zerom.cn/api/excel'
    }
  }
}
</script>

<style scoped>
  .staff {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .left {
    padding: .28rem;
    width: 20%;
  }
  .left .btn {
    padding: .1rem .72rem;
    font-size: .15rem;
    color: #fb882b;
    background: #3c2a36;
    border: 1px solid #653428;
    border-radius: 5rem;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: .2rem;
  }
  .left .btn img {
    height: .2rem;
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
    padding: .28rem;
    box-sizing: border-box;
  }
  .rightTab {
    height: 100%;
    border: 2px solid #aa8629;
    border-radius: 20px;
    background: #3c2a26;
    box-sizing: border-box;
    padding: .28rem;
  }
  .tabHeadBox {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .tabHead {
    width: 12%;
    color: #fff;
    box-sizing: border-box;
    padding: 1%;
    border-bottom: 1px solid #808080;
    font-size: .1rem;
  }
  .tabSpan {
    color: #808080;
    font-size: 12px;
  }
  .tabBody {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .tab {
    width: 12%;
    color: #fff;
    box-sizing: border-box;
    padding: 1%;
    border-bottom: 1px solid #808080;
    font-size: .1rem;
  }
  .updata {
    cursor: pointer;
  }
  .updata:hover {
    color: #aaa;
  }
</style>
