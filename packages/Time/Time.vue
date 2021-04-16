<template>
  <div class="star-time">
    <el-time-picker
      :isRange="type === 'timerange'"
      v-model="text"
      :clearable="clearable"
      :format="format"
      :value-format="valueFormat"
      :placeholder="placeholder"
      @change="handleChange"
      :picker-options="pickerOptions"
      :range-separator="rangeSeparator"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
    >
    </el-time-picker>
  </div>

</template>

<script>
import create from 'core/create'
import props from 'core/common/props'
import event from 'core/common/event'
export default create({
  name: 'Time',
  mixins: [props(), event()],
  data () {
    return {
    }
  },
  watch: {
  },
  props: {
    valueFormat: {
      type: String
    },
    format: {
      type: String
    },
    startPlaceholder: {
      type: String,
      default: '开始时间'
    },
    endPlaceholder: {
      type: String,
      default: '结束时间'
    },
    rangeSeparator: {
      type: String,
      default: '至'
    }
  },
  methods: {

  }
})
</script>
<style lang="less" scoped>
.star-time{
  // 解决多选框高度多出5px
  padding-bottom: 1px;
}
</style>
