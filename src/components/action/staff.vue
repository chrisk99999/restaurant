<template>
  <div class="staff">
    <!-- 员工 -->
    <div class="left">
      <div>
        <div class="btn"><img src="@/assets/staff_01.png" alt=""></div>
      </div>
      <div>
        <div class="btn"><img src="@/assets/staff_02.png" alt=""></div>
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
            <div class="tab">{{item.dep}}</div>
            <div class="tab">{{item.tem}}</div>
            <div class="tab">{{item.type}}</div>
            <div class="tab updata">编辑</div>
          </div>
        </div>
      </div>
    </div>
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
      ]
    }
  },
  mounted () {},
  methods: {
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
    padding: 1rem 3rem;
    width: 20%;
  }
  .left .btn {
    padding: .5rem 3rem;
    color: #fb882b;
    background: #3c2a36;
    border: 1px solid #653428;
    border-radius: 50px;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: 1rem;
  }
  .left .btn img {
    height: 1.7rem;
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
  .rightTab {
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
    justify-content: center;
  }
  .tabHead {
    width: 12%;
    color: #fff;
    box-sizing: border-box;
    padding: .5rem;
    border-bottom: 1px solid #808080;
    font-size: .4rem;
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
    padding: .5rem;
    border-bottom: 1px solid #808080;
    font-size: .4rem;
  }
  .updata {
    cursor: pointer;
  }
  .updata:hover {
    color: #aaa;
  }
</style>
