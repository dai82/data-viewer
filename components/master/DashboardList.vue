<template>
  <div>
    <!-- 【ダイアログ】csvファイルからの登録 -->
    <register-new-dashboard-dialog
      :open-dialog="registerDialog"
      @close="changeRegisterDialog(false)"
    />
    <custom-button
      title="csvファイルから登録する"
      :props-style="reflectButtonStyle"
      @click="changeRegisterDialog"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import RegisterNewDashboardDialog from './dialog/RegisterNewDashboardDialog.vue'
import CustomButton from '~/components/common/CustomButton.vue'
import Button, { ButtonStyle } from '~/model/style/button'

export default Vue.extend({
  name: 'DashboardList',
  components: {
    RegisterNewDashboardDialog,
    CustomButton
  },
  props: {
  },
  data(): {
    registerDialog: boolean;
    reflectButtonStyle: ButtonStyle;
  } {
    return {
      registerDialog: false,
      reflectButtonStyle: Button.miniButtonStyle()
    }
  },
  methods: {
    changeRegisterDialog(result: boolean = true) {
      this.registerDialog = result
    }
  }
})
</script>