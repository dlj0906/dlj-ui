<template>
  <div>
    <div
      class="star-grid-box clearfix"
      :style="'margin: 0 -'+gutter+'px;'"
    >
      <template v-if="data.length > 0">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="star-grid-item"
          :style="{ height: height, width: width,padding:`0 ${gutter}px`, 'margin-bottom': `${2*gutter}px`,'min-width': minwidth}"
        >
          <el-card
            :shadow="shadow"
            :body-style="{'box-sizing': 'border-box', padding: 0,height:height,...$attrs['body-style'] }"
            v-bind="$attrs"
          >
            <slot
              :item="item"
            />
          </el-card>
        </div>
      </template>
      <template v-else>
        <div class="empty">
          暂无数据
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StarGrid',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    height: {
      type: String,
      default: '300px'
    },
    width: {
      type: String,
      default: '25%'
    },
    minwidth: {
      type: String,
      default: '200px'
    },
    gutter: {
      type: Number,
      default: 8
    },
    shadow: {
      type: String,
      default: 'hover'
    }

  }
}
</script>

<style lang="less" scoped>
.star-grid-box{
  box-sizing: border-box;
  .star-grid-item{
    box-sizing: border-box;
    float: left;
    min-width: 100px;
  }
}
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: '';
  clear: both;
  height: 0;
}
</style>
