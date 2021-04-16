<template>
  <div class="star-date">
    <el-date-picker
      v-model="text"
      :type="type"
      :clearable="clearable"
      :format="format"
      :value-format="valueFormat"
      @change="handleChange"
      :placeholder="placeholder"
      :picker-options="pickerOptions"
      :range-separator="rangeSeparator"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
    >
    </el-date-picker>
  </div>

</template>

<script>
import create from 'core/create'
import props from 'core/common/props'
import event from 'core/common/event'
export default create({
  name: 'Date',
  mixins: [props(), event()],
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return (
            time.getTime() > Date.now() ||
            time.getTime() < new Date('2020-01-01') - 8.64e7
          ) // 如果没有后面的-8.64e7就是不可以选择今天的
        },
        shortcuts: [
          {
            key: 'today',
            text: '今天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime())
              picker.$emit('pick', [start, end])
            }
          },
          {
            key: 'yesterday',
            text: '昨天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24)
              end.setTime(end.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', [start, end])
            }
          },
          {
            key: 'week',
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              end.setTime(end.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', [start, end])
            }
          },
          {
            key: 'month',
            text: '最近一月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  watch: {
  },
  props: {
    type: {
      type: String,
      default: 'date'
    },
    valueFormat: {
      type: String
    },
    format: {
      type: String
    },
    startPlaceholder: {
      type: String,
      default: '开始日期'
    },
    endPlaceholder: {
      type: String,
      default: '结束日期'
    },
    rangeSeparator: {
      type: String,
      default: '至'
    },
    // 默认快捷选项
    datePickerOptions: {
      type: Array,
      default: () => {
        return [
          'today', 'yesterday', 'week', 'month'
        ]
      }
    }
  },
  created () {
    if (this.type === 'daterange' || this.type === 'datetimerange') this.init()
    else this.pickerOptions = {}
  },
  computed: {
  },
  methods: {
    // 初始化
    init () {
      let arr = []
      if (Array.isArray(this.datePickerOptions)) {
        for (let option of this.datePickerOptions) {
          arr.push(this.pickerOptions.shortcuts.find(ele => ele.key === option))
        }
      }
      this.pickerOptions.shortcuts = arr
    }
  }
})
</script>
<style lang="less" scoped>
.star-date{
  // 解决多选框高度多出5px
  padding-bottom: 1px;
}
</style>
