import {validateNull} from 'utils/validate'
import {DIC_PROPS} from 'global/variable'

// 设置px像素
export const setPx = (val, defVal = '') => {
  if (!val) val = defVal
  val = val + ''
  if (val.indexOf('%') === -1) {
    val = val + 'px'
  }
  return val
}

// 清空值
export const clearVal = (obj, list = []) => {
  if (!obj) return {}
  Object.keys(obj).forEach(ele => {
    if (!list.includes(ele)) {
      if (Array.isArray(obj[ele])) {
        obj[ele] = []
      } else if (obj[ele] !== null && typeof obj[ele] === 'object') {
        obj[ele] = {}
      } else if (['number', 'boolean'].includes(typeof obj[ele]) || undefined === obj[ele]) {
        obj[ele] = undefined
      } else {
        obj[ele] = ''
      }
    }
  })
  return obj
}

export const getObjType = obj => {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[toString.call(obj)]
}

// 对象深拷贝
export const deepClone = data => {
  const type = getObjType(data)
  let obj
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    // 不再具有下一层次
    return data
  }
  if (type === 'array') {
    let i = 0
    const len = data.length
    for (; i < len; i++) {
      data[i] = (() => {
        if (data[i] === 0) {
          return data[i]
        }
        return data[i]
      })()
      if (data[i]) {
        delete data[i].$parent
      }
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for (const key in data) {
      if (data) {
        delete data.$parent
      }
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}

// 验证是否存在true/false
export const checkData = (val, defVal) => {
  if (typeof val === 'boolean') {
    return val
  }
  return !(validateNull(val)) ? val : defVal
}

// 数组的数据类型转化
export const detailDic = (list = [], props = {}) => {
  let valueKey = props.value || DIC_PROPS.value
  let childrenKey = props.children || DIC_PROPS.children
  list.forEach(ele => {
    ele[valueKey] = detailDataType(ele[valueKey])
    if (ele[childrenKey]) detailDic(ele[childrenKey], props)
  })
  return list
}

// 字符串数据类型转化
export const detailDataType = (value, type) => {
  if (type === 'number') {
    return Number(value)
  } else if (type === 'string') {
    return value + ''
  } else {
    return value
  }
}
