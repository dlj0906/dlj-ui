/**
 * @Description: 定义ui组件配置
 * @author LongJiang Dong
 * @date 2021/4/12
*/

// ui组件名称
export const KEY_COMPONENT_NAME = 'Star'

// 日期类型
export const DATE_LIST = [
  'date', // 日期
  'daterange', // 日期区间
  'datetime', // 日期时间
  'datetimerange' // 日期时间区间
]

// 时间类型
export const TIME_LIST = [
  'time',
  'timerange'
]

export const ARRAY_LIST = ['img', 'array', 'url']

// 多选类型
export const MULTIPLE_LIST = ['tree', 'select']

// 选择类型包括下拉框、日期选择、color选择、树形选择
export const SELECT_LIST = DATE_LIST.concat([
  'select',
  'checkbox',
  'radio',
  'cascader',
  'tree',
  'color',
  'icon'
])

export const ARRAY_VALUE_LIST = ARRAY_LIST.concat(['checkbox', 'cascader', 'daterange'])

// 字典全局props定义
export const DIC_PROPS = {
  label: 'label',
  value: 'value',
  children: 'children'
}

// 字典默认请求方式
export const DIC_METHOD = 'post'

// 字典默认分割方式
export const DIC_SPLIT = ','
