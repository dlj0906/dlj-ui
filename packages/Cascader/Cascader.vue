<template>
  <el-cascader
    v-model="text"
    :clearable="clearable"
    :filterable="filterable"
    :options="dic"
    :placeholder="placeholder"
    :props="allProps"
    :show-all-levels="showAllLevels"
    @blur="handleBlur"
    @change="handleChange"
    @focus="handleFocus"
    @click.native="handleClick"
  ></el-cascader>
</template>

<script>
import create from 'core/create'
import props from 'core/common/props'
import event from 'core/common/event'

export default create({
  name: 'Cascader',
  mixins: [props(), event()],
  data () {
    return {
    }
  },
  props: {
    // 是否严格的遵守父子节点不互相关联
    checkStrictly: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    showAllLevels: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    allProps () {
      return {
        label: this.labelKey,
        value: this.valueKey,
        children: this.childrenKey,
        checkStrictly: this.checkStrictly,
        multiple: this.multiple
      }
    }
  },
  methods: {

  }
})
</script>
