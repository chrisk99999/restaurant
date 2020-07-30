<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
}
#app {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.el-input__inner {
  background: none;
  color: #fff;
  border-radius: 50px;
  border-color: #000;
  font-size: .15rem !important;
}
.nutrition .el-input__inner,
.week .el-input__inner {
  height: .35rem;
  padding-left: .5rem;
  background: #3c2a36;
}
.nutrition .el-input__prefix,
.week .el-input__prefix {
  font-size: .15rem;
  top: 20%;
  left: 8%;
}
.nutrition .el-input__suffix,
.week .el-input__suffix {
  right: 5%;
  transition: all .3s;
  font-size: .15rem;
  top: 22%;
}
.nutrition .updataPhone .el-input__inner,
.nutrition .updataPhone .el-input__inner {
  border-radius: 0;
  padding-left: .1rem;
  color: #fb882b;
  border-color: #663024;
  background-color: #3c2a26;
}
.nutrition .updataPhone .el-textarea__inner  {
  border-color: #663024;
  background-color: #3c2a26;
  color: #fff;
}
.nutrition .updataPhone .num .el-input__inner,
.nutrition .updataPhone .num .el-input__inner {
  font-size: .05rem !important;
  color: #fff;
  height: .3rem;
}
.nutrition .updataPhone .el-input-group__append,
.nutrition .updataPhone .el-input-group__prepend {
  background-color: #3c2a26;
  border-color: #663024;
}
.monthlyReport .el-select:hover .el-input__inner {
  background: none !important;
}
div::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  }
div::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background:#535353;
}
div::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
.dialog {
  border: 2px solid #aa8629;
  border-radius: .1rem;
  background: #3c2a26;
}
</style>
