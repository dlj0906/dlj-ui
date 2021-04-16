<template>
  <div>
    <el-form
      ref="form"
      :label-width="setPx(option.labelWidth,labelWidthDefault)"
      :model="form"
      :size="controlSize"
      @submit.native.prevent
    >
      <el-row :span="24">
        <template
          v-for="(column,index) in option.columns"
        >
          <el-col
            v-if="getDisplay(column)"
            :key="index"
            :span="getSpan(column)"
          >
            <el-form-item
              :label="column.label"
              :prop="column.prop"
              :rules="column.rules"
            >
              <template
                slot="label"
                v-if="column.labelTip"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  :placement="column.labelTipPlacement || 'top-start'"
                >
                  <div
                    slot="content"
                    v-html="column.labelTip"
                  ></div>
                  <i class="el-icon-info"></i>
                </el-tooltip>
                <span> {{ column.label }}</span>
              </template>
              <component
                :is="getComponent(column.type)"
                v-model="form[column.prop]"
                :ref="column.prop"
                :append="column.append"
                :appendClick="column.appendClick"
                :blur="column.blur"
                :change="column.change"
                :checkStrictly="column.checkStrictly"
                :clearable="column.clearable"
                :click="column.click"
                :collapseTags="column.collapseTags"
                :column="column"
                :controls="column.controls"
                :dataType="column.dataType"
                :dic="dicObj[column.prop]"
                :dicUrl="column.dicUrl"
                :datePickerOptions="column.datePickerOptions"
                :endPlaceholder="column.endPlaceholder"
                :filterable="column.filterable"
                :focus="column.focus"
                :format="column.format"
                :input="column.input"
                :max="column.max"
                :min="column.min"
                :multiple="column.multiple"
                :placeholder="getPlaceholder(column)"
                :prefixIcon="column.prefixIcon"
                :prepend="column.prepend"
                :prependClick="column.prependClick"
                :props="column.props"
                :remote="column.remote"
                :rangeSeparator="column.rangeSeparator"
                :separator="column.separator"
                :showAllLevels="column.showAllLevels"
                :suffixIcon="column.suffixIcon"
                :startPlaceholder="column.startPlaceholder"
                :type="column.type"
                :valueFormat="column.valueFormat"
              >
              </component>
            </el-form-item>
          </el-col>
        </template>
        <StarButtonGroup>
          <template
            slot="menuForm"
            slot-scope="scope"
          >
            <slot
              v-bind="scope"
              name="menuForm"
            ></slot>
          </template>
        </StarButtonGroup>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import StarButtonGroup from './ButtonGroup'
import init from 'core/common/init'
import {formInitVal, getComponent, getPlaceholder} from 'core/dataFormat'
import {clearVal} from 'utils/util'
import create from 'core/create'

export default create({
  name: 'Form',
  mixins: [init()],
  components: {
    StarButtonGroup
  },
  data () {
    return {
      labelWidthDefault: 90, // 表单label默认宽度
      formCreate: false,
      itemSpanDefault: 12, // 表单项默认栅格大小
      sizeDefault: 'small', // 表单默认大小
      formVal: {},
      show: false
    }
  },
  provide () {
    return {
      formSafe: this
    }
  },
  created () {
    this.initForm()
  },
  watch: {
    form: {
      handler () {
        if (!this.formCreate) {
          this.setVal()
        } else {
          this.formCreate = false
        }
      },
      deep: true
    }
  },
  props: {
    option: {
      type: Object,
      default: () => {
      }
    }
  },
  computed: {
    // 设置表单大小
    controlSize () {
      return this.option.size || this.sizeDefault
    },
    // 初始化control操作
    initControlOption () {
      let list = []
      this.option.columns.forEach(ele => {
        if (ele.control) list.push(ele)
      })
      return list
    },
    // 对象类型配置列
    objectOption () {
      let obj = {}
      this.option.columns.forEach((ele) => {
        obj[ele.prop] = ele
      })
      return obj
    }
  },
  methods: {
    getComponent,
    getPlaceholder,
    // 获取ref
    getPropRef (prop) {
      return this.$refs[prop][0]
    },
    // 塞入数据
    setVal () {
      this.setControl()
      this.$emit('input', this.form)
      this.$emit('change', this.form)
    },
    // 获取栅格宽度
    getSpan (column) {
      return column.span || this.option.span || this.itemSpanDefault
    },
    // 获取显隐状态
    getDisplay (column) {
      return this.checkData(column.display, true)
    },
    // 清空表单
    resetForm () {
      clearVal(this.form)
      this.$emit('empty')
      this.$emit('input', this.form)
    },
    // 提交表单
    submit () {
      this.show = true
      this.$refs.form.validate((valid, msg) => {
        if (valid) {
          this.$emit('submit', this.form)
        } else {
          this.$emit('error', msg)
        }
      })
    },
    // 初始化表单
    initForm () {
      let formDefault = formInitVal(this.option.columns)
      let value = this.deepClone(formDefault)
      this.setForm(this.deepClone(Object.assign(value, this.form)))
    },
    // 表单赋值
    setForm (value) {
      Object.keys(value).forEach(ele => {
        let result = value[ele]
        this.$set(this.form, ele, result)
      })
    },
    // 实例control操作
    setControl () {
      this.initControlOption.forEach(ele => {
        let control = ele.control(this.form[ele.prop], this.form)
        if (control) {
          Object.keys(control).forEach(item => {
            this.objectOption[item] = Object.assign(this.objectOption[item], control[item])
          })
        }
      })
    }
  }
})
</script>

<style scoped>

</style>
