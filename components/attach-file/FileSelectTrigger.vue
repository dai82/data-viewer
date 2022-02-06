<template>
  <div>
    <input
      v-show="false"
      ref="input"
      type="file"
      @change.stop="onFileSelected($event)"
    >
    <div @click="onClickTrigger">
      <custom-button
        title="ファイルを添付する"
        tooltip-message="このボタンをクリックすることで特定のディレクトリ上のファイルを選択できます"
        :props-style="attachFileButton"
        @click="onClickTrigger"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CustomButton from '~/components/common/CustomButton.vue'
import Button, { ButtonStyle } from '~/model/style/button'

export default Vue.extend({
  name: 'FileSelectTrigger',
  components: {
    CustomButton
  },
  data(): {
    attachFileButton: ButtonStyle;
  } {
    return {
      attachFileButton: Button.miniButtonStyle()
    }
  },
  methods: {
    onClickTrigger() {
      const ctrl = this.$refs.input as HTMLElement
      if (ctrl) {
        ctrl.click()
      }
    },
    onFileSelected(evt: Event) {
      const fileAry: File[] = []
      const elem = (evt.target as HTMLInputElement)
      const lst = elem.files
      if (lst) {
        for (let i = 0; i < lst.length; ++i) {
          fileAry.push(lst[i])
        }
      }
      this.$emit('fileSelected', fileAry)
      elem.value = ''
    }
  }
})

</script>
