# 网格布局
----
弹性分栏布局


## 基础用法
<div class="dome-alert demo-block">
   <star-grid :data="[1,2,3,4,5,6,7,8,9]"  width="20%"  :body-style="{ padding: '20px'}">
         <template v-slot="item">
            <div>
            <!-- 内容 -->
            </div>
         </template>
       </star-grid>
</div>

::: demo
```html

<div>
   <star-grid :data="[1,2,3,4,5,6,7,8,9]"  width="20%"  :body-style="{ padding: '20px'}">
         <template v-slot="item">
            <div>
            <!-- 内容 -->
            </div>
         </template>
       </star-grid>
</div>
```
:::


## Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
|data      | 显示的数据         | array |	—           |	—       |
|height      |	卡片的高度 |	string(需要加px) |	—           |	自动     |
|width      | 对应卡片的宽度     |	String   |	—           |	25%    |
|minwidth | 对应卡片的最小宽度 |	String |	— |	200px |
|gutter | 卡片间距           |	Number |	— |	8 |
|shadow | 设置阴影显示时机   |	string |	always / hover / never |	hover |
|body-style | 设置 body 的样式 |	object |	— |	{ padding: 0 ,<br />'box-sizing': 'border-box',<br />height:同上} |

