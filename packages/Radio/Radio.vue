<template>
  <div class="star-radio">
    <el-radio-group
      v-model="text"
      @change="handleChange"
    >
      <el-radio
        v-for="item in netDic"
        :label="item.value"
        :key="item.value"
      >
        {{item.label}}
      </el-radio>
    </el-radio-group>
  </div>

</template>

<script>
import create from 'core/create'
import props from 'core/common/props'
import event from 'core/common/event'
export default create({
  name: 'Radio',
  mixins: [props(), event()],
  data () {
    return {
      netDic: []
    }
  },
  watch: {
    dic: {
      handler (val) {
        this.netDic = val
      },
      immediate: true
    }
  },
  props: {
  },
  methods: {

  }
})
</script>
<style lang="less" scoped>
// 解决多选框高度多出5px
.star-radio{
  padding-bottom: 1px;
}
</style>
