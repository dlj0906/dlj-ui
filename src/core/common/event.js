/**
 * @Description: 绑定方法
 * @author LongJiang Dong
 * @date 2021/4/13
*/

import {initVal} from 'core/dataFormat'

// 共同方法设置
function bindEvent (safe, name, event) {
  typeof safe[name] === 'function' && safe[name]({ value: safe.value, column: safe.column })
  safe.$emit(name, safe.value, event)
}
export default function () {
  return {
    methods: {
      initVal () {
        this.text = initVal({
          type: this.type,
          value: this.value,
          dataType: this.dataType,
          multiple: this.multiple,
          separator: this.separator,
          callback: (result) => {
            this.isInitVal = result
          }
        })
      },
      // 获得焦点事件
      handleFocus (event) {
        bindEvent(this, 'focus', event)
      },
      // 失去焦点事件
      handleBlur (event) {
        bindEvent(this, 'blur', event)
      },
      // 点击事件
      handleClick (event) {
        bindEvent(this, 'click', event)
      },
      // 切换事件
      handleChange (value) {
        let result = value
        if (this.isString || this.isInitVal) {
          if (Array.isArray(value)) result = value.join(this.separator)
        }
        if (typeof this.change === 'function') {
          this.change({ value: result, column: this.column })
        }
        this.$emit('input', result)
        this.$emit('change', result)
      }
    }
  }
}
