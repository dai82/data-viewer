<template>
  <dashboard-list />
</template>

<script lang="ts">
import Vue from 'vue'

import DashboardList from '~/components/master/DashboardList.vue'

export default Vue.extend({
  components: {
    DashboardList
  }
})
</script>