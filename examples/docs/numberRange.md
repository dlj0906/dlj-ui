# 数字输入区间

---

用于选择日期区间，带快捷选项。

## 基本用法

<div class="dome-alert demo-block">
  <StarNumberRange v-model="value" style="width: 250px"></StarNumberRange>
</div>

::: demo

```html
<div>
  <start-number-range v-model="value"></start-number-range>
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

| 参数      | 说明         | 类型   | 可选值 | 默认值 |
| --------- | ------------ | ------ | ------ | ------ |
| max       | 最大值       | Number | —      | —      |
| min       | 最小值       | Number | —      | -      |
| separator | 输入框分隔符 | String | —      | -      |

### Event

| 事件名称 | 说明             | 回调参数 |
| -------- | ---------------- | -------- |
| close    | 关闭时触发的事件 | —        |
