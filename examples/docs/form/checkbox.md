# 多选框

---

通过鼠标或键盘输入字符

## 基本用法

<div class="dome-alert demo-block">
   <star-checkbox
    v-model="value"
   :dic="dicData"
    ></star-checkbox>
</div>
<script>
  export default{
    data () {
        return {
          value: '',
          dicData:
           [{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }]
        }
    }
  }
</script>

::: demo

```html
<div>
  <star-checkbox v-model="value"></star-checkbox>
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
