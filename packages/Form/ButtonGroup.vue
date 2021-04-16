<template>
  <el-col
    v-if="checkData(formSafe.option.menuBtn,true)"
    :class="className"
    :span="menuSpan"
  >
    <el-form-item
      label-width="0"
    >
      <el-button
        type="primary"
        @click="formSafe.submit"
        :size="formSafe.controlSize"
        v-if="checkData(formSafe.option.submitBtn, true)"
        :icon="formSafe.option.submitIcon || 'el-icon-check'"
        :loading="formSafe.show"
      >
        提交
      </el-button>
      <el-button
        @click="formSafe.resetForm"
        :size="formSafe.controlSize"
        v-if="checkData(formSafe.option.emptyBtn, true)"
        :icon="formSafe.option.emptyIcon || 'el-icon-delete'"
      >
        清空
      </el-button>
      <slot
        name="menuForm"
        :size="formSafe.controlSize"
      ></slot>
    </el-form-item>
  </el-col>
</template>

<script>
import create from 'core/create'

export default create({
  name: 'ButtonGroup',
  inject: ['formSafe'],
  computed: {
    className () {
      return `star-form_menu_${this.formSafe.option.menuAlign || 'center'}`
    },
    // 获取menu所占宽度
    menuSpan () {
      return this.formSafe.option.menuSpan || 24
    }
  }
})
</script>

<style scoped>

</style>
