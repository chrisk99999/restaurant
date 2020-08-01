<template>
  <div class="view">
    <heads @changeHead="linkAction"></heads>
    <div class="box">
      <div class="rowBox">
        <img src="@/assets/home_02.png" @click="linkAction(1, '每周菜谱')">
        <img src="@/assets/home_03.png" @click="linkAction(2, '营养加餐')">
        <img src="@/assets/home_04.png" @click="linkAction(3, '餐厅月报')">
      </div>
      <div class="rowBox">
        <img src="@/assets/home_05.png" @click="linkAction(4, '精品菜品')">
        <img src="@/assets/home_06.png" @click="linkAction(5, '餐厅团队')">
        <img src="@/assets/home_07.png" @click="linkAction(6, '员工介绍')">
      </div>
    </div>
  </div>
</template>

<script>
import heads from '@/components/head'

export default {
  name: 'home',
  components: {
    heads
  },
  methods: {
    linkAction (type, typeText) {
      this.$router.push({path: '/action', query: {type: type}})
    }
  }
}
</script>

<style scoped>
.view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
}
.box {
  flex: 1;
  background: url(~@/assets/home_01.png) no-repeat top left;
  background-size: 100% 100%;
  text-align: center;
  padding-top: 8%;
}
.box img {
  width: 1.1rem;
  margin-right: .86rem;
  cursor: pointer;
}
.box .rowBox {
  margin-bottom: .65rem;
}
</style>
