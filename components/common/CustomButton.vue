<template>
  <div>
    <v-tooltip :disabled="tooltipMessage.length == 0" bottom>
      <template #activator="{ on }">
        <button
          type="button"
          :style="ctrlStyle"
          :class="getCss()"
          @click.stop="onClickButtonExec()"
          v-on="on"
        >
          <!-- ボタン内テキスト -->
          <span> {{ title }}</span>
        </button>
      </template>
      <span>{{ tooltipMessage }}</span>
    </v-tooltip>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ButtonStyle } from '~/model/style/button'

export default Vue.extend({
    name: 'CustomButton',
    components: {
    },
    props: {
        title: {
            type: String,
            required: true
        },
        tooltipMessage: {
            type: String,
            default: ''
        },
        isError: {
            type: Boolean,
            default: false
        },
        propsStyle: {
            type: Object as PropType<ButtonStyle>,
            default: () => new ButtonStyle()
        }
    },
    computed: {
        ctrlStyle(): Record<string, unknown> {
            const v: Record<string, unknown> = { ...this.propsStyle }
            return v
        }
    },
    methods: {
        getCss(): string {
            return this.isError ? 'disabled-button' : ''
        },
        onClickButtonExec(): void {
            if (this.isError) return
            this.$emit('click')
        }
    }
})
</script>

<style lang="stylus" scoped>
button
  width: 129px
  height: 30px
  color: #fff
  font-size: 14px
  background-color: #0099e5
  border-radius: 4px
  border-style: solid
  transition: 0.3s
  border: 1px solid
  border-width: 1px !important
  box-shadow: 1px 1px 2px 1px #90CAF9 // blue lighten-3

button:hover,
button:focus
  border-color: inherit
  outline: none
  opacity: 0.6

.disabled-button
  background-color: #BDBDBD !important // grey lighten-1
</style>
