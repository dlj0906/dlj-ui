<template>
  <div>
    <slot></slot>
    <slot :name="field" v-for="field in nodes.slice(0, defLimit)"></slot>
    <el-popover
      popper-class="cus-action-popper"
      v-if="sum > defLimit"
      placement="bottom"
      trigger="hover"
    >
      <slot :name="field" v-for="field in nodes.slice(defLimit)"></slot>
      <template slot="reference">
        <span class="more">
          <i class="el-icon-more"></i>
        </span>
      </template>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'BtAction',
  // 限制显示几个按钮
  props: {
    limit: {
      type: Number,
      default: 3
    },
    // 配置的操作字段
    groupFields: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 当前用户授权字段 this.$route.meta.nodes 中
    allowFields: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    defLength() {
      return (this.$slots.default && this.$slots.default.length) || 0;
    },
    defLimit() {
      return this.limit - this.defLength;
    },
    // 根据权限过滤出应显示按钮
    nodes() {
      return [
        ...new Set(
          this.allowFields.filter(value => this.groupFields.includes(value))
        )
      ];
    },
    // 数量
    sum() {
      return this.defLength + this.nodes.length;
    }
  }
};
</script>
<style lang="less">
// poper样式
.cus-action-popper {
  padding: 10px;
  min-width: auto;
  width: auto;
  /deep/.el-button {
    display: block;
    margin-left: 0;
  }
}
</style>
<style lang="less" scoped>
.more {
  display: inline-block;
  margin-left: 6px;
  transform: rotate(-90deg);
}
</style>
