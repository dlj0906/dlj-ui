<template>
  <el-input
    v-model="text"
    :type="typeParam"
    :show-password="typeParam === 'password'"
    :clearable="clearable"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
    :prefix-icon="prefixIcon"
    :suffix-icon="suffixIcon"
    @click.native="handleClick"
    :placeholder="placeholder"
  >
    <template
      slot="prepend"
      v-if="prepend"
    >
      <span @click="prependClick()">{{ prepend }}</span>
    </template>
    <template
      slot="append"
      v-if="append"
    >
      <span @click="appendClick()">{{ append }}</span>
    </template>
  </el-input>
</template>

<script>
import create from 'core/create'
import props from 'core/common/props'
import event from 'core/common/event'

export default create({
  name: 'Input',
  mixins: [props(), event()],
  data () {
    return {}
  },
  props: {},
  computed: {
    typeParam () {
      if (this.type === 'textarea') {
        return 'textarea'
      } else if (this.type === 'password') {
        return 'password'
      } else {
        return 'text'
      }
    }
  },
  methods: {}
})
</script>
