<template>
  <div class="view">
    <heads :rightText="typeText" :index="type" @changeHead="changeHead"></heads>
    <div class="box">
      <week v-if="type === '1' || type === 1"></week>
      <nutrition v-else-if="type === '2' || type === 2"></nutrition>
      <monthlyReportView v-else-if="type === '3' || type === 3"></monthlyReportView>
      <boutique v-else-if="type === '4' || type === 4"></boutique>
      <team v-else-if="type === '5' || type === 5"></team>
      <staff v-else-if="type === '6' || type === 6"></staff>
    </div>
  </div>
</template>

<script>
import heads from '@/components/head'
import week from '@/components/action/week'
import nutrition from '@/components/action/nutrition'
import monthlyReportView from '@/components/monthlyReportView'
import boutique from '@/components/action/boutique'
import team from '@/components/action/team'
import staff from '@/components/action/staff'

export default {
  name: 'action',
  components: {
    heads,
    week,
    nutrition,
    monthlyReportView,
    boutique,
    team,
    staff
  },
  data () {
    return {
      type: '',
      typeText: ''
    }
  },
  mounted () {
    this.typeText = this.$route.query.typeText
    this.type = this.$route.query.type
  },
  methods: {
    changeHead (type) {
      this.type = type
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
  overflow: hidden;
}
.box {
  flex: 1;
  background: url(~@/assets/home_01.png) no-repeat top left;
  background-size: 100% 100%;
  text-align: center;
  height: 100%;
  width: 100%;
}
</style>
