<template>
  <div class="input-range">
    <el-input
      :value="minValue"
      @input="onInput($event.replace(/[^\d.]/g, ''), maxValue)"
      @blur="onMinBlur"
    ></el-input>
    <span class="separator">{{ separator }}</span>
    <el-input
      :value="maxValue"
      @input="onInput(minValue, $event.replace(/[^\d.]/g, ''))"
      @blur="onMaxBlur"
    ></el-input>
  </div>
</template>

<script>
import create from 'core/create'
export default create({
  name: 'NumberRange',
  props: {
    // 最大值
    max: {
      type: Number,
      default: Infinity
    },
    // 最小值
    min: {
      type: Number,
      default: -Infinity
    },
    // 输入框分隔符
    separator: {
      type: String,
      default: '-'
    },
    // 输入框默认值
    value: {
      type: Array,
      validator (range) {
        return range.every(v => {
          return !v || !isNaN(v)
        })
      },
      default: () => []
    }
  },
  data () {
    let [minValue, maxValue] = this.value
    return {
      minValue,
      maxValue
    }
  },
  watch: {
    // 同步max,min为传进来的value
    value (data) {
      let [minValue, maxValue] = data
      this.minValue = minValue
      this.maxValue = maxValue
    }
  },
  methods: {
    onInput (min, max) {
      this.$emit('input', [min, max])
    },
    // min框失去焦点时若min>max,将min调小为
    onMinBlur (e) {
      // 输入是字符串
      let value = e.target.value
      let max = this.maxValue ? Number(this.maxValue) : undefined
      // 空字符串
      if (!value) {
        this.emitInputNextTick([undefined, max])
        return
      }
      value = Math.max(Number(value), this.min)
      // undefined 不能比较
      if (max) {
        value = Math.min(value, max)
      }
      this.emitInputNextTick([value, max])
    },
    // max框失去焦点时若max<min, 则将max调大
    onMaxBlur (e) {
      let value = e.target.value
      let min = this.minValue ? Number(this.minValue) : undefined
      // 空字符串
      if (!value) {
        this.emitInputNextTick([min, undefined])
        return
      }
      value = Math.min(Number(value), this.max)
      // undefined 不能比较
      if (min) {
        value = Math.max(value, min)
      }
      this.emitInputNextTick([min, value])
    },
    emitInputNextTick (value = [undefined, undefined]) {
      this.$nextTick(() => {
        this.$emit('input', value)
      })
    }
  }
})
</script>

<style lang="less" scoped>
.input-range {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dcdee0;
  /deep/ .el-input__inner {
    border: none;
  }
  /deep/ input::-webkit-outer-spin-button,
  /deep/ input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  /deep/ input[type="number"] {
    -moz-appearance: textfield;
  }
}
</style>
