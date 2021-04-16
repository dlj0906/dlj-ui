# 表单

---

基于 ElementUi 表单组件进行二次封装，方便前端迅速开发

## Attributes

| 参数   | 说明 | 类型   | 可选值 | 默认值 |
| ------ | ---- | ------ | ------ | ------ |
| option | 配置 | Object | —      | —      |

## Option Attributes

| 参数       | 说明                       | 类型    | 可选值                                                                       | 默认值 |
| ---------- | -------------------------- | ------- | ---------------------------------------------------------------------------- | ------ |
| size       | 表单大小                   | String  | medium / small / mini                                                        | small  |
| menu-show  | 是否显示组件按钮提交和清空 | Boolean | —                                                                            | true   |
| menu-align | 组件按钮对齐方式           | String  | center / left / right                                                        | center |
| span       | 表单栅格                   | Number  | 参考[Element Layout 布局](https://element.eleme.cn/#/zh-CN/component/layout) | 12     |
| columns    | 表单项配置                 | Array   | [表单项配置](http://localhost:8080/#/columns-attributes)                     | —      |

## Columns Attributes

| 参数     | 说明                       | 类型    | 可选值                                                                                                                            | 默认值            |
| -------- | -------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| label    | 标签文本                   | String  | —                                                                                                                                 | —                 |
| type     | 表单项类型                 | String  | input / select / password / radio / checkbox / switch / date / daterange / datetime / datetimerange / time / timerange / textarea | —                 |
| prop     | 表单项 model 字段          | String  | —                                                                                                                                 | —                 |
| span     | 单个表单项栅格             | Number  | 参考[Element Layout 布局](https://element.eleme.cn/#/zh-CN/component/layout)                                                      | Option 栅格默认值 |
| display  | 表单项是否展示             | Boolean | —                                                                                                                                 | true              |
| dic-data | 下拉类型表单项本地数据     | Array   | —                                                                                                                                 | —                 |
| rules    | 表单项校验规则，提交时生效 | Array   | 参考                                                                                                                              | —                 |

## Columns Event

| 事件名称 | 说明                                   | 回调参数        |
| -------- | -------------------------------------- | --------------- |
| change   | 仅在表单项失去焦点或用户按下回车时触发 | (value, column) |
| click    | 在表单项被点击时触发                   | (value, column) |
| focus    | 在表单项获得焦点时触发                 | (value, column) |
| blur     | 在表单项失去焦点时触发                 | (value, column) |

## Event

| 事件名称 | 说明     | 参数           |
| -------- | -------- | -------------- |
| empty    | 清空函数 | (event: Event) |
| submit   | 提交函数 | (event: Event) |
