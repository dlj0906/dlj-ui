# 单选框

---

通过鼠标或键盘输入字符

## 基本用法

<div class="dome-alert demo-block">
   <star-input
    v-model="value"
    ></star-input>
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
  <star-input v-model="value"></star-input>
</div>
<script>
  export default {
    data() {
      return {
        value: "",
      };
    },
  };
</script>
```

:::

## Attributes

| 参数        | 说明           | 类型            | 可选值                     | 默认值 |
| ----------- | -------------- | --------------- | -------------------------- | ------ |
| type        | 类型           | String          | text / textarea / password | text   |
| v-model     | 绑定值         | String / Number | —                          | —      |
| placeholder | 输入框占位文本 | String          | —                          | —      |
| clearable   | 是否可清空     | Boolean         | —                          | false  |

### Event

| 事件名称 | 说明                                   | 回调参数 |
| -------- | -------------------------------------- | -------- |
| blur     | 在 Input 失去焦点时触发                | (value)  |
| focus    | 在 Input 获得焦点时触发                | (value)  |
| change   | 仅在输入框失去焦点或用户按下回车时触发 | (value)  |
