/**
 * @Description: 初始化共同配置
 * @author LongJiang Dong
 * @date 2021/4/13
*/

import { loadLocalDic, loadDic } from './dic'
export default function () {
  return {
    data () {
      return {
        dicObj: {} // 字典集合
      }
    },
    props: {
      // 数据
      form: {
        type: Object,
        required: true,
        default: () => {
          return {}
        }
      },
      // 配置
      option: {
        type: Object,
        required: true,
        default: () => {
          return {}
        }
      }
    },
    computed: {
      // 获取表单大小
      controlSize () {
        return this.option.size || 'small'
      }
    },
    created () {
      this.init()
    },
    methods: {
      // 初始化
      init () {
        this.handleLocalDic()
        this.handleLoadDic()
      },
      // 塞入字典
      handleSetDic (list, res = {}) {
        Object.keys(res).forEach(ele => {
          this.$set(list, ele, res[ele])
        })
      },
      // 本地字典
      handleLocalDic () {
        this.dicObj = loadLocalDic(this.option)
      },
      // 网络字典加载
      handleLoadDic () {
        loadDic(this.option).then(res => this.handleSetDic(this.dicObj, res))
      }
    }
  }
}
