# 时间选择器
----
用于选择或输入日期

## 基本用法
<div class="dome-alert demo-block">
   <star-time
    v-model="value"
    ></star-time>
</div>
<script>
  export default{
    data () {
        return {
          value: '',
        }
    }
  }
</script>

::: demo
```html

<div>
  <star-time
      v-model="value"
      ></star-time>
</div>
<script>
  export default{
      data () {
          return {
            value: '',
          }
      }
    }
</script>
```
:::

## 时间范围
<div class="dome-alert demo-block">
   <star-time
    type="timerange"
    v-model="value"
    ></star-time>
</div>
<script>
  export default{
    data () {
        return {
          value: '',
        }
    }
  }
</script>

::: demo
```html

<div>
  <star-time
      v-model="value"
      type="timerange"
      ></star-time>
</div>
<script>
  export default{
      data () {
          return {
            value: '',
          }
      }
    }
</script>
```
:::

## Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
|type      | 类型	         | String |   text / textarea / password           |  text       |
|v-model      | 绑定值		         | String / Number |   —           |  —       |
|placeholder      | 输入框占位文本		         | String |   —           |  —       |
|clearable      | 是否可清空		         | Boolean |   —           |  false       |
|picker-options      |	快捷选项配置项 |	Array   |	 —         |	—       |
|start-placeholder      |	开始提示占位符 |	String   |	—           |	开始时间       |
|end-placeholder      |	结束提示占位符 |	String   |	—           |	结束时间       |
|range-separator      |	选择范围时的分隔符	 |	String   |	—           |	至       |

### Event
| 事件名称      | 说明       | 回调参数   |
|------------- |----------- |---------  |
|change         |仅在输入框失去焦点或用户按下回车时触发| (value)  |
