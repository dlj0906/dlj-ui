/**
 * @Description: 设置共同props
 * @author LongJiang Dong
 * @date 2021/4/13
*/

import {DIC_PROPS, DIC_SPLIT} from 'global/variable'

export default function () {
  return {
    data () {
      return {
        text: undefined, // 绑定字段
        isInitVal: false, // 是否需要初始化值
        propsDefault: DIC_PROPS // 默认props定义
      }
    },
    props: {
      value: {},
      column: {},
      // 是否多选
      multiple: {
        type: Boolean,
        default: false
      },
      // 数据分隔
      separator: {
        type: String,
        default: DIC_SPLIT
      },
      // 未输入提示语
      placeholder: {
        type: String,
        default: ''
      },
      // 类型
      type: {
        type: String,
        default: ''
      },
      // 下拉数据
      dic: {
        type: Array,
        default: () => {
          return []
        }
      },
      // 设置
      props: {
        type: Object,
        default: () => {
          return {}
        }
      },
      // 是否显示清除按钮
      clearable: {
        type: Boolean,
        default: false
      },
      // 开启远程搜索
      remote: {
        type: Boolean,
        default: false
      },
      // 失去焦点方法
      blur: Function,
      // 获取焦点方法
      focus: Function,
      // 内容改变方法
      change: Function,
      // 点击方法
      click: Function,
      // 控制方法
      control: Function,
      // 组件头部ICON
      prefixIcon: {
        type: String
      },
      // 组件尾部ICON
      suffixIcon: {
        type: String
      },
      // 输入框前置点击
      prependClick: {
        type: Function,
        default: () => { }
      },
      // 输入框前置内容
      prepend: {
        type: String
      },
      // 输入框后置点击
      appendClick: {
        type: Function,
        default: () => { }
      },
      // 输入框后置内容
      append: {
        type: String
      },
      // 控制按钮位置
      controlsPosition: {
        type: String,
        default: 'right'
      },
      // 是否显示控制按钮
      controls: {
        type: Boolean,
        default: true
      },
      // 步长
      step: {
        type: Number,
        default: 1
      },
      // 最小值
      min: {
        type: Number,
        default: -Infinity
      },
      // 最大值
      max: {
        type: Number,
        default: Infinity
      },
      // 返回数据类型
      dataType: {
        type: String
      }
    },
    watch: {
      value: {
        handler () {
          this.initVal()
        }
      }
    },
    created () {
      this.initVal()
    },
    computed: {
      // 数组
      isArray () {
        return this.dataType === 'array'
      },
      // 字符串
      isString () {
        return this.dataType === 'string'
      },
      // 数字
      isNumber () {
        return this.dataType === 'number'
      },
      // 查询默认键的字段名称
      valueKey () {
        return this.props.value || this.propsDefault.value
      },
      // 查询默认值的字段名称
      labelKey () {
        return this.props.label || this.propsDefault.label
      },
      // 查询默认值的字段名称
      childrenKey () {
        return this.props.children || this.propsDefault.children
      }
    }
  }
}
