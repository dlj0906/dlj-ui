
import {
  DATE_LIST,
  TIME_LIST,
  KEY_COMPONENT_NAME,
  SELECT_LIST,
  ARRAY_VALUE_LIST,
  MULTIPLE_LIST,
  ARRAY_LIST
} from 'global/variable'
import { validateNull } from 'utils/validate'
import {detailDataType} from 'utils/util'

// 获取组件类型
export const getComponent = (type) => {
  let result = type || 'input'
  if (['password', 'textarea', 'search'].includes(type)) {
    result = 'input'
  } else if (DATE_LIST.includes(type)) {
    result = 'date'
  } else if (TIME_LIST.includes(type)) {
    result = 'time'
  }
  return KEY_COMPONENT_NAME + '-' + result
}

// 获取提示信息
export const getPlaceholder = function (column) {
  const placeholder = column.placeholder
  const label = column.label
  if (!placeholder) {
    if (SELECT_LIST.includes(column.type) || TIME_LIST.includes(column.type)) {
      return `请选择${label}`
    } else {
      return `请输入${label}`
    }
  }
  return placeholder
}

// 表格初始化值
export const formInitVal = (list = []) => {
  let formData = {}
  list.forEach(ele => {
    if (
      ARRAY_VALUE_LIST.includes(ele.type) ||
      (MULTIPLE_LIST.includes(ele.type) && ele.multiple) ||
      ele.dataType === 'array'
    ) {
      formData[ele.prop] = []
    } else if (['number'].includes(ele.type) || ele.dataType === 'number') {
      formData[ele.prop] = undefined
    } else {
      formData[ele.prop] = ''
    }
    // 表单默认值设置
    if (!validateNull(ele.value)) {
      formData[ele.prop] = ele.value
    }
  })
  return {
    ...formData
  }
}

// 初始化数据格式
export const initVal = ({type, value, dataType, multiple, separator, callback}) => {
  let data = value
  let flag = true
  if (
    ARRAY_VALUE_LIST.includes(type) ||
    (MULTIPLE_LIST.includes(type) && multiple)
  ) {
    if (!Array.isArray(data)) {
      // 非数组形式
      if (validateNull(data)) {
        data = []
      } else {
        data = (data + '').split(separator) || []
        callback && callback(flag)
      }
    } else {
      // 数组形式
      flag = false
      callback && callback(flag)
    }
    // 数据转化
    data.forEach((ele, index) => {
      data[index] = detailDataType(ele, dataType)
    })
    if (ARRAY_LIST.includes(type) && validateNull(data)) data = ['']
  }
  return data
}
