<template>
  <div class="star-number">
    <el-input-number
      v-model="text"
      :min="min"
      :max="max"
      :step="step"
      :controlsPosition="controlsPosition"
      :placeholder="placeholder"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
      :controls="controls"
    ></el-input-number>
  </div>
</template>

<script>
import create from 'core/create'
import props from 'core/common/props'
import event from 'core/common/event'
export default create({
  name: 'Number',
  mixins: [props(), event()],
  props: {
  },
  data () {
    return {
    }
  },
  watch: {

  },
  methods: {

  }
})
</script>

<style lang="less" scoped>
.star-number {
  /deep/ .el-input-number {
    width: 60%;
  }
}
</style>
