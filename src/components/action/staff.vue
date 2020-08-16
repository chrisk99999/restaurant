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
      <div>
        <div class="btn" @click="isAdd = true"><img src="@/assets/staff_03.png" alt=""></div>
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
            <div class="tab">
              <el-input v-if="item.isUpdata" v-model="item.name" placeholder="请输入内容"></el-input>
              <span v-else>{{item.name}}</span>
            </div>
            <div class="tab">
              <el-input v-if="item.isUpdata" @change="isNumber('updata', 'tel', i)" v-model="item.tel" placeholder="请输入内容"></el-input>
              <span v-else>{{item.tel}}</span>
            </div>
            <div class="tab">
              <!-- {{item.group_name}} -->
              <el-select filterable v-if="item.isUpdata" v-model="item.cate_id" placeholder="请选择">
                <el-option
                  v-for="group in groupList"
                  :key="group.value"
                  :label="group.label"
                  :value="group.value">
                </el-option>
              </el-select>
              <span v-else>{{item.group_name}}</span>
            </div>
            <div class="tab">
              <el-input v-if="item.isUpdata" @change="isNumber('updata', 'tem', i)" v-model="item.tem" placeholder="请输入内容"></el-input>
              <span v-else>{{item.tem}}</span>
            </div>
            <div class="tab">
              <span>{{item.status === 1 ? '已激活' : '未激活'}}</span>
            </div>
            <div class="tab updata" @click="updataTab(item)">{{item.isUpdata ? '保存' : '编辑'}}</div>
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
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="isAdd"
      width="40%"
      custom-class="dialog"
      :before-close="handleClose"
      top="15%"
      center>
      <div slot="title" style="text-align: center;font-size: .15rem;color: #fbcd2b;">请输入新增员工资料</div>
      <!-- <span>这是一段信息</span> -->
      <div class="addDialogBody dialogBody">
        <el-input
          placeholder="请输入姓名"
          v-model="add.name">
          <div slot="prefix" style="padding: .03rem .05rem;font-size: .1rem;color: #fb882b;">姓名：</div>
        </el-input>
        <el-input
          style="margin-top: .1rem;"
          placeholder="请输入工号"
          v-model="add.tem"
          @change="isNumber('add', 'tem')">
          <div slot="prefix" style="padding: .03rem .05rem;font-size: .1rem;color: #fb882b;">工号：</div>
        </el-input>
        <el-input
          style="margin-top: .1rem;"
          placeholder="请输入电话"
          v-model="add.tel"
          @change="isNumber('add', 'tel')">
          <div slot="prefix" style="padding: .03rem .05rem;font-size: .1rem;color: #fb882b;">电话：</div>
        </el-input>
        <el-select filterable v-model="add.cate_id" placeholder="请选择部门" style="margin-top: .1rem;">
          <div slot="prefix" style="padding: .03rem .05rem;font-size: .1rem;color: #fb882b;">部门：</div>
          <el-option
            v-for="group in groupList"
            :key="group.value"
            :label="group.label"
            :value="group.value">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="save(add)" style="margin-right: 10%;" round>保存</el-button>
        <el-button type="success" @click="isAdd = false" round>取消</el-button>
      </span>
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
      isAdd: false,
      fileList: [],
      groupList: [],
      add: {
        name: '',
        tel: '',
        cate_id: '',
        tem: ''
      }
    }
  },
  mounted () {
    this.getStaff()
    this.getGroup()
  },
  methods: {
    // 加载右边tab
    getStaff (item) {
      this.$api.post('/admin/api/GetStaff', {}).then(res => {
        if (res.data.code === 1) {
          console.warn(res.data)
          let data = res.data.lists
          let list = []
          data.forEach((item, i) => {
            list.push({
              ...item,

              isUpdata: false
            })
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
      window.location.href = 'http://ep.zerom.cn/admin/api/excel'
    },
    updataTab (item) {
      item.isUpdata = !item.isUpdata
      if (!item.isUpdata) {
        this.save(item)
      }
    },
    getGroup () {
      this.$api.post('/index/api/getGroup', {}).then(res => {
        if (res.data.code === 1) {
          // console.warn(res.data)
          let list = []
          res.data.lists.forEach(item => {
            list.push({
              ...item,
              value: item.id,
              label: item.group_name
            })
          })
          this.groupList = list
          // this.$router.push({path: '/home'})
        } else {
          console.warn(res.data.msg)
          this.$message.error(res.data.msg)
        }
      })
    },
    changeGroup (item) {
      console.log(item)
    },
    save (item, type) {
      let saveObj = {
        name: item.name,
        tel: item.tel,
        cate_id: item.cate_id,
        tem: item.tem
      }
      if (item.id) {
        saveObj.id = item.id
      }
      if (saveObj.name === '') {
        this.$message.error('姓名')
        return
      } else if (saveObj.tel === '' && saveObj.tel.length === 11) {
        this.$message.error('电话')
        return
      } else if (saveObj.cate_id === '') {
        this.$message.error('请选择部门')
        return
      } else if (saveObj.tem === '') {
        this.$message.error('请输入工号')
        return
      }
      let obj = this.$qs.stringify(saveObj)
      this.$api.post('/admin/api/InsertStaff', obj).then(res => {
        if (res.data.code === 1) {
          // this.$router.push({path: '/home'})
          this.$message({
            showClose: true,
            message: '保存成功',
            type: 'success'
          })
          this.isAdd = false
          this.getStaff()
        } else {
          console.warn(res.data.msg)
          this.$message.error(res.data.msg)
        }
      })
    },
    // 正则
    isNumber (type, key, index) {
      if (type === 'add') {
        console.log(/^[0-9]*$/.test(this.add[key]))
        if (!(/^[0-9]*$/.test(Number(this.add[key])))) {
          this.add[key] = this.add[key].replace(/[^1-9]/g, '') || 0
        }
      } else {
        if (!(/^[0-9]*$/.test(Number(this.tableData[index][key])))) {
          this.tableData[index][key] = this.tableData[index][key].replace(/[^1-9]/g, '') || 0
        }
      }
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
    height: 90%;
    border: 2px solid #aa8629;
    border-radius: 20px;
    background: #3c2a26;
    box-sizing: border-box;
    padding: .28rem;
    overflow: auto;
  }
  .tabHeadBox {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .tabHead {
    width: 15%;
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
    width: 15%;
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
  .dialog-footer .el-button--warning {
    color: #333;
  }
  .dialog-footer .el-button.is-round {
    padding: 0.06rem 0.15rem;
  }
  .addDialogBody {
    width: 1.5rem;
    margin: 0 auto;
  }
</style>
