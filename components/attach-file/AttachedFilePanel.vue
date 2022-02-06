<template>
  <v-card flat>
    <div
      id="drop-area"
      :class="dropActive ? 'attached-card drop-active' : 'attached-card'"
      @dragenter="onDragEnter($event)"
      @dragover="onDragOver($event)"
      @dragleave="onDragLeave($event)"
      @drop="onDrop($event)"
    >
      <!-- 登録ファイル確認エリア -->
      <v-layout justify-start wrap>
        <template v-for="(item, idx) in fileList">
          <v-flex :key="idx" class="file-element-root">
            <div class="file-name">
              <h4>
                <a @click="onDownload(item)">{{ formatString(item.fileName) }}</a>
              </h4>
            </div>
            <div style="display: inline-block">
              <custom-button
                title="削除"
                :props-style="deleteButtonStyle"
                @click="onDelete(item)"
              />
            </div>
          </v-flex>
        </template>
      </v-layout>
      <!-- ファイル添付エリア -->
      <v-layout column justify-start wrap>
        <!-- 添付ファイルが最大数に到達していないとき -->
        <v-flex v-if="!fileIsMax">
          <span>ダッシュボードに登録する元データをドラッグアンドドロップで登録してください</span>
          <br />
          <div style="display: inline-block">
            <file-select-trigger
              @fileSelected="onFileSelected"
            />
          </div>
        </v-flex>
      </v-layout>
      <!-- エラーメッセージ出現エリア -->
      <v-layout
        v-if="alertMsg.length > 0"
        column
        justify-start
        wrap
      >
        <v-flex>
          <v-badge color="#c0c0c0" class="offset-badges">
            <template #badge>
              <v-icon color="white" @click="alertMsg = []">mdi-close</v-icon>
            </template>
            <div v-for="err in alertMsg" :key="err">
              <span class="err-msg"> ■ {{ err }} </span>
            </div>
          </v-badge>
        </v-flex>
      </v-layout>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { browser } from '~/helpers/utils/BrowserUtil'
import StringUtil from '~/helpers/utils/StringUtil'
import { AttachedFile } from '~/model/file/AttachedFile'
import FileSelectTrigger from '~/components/attach-file/FileSelectTrigger.vue'
import CustomButton from '~/components/common/CustomButton.vue'
import Button, { ButtonStyle } from '~/model/style/button'

export default Vue.extend({
  name: 'AttachedFilePanel',
  components: {
    FileSelectTrigger,
    CustomButton
  },
  data(): {
    dropActive: boolean;
    fileMaxCount: number;
    deleteButtonStyle: ButtonStyle;
    fileList: AttachedFile[];
    // error alert
    alertMsg: string[];
  } {
    return {
      dropActive: false,
      fileMaxCount: 1,
      deleteButtonStyle: Button.miniButtonStyle(),
      fileList: [],
      alertMsg: []
    }
  },
  computed: {
    fileIsMax(): boolean {
        return this.fileMaxCount <= this.fileList.length
    }
  },
  methods: {
    onDelete(item: AttachedFile) {
      this.fileList = this.fileList.filter((f: AttachedFile) => {
        return item !== f
      })
      this.$emit('changed', this.fileList)
    },
    onDragEnter(e: DragEvent) {
      e.stopPropagation()
      e.preventDefault()
      this.dropActive = true
    },
    onDragOver(e: DragEvent) {
      e.stopPropagation()
      e.preventDefault()
      this.dropActive = true
      e.returnValue = false
    },
    onDragLeave(e: DragEvent) {
      e.stopPropagation()
      e.preventDefault()
      this.dropActive = false
    },
    onDrop(e: DragEvent) {
      this.dropActive = false
      e.stopPropagation()
      e.preventDefault()
      const fileAry: File[] = []
      if (browser.ie) {
        const datas = e.dataTransfer ? e.dataTransfer.files : null
        if (datas && datas.length > 0) {
          for (let i = 0; i < datas.length; ++i) {
            fileAry.push(datas[i] as File)
          }
        }
      } else if (e.dataTransfer && e.dataTransfer.items) {
        const datas = e.dataTransfer.items as DataTransferItemList
        for (let i = 0; i < datas.length; ++i) {
          fileAry.push(datas[i].getAsFile() as File)
        }
      }
      this.onFileSelected(fileAry)
    },
    onDownload(item: AttachedFile) {
      if (item.db && item.hash) {
        this.$emit('file-download', item)
      } else {
        const objectUrl = URL.createObjectURL(item.file)
        const link = document.createElement('a')
        link.href = objectUrl
        link.setAttribute('download', item.fileName)
        document.body.appendChild(link)
        link.click()
        window.URL.revokeObjectURL(link.href)
      }
    },
    onFileSelected(fa: File[]) {
      if (fa.length === 0) {
        return
      }
      this.alertMsg = []
      // 無駄な長時間処理を避けるため、処理前に、ファイルサイズをチェックすべきです。
      const fileAry: AttachedFile[] = []
      fa.forEach((fi: File): void => {
        const _file = new AttachedFile(fi)
        if (this.checkFile(_file)) {
          fileAry.push(_file)
        }
      })
      setTimeout(() => {
        this.attachFiles(fileAry)
      }, 100)
    },
    checkFile(f: AttachedFile): boolean {
      let isValid = true
      if (f.size === 0) {
        this.alertFileCheck(f.fileName + 'は空のファイルです')
        isValid = false
      }
      if (f.size > 2048 * 1024) {
        this.alertFileCheck('ファイルサイズが2Mを超えています')
        isValid = false
      }
      const fileDupl = this.fileList.find((fi: AttachedFile): boolean => {
        return f.fileName === fi.fileName
      })
      if (fileDupl) {
        this.alertFileCheck('同一名称のファイルが存在します')
        isValid = false
      }
      return isValid
    },
    attachFiles(fileAry: AttachedFile[]) {
      let cntFile = 0
      for (let i = 0; i < fileAry.length; ++i) {
        if (this.fileList.length >= this.fileMaxCount) {
          this.alertFileCheck('ファイルの最大添付数を超えています。')
          break
        }
        const f = fileAry[i] as AttachedFile
        if (this.checkFile(f)) {
          this.fileList.push(f)
          cntFile++
        }
      }
      if (cntFile > 0) {
        this.$emit('changed', this.fileList)
      }
    },
    alertFileCheck(msg: string): void {
      if (!this.alertMsg.includes(msg)) {
        this.alertMsg.push(msg)
      }
    },
    formatString(fileName: string): string {
      return StringUtil.omitString(fileName, 10)
    },
  },
})
</script>

