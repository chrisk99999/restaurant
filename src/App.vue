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
.monthlyReport .el-input__inner {
  background: none;
  color: #fff;
  border-radius: 50px;
  border-color: #632f24 !important;
}
</style>
