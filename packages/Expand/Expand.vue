<template>
  <div>
    <div
      :style="{
        [direction === 'column' ? 'height' : 'width']: cpSize,
        overflow: 'hidden'
      }"
    >
      <slot></slot>
    </div>
    <div @click="open">
      <slot name="button" :expand="expand">
        {{ expand ? "展开" : "收起" }}
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: "column" // column
    },
    size: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      expand: true
    };
  },
  computed: {
    cpSize() {
      return this.expand ? this.size + "px" : "auto";
    }
  },
  methods: {
    open() {
      this.expand = !this.expand;
    }
  }
};
</script>

<style lang="less" scoped></style>