<style lang="stylus" scoped>
button
  width: 50px
  height: 25px
  margin-top: 3px
  margin-left: 10px
  color: #fff
  font-size: 12px
  background-color: #0099e5
  transition: 0.3s

button:hover,
button:focus
  border-color: inherit
  outline: none
  opacity: 0.6

.attash-icon
  font-size: 80px
  color: #959595 !important
  transform: rotate(0.25turn)

.attash-icon:hover
  color: #0099e5 !important
  cursor: pointer

.attached-card
  background-color: #fafbfc
  padding: 16px
  border: 1px dashed #999

.select-file-btn
  width: auto

.checkbox
  margin-top: 8px
  margin-left: 16px
  color: #323232
  font-size: 12px

// 元々のチェックボックス（非表示）
.checkbox input[type='checkbox']
  display: none

// チェックボックスの代わりを成すラベル
.checkbox input[type='checkbox'] + label
  cursor: pointer
  display: inline-block
  position: relative
  padding-left: 25px
  padding-right: 10px

// ラベルの左に表示させる正方形のボックス□
.checkbox input[type='checkbox'] + label::before
  content: ''
  position: absolute
  display: block
  box-sizing: border-box
  width: 16px
  height: 16px
  margin-top: -8px
  left: 0
  top: 50%
  border: 1px solid
  border-color: #d3d3d3
  border-radius: 2px
  border-width: 2px

// チェックが入った時のレ点
.checkbox input[type='checkbox']:checked + label::after
  content: ''
  position: absolute
  display: block
  box-sizing: border-box
  width: 11px
  height: 6px
  margin-top: -5px
  top: 50%
  left: 3px
  transform: rotate(-45deg)
  border-bottom: 2px solid
  border-left: 2px solid
  border-color: #eaeaea

// チェックが入った時のレ点
.checkbox input[type='checkbox']:checked + label::before
  content: ''
  position: absolute
  display: block
  box-sizing: border-box
  width: 16px
  height: 16px
  margin-top: -8px
  left: 0
  top: 50%
  border: 1px solid
  border-color: #0099e5
  background-color: #0099e5
  border-radius: 2px
  border-width: 2px

.file-element-root
  display: flex
  align-items: center

.file-element
  float: left

.file-name
  display: inline-block
  margin-left: 10px
  margin-right: 10px
  min-width: 180px

.drop-active
  background-color: rgba(231,234,246,0.8)
  border: 2px dashed red

.err-msg
  color: #e64545
  margin-left: 0px
</style>
