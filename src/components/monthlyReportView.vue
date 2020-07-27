<template>
  <div class="view">
    <monthlyReport @linkScore="linkScore" v-if="isMonthlyReport"></monthlyReport>
    <score v-if="isScore"></score>
  </div>
</template>

<script>
import monthlyReport from '@/components/action/monthlyReport'
import score from '@/components/action/score'

export default {
  name: 'monthlyReportView',
  components: {
    monthlyReport,
    score
  },
  data () {
    return {
      isMonthlyReport: true,
      isScore: false
    }
  },
  methods: {
    linkScore () {
      this.isScore = true
      this.isMonthlyReport = false
    }
  }
}
</script>

<style>
.view {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
