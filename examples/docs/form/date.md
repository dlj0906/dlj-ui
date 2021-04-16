# 日选择器
----
通过鼠标或键盘输入字符

## 基本用法
<div class="dome-alert demo-block">
   <star-date
    v-model="value"
    ></star-date>
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
  <star-date
      v-model="value"
      ></star-date>
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

## 时间区间
<div class="dome-alert demo-block">
   <star-date
    v-model="value"
    type="daterange"
    ></star-date>
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
  <star-date
      v-model="value"
      type="daterange"
      ></star-date>
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
|date-pickerOptions      |	快捷选项配置项 |	Array   |	today / yesterday / week / month           |	all       |
|start-placeholder      |	开始提示占位符 |	String   |	—           |	开始日期       |
|end-placeholder      |	结束提示占位符 |	String   |	—           |	结束日期       |
|range-separator      |	选择范围时的分隔符	 |	String   |	—           |	至       |

### Event
| 事件名称      | 说明       | 回调参数   |
|------------- |----------- |---------  |
|change         |仅在输入框失去焦点或用户按下回车时触发| (value)  |
