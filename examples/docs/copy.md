# 复制
----
快捷复制粘贴功能

## 基本用法
<div class="dome-alert demo-block">
   <star-copy @success="success" @fail="fail">
       <span><div>点我复制</div></span>
   </star-copy>
</div>
<script>
  export default{
    methods: {
      success(e) {
        this.$message.success(e.action + e.text);
      },
      fail(e) {
        this.$message.success(e.action + e.trigger);
      }
    }
  }
</script>

::: demo
```html

<div>
  <star-copy @success="success" @fail="fail">
     <span><div>点我复制</div></span>
 </star-copy>
</div>
<script>
  export default{
    methods: {
      success(e) {
        this.$message.success(e.action + e.text);
      },
      fail(e) {
        this.$message.success(e.action + e.trigger);
      }
    }
  }
</script>
```
:::

### Event
| 事件名称      | 说明       | 参数   |
|------------- |----------- |---------  |
|success         |成功函数| (event: Event)  |
|fail         |失败函数| (event: Event)  |
