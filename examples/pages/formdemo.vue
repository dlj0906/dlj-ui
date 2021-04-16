<template>
  <div>
    <el-row style="margin-bottom:20px">
      <el-radio-group v-model="sizeValue">
        <el-radio label="medium">medium</el-radio>
        <el-radio label="small">small</el-radio>
        <el-radio label="mini">mini</el-radio>
      </el-radio-group>
    </el-row>
    <star-form :form="form" ref="form" :option="option" @empty="empty"  @submit="submit">
      <template slot-scope="scope" slot="menuForm">
        <el-button @click="tip">自定义按钮</el-button>
      </template>
    </star-form>
  </div>
</template>

<script>
const DIC = {
  VAILD: [{
    value: '选项1',
    label: '黄金糕'
  }, {
    value: '选项2',
    label: '双皮奶'
  }, {
    value: '选项3',
    label: '蚵仔煎'
  }, {
    value: '选项4',
    label: '龙须面'
  }, {
    value: '选项5',
    label: '北京烤鸭'
  }],
  sex: [{
    label: '男',
    value: 0
  }, {
    label: '女',
    value: 1
  }],
  cascader: [{
    label: '男',
    value: 0,
    children: [{
      value: 'shejiyuanze',
      label: '设计原则',
      children: [{
        value: 'yizhi',
        label: '一致'
      }, {
        value: 'fankui',
        label: '反馈'
      }, {
        value: 'xiaolv',
        label: '效率'
      }, {
        value: 'kekong',
        label: '可控'
      }]
    }]
  }, {
    label: '女',
    value: 1
  }]
}
export default {
  name: 'demoform',
  components: {
  },
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      sizeValue: 'small',
      form: {
        username: '123123',
        password: '111111',
        sex: '120000,130000,150000,220000'
      }
    }
  },
  computed: {
    option () {
      return {
        size: this.sizeValue, // 表单size
        span: 8, // 表单分栏 默认12
        columns: [ // 表单项配置
          {
            label: '用户名', // 表单项label
            span: 24, // 表单项分栏
            prop: 'username', // 表单项绑定的字段
            tip: '这是信息提示', // 表单项划过展示
            display: true, // 表单项是否展示，默认为true
            suffixIcon: 'el-icon-date',
            prefixIcon: 'el-icon-search',
            prepend: 'http://',
            append: 'com',
            dataType: 'number',
            labelTip: '我是一个标题提示语',
            labelTipPlacement: 'right',
            rules: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            }],
            change: ({value, column}) => {
            },
            click: ({value, column}) => {
            },
            focus: ({value, column}) => {
            },
            blur: ({value, column}) => {
            }
          },
          {
            label: '密码',
            prop: 'password',
            type: 'password'
          },
          {
            label: '年龄',
            prop: 'number',
            type: 'number',
            min: 10,
            max: 100,
            controls: false
          },
          {
            label: '性别',
            prop: 'sex',
            type: 'select',
            remote: true,
            multiple: true,
            dataType: 'string',
            props: {
              label: 'name',
              value: 'code'
            },
            method: 'get',
            dicUrl: 'https://cli.avuejs.com/api/area/getProvince',
            change: ({value, column}) => {
              console.log(value)
            }
          },
          {
            label: '单选',
            prop: 'danxuan',
            type: 'radio',
            dicData: DIC.sex,
            change: ({value, column}) => {
              console.log(value)
            },
            // 控制其他表单项方法
            control: (value, form) => {
              // TODO 暂时有bug
              return
              if (value === 0) {
                return {
                  grade: {
                    display: true
                  },
                  switch: {
                    label: '开关1'
                  }
                }
              } else {
                return {
                  grade: {
                    display: false
                  },
                  switch: {
                    label: '开关2'
                  }
                }
              }
            }
          },
          {
            label: '爱吃',
            prop: 'grade',
            type: 'checkbox',
            dicData: DIC.VAILD,
            max: 2,
            change: ({value, column}) => {
              console.log(value)
            }
          },
          {
            label: '开关',
            prop: 'switch',
            type: 'switch',
            change: ({value, column}) => {
              console.log(value)
            }
          },
          {
            label: '日期',
            prop: 'date',
            type: 'date',
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd',
            change: ({value, column}) => {
              console.log(value)
            }
          },
          {
            label: '日期时间',
            prop: 'datetime',
            type: 'datetime',
            format: 'yyyy-MM-dd hh:mm:ss',
            valueFormat: 'yyyy-MM-dd hh:mm:ss',
            change: ({value, column}) => {
              console.log(value)
            }
          },
          {
            label: '时间',
            prop: 'time',
            type: 'time',
            span: 8,
            format: 'hh:mm:ss',
            valueFormat: 'hh:mm:ss',
            change: ({value, column}) => {
              console.log(value)
            }
          },
          {
            label: '时间区间',
            prop: 'timerange',
            type: 'timerange',
            span: 8,
            format: 'hh:mm:ss',
            valueFormat: 'hh:mm:ss',
            change: ({value, column}) => {
              console.log(value)
            }
          },
          {
            label: '多级',
            prop: 'cascader',
            type: 'cascader',
            span: 8,
            multiple: true,
            filterable: true,
            checkStrictly: true,
            dicData: DIC.cascader,
            change: ({value, column}) => {
              console.log(value)
            }
          },
          {
            label: '自我介绍',
            prop: 'text',
            type: 'textarea'
          },
          {
            label: '日期区间',
            prop: 'daterange',
            type: 'daterange',
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd',
            datePickerOptions: ['today'], // 快捷选项配置
            change: ({value, column}) => {
              console.log(value)
            }
          },
          {
            label: '时间日期区间',
            prop: 'datetimerange',
            type: 'datetimerange',
            datePickerOptions: ['today'], // 快捷选项配置
            change: ({value, column}) => {
              console.log(value)
            }
          }
        ]
      }
    }
  },
  methods: {
    change (value) {
      console.log(value)
    },
    empty () {
      this.$message.success('清空方法回调')
    },
    submit () {
      console.log(this.$refs.form.getPropRef('username'))
      console.log(JSON.stringify(this.form))
    },
    tip () {
      this.$message.success('自定义按钮')
    }
  }
}
</script>

<style scoped>

</style>
