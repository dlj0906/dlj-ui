<template>
  <div class="star-switch">
    <el-switch
      v-model="text"
      @change="handleChange"
    >
    </el-switch>
  </div>

</template>

<script>
import create from 'core/create'
import props from 'core/common/props'
import event from 'core/common/event'
export default create({
  name: 'Switch',
  mixins: [props(), event()],
  data () {
    return {
    }
  },
  watch: {
  },
  props: {
  },
  methods: {

  }
})
</script>
<style lang="less" scoped>
// 解决多选框高度多出5px
.star-switch{
  padding-bottom: 1px;
}
</style>
