<template>
  <div class="star-checkbox">
    <el-checkbox-group
      v-model="text"
      @change="handleChange"
      :min="min"
      :max="max"
    >
      <el-checkbox
        v-for="item in netDic"
        :label="item.value"
        :key="item.value"
      >
        {{item.label}}
      </el-checkbox>
    </el-checkbox-group>
  </div>

</template>

<script>
import create from 'core/create'
import props from 'core/common/props'
import event from 'core/common/event'
export default create({
  name: 'Checkbox',
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

.star-checkbox{
  // 解决多选框高度多出5px
 padding-bottom: 1px;
}
</style>
