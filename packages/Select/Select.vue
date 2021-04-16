<template>
  <el-select
    v-model="text"
    :placeholder="placeholder"
    :clearable="clearable"
    :filterable="remote?true:filterable"
    :remote="remote"
    @change="handleChange"
    @click.native="handleClick"
    :multiple="multiple"
    :collapse-tags="collapseTags"
  >
    <el-option
      v-for="(item,index) in netDic"
      :key="index"
      :label="item[labelKey]"
      :value="item[valueKey]">
      {{item[labelKey]}}
    </el-option>
  </el-select>
</template>

<script>
import create from 'core/create'
import props from 'core/common/props'
import event from 'core/common/event'
export default create({
  name: 'Select',
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
    // 是否多选
    collapseTags: {
      type: Boolean,
      default: true
    },
    filterable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
  },
  methods: {

  }
})
</script>
