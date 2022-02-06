<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Privacy Policy
        </v-card-title>
        <v-card-text>
          <attached-file-panel @changed="changedFile"/>
          <!-- 添付ファイルが1つ以上添付されているとき -->
          <v-flex v-if="fileList.length > 0">
            <span>反映ボタンを押してダッシュボードデータを登録してください</span>
            <br />
            <div style="display: inline-block">
              <custom-button
                title="反映"
                :props-style="reflectButtonStyle"
                @click="changeDialog(true)"
              />
            </div>
          </v-flex>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="changeDialog(false)"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AttachedFilePanel from '~/components/attach-file/AttachedFilePanel.vue'
import { AttachedFile } from '~/model/file/AttachedFile'
import CustomButton from '~/components/common/CustomButton.vue'
import Button, { ButtonStyle } from '~/model/style/button'
import CommonRepository from '~/repository/common'
export default Vue.extend({
  name: 'RegisterNewDashboard',
  components: {
    AttachedFilePanel,
    CustomButton
  },
  props: {
    openDialog: { type: Boolean, default: false }
  },
  data(): {
    dialog: boolean;
    reflectButtonStyle: ButtonStyle;
    fileList: AttachedFile[];
  } {
    return {
      dialog: false,
      reflectButtonStyle: Button.miniButtonStyle(),
      fileList: []
    }
  },
  watch: {
    openDialog: {
      handler(val) {
        this.dialog = val
      }
    }
  },
  methods: {
    async changeDialog(result: boolean) {
      if (result) {
        // 反映ボタンからの登録は、Dashboardの登録処理を走らせる
        await CommonRepository.dashboardRegisterbyFile(this.fileList)
      }
      this.$emit('close', result)
    },
    changedFile(fileList: AttachedFile[]) {
      this.fileList = fileList
    }
  }
})
</script>