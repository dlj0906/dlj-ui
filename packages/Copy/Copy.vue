<template>
  <div>
    <span class="clip" ref="clip" v-if="type === 'self'">
      <slot></slot>
    </span>
    <template v-if="type === 'button'">
      <slot></slot>
      <span ref="clip">
        <slot name="button">
          复制
        </slot>
      </span>
    </template>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard'
import create from 'core/create'
export default create({
  name: 'Copy',
  props: {
    type: {
      // 复制类型 self, button
      type: String,
      default: 'self'
    }
  },
  mounted () {
    this.clipboard = new ClipboardJS(this.$refs.clip, {
      target: trigger => {
        return this.type === 'self' ? trigger : trigger.previousElementSibling
      }
    })
    this.clipboard.on('success', e => {
      this.$emit('success', e)
    })

    this.clipboard.on('error', e => {
      this.$message.success('fail', e)
    })
  },
  destroyed () {
    if (this.clipboard) this.clipboard.destroy()
  }
})
</script>

<style lang="less" scoped>
.clip {
  cursor: pointer;
}
</style>
