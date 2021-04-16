
import StarNumberRange from './NumberRange/index'
import StarTable from './Table/index'
import StarCopy from './Copy/index'
import BtShow from './Show/index'
import StarGrid from './Grid/index'
import BtAction from './Action/index'
import StarPagination from './Pagination/index'
import StarForm from './Form/index'
import StarInput from './Input/index'
import StarSelect from './Select/index'
import StarCheckbox from './Checkbox/index'
import StarRadio from './Radio/index'
import StarSwitch from './Switch/index'
import StarDate from './Date/index'
import StarTime from './Time/index'
import StarNumber from './Number/index'
import StarCascader from './Cascader/index'

const components = [
  StarNumberRange,
  StarTable,
  StarCopy,
  BtShow,
  StarGrid,
  StarPagination,
  StarForm,
  StarInput,
  StarSelect,
  StarCheckbox,
  StarRadio,
  StarSwitch,
  StarDate,
  StarTime,
  StarNumber,
  StarCascader
]

const install = function (Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  StarNumberRange,
  StarTable,
  StarCopy,
  BtShow,
  StarGrid,
  BtAction,
  StarPagination,
  StarForm,
  StarInput,
  StarSelect,
  StarCheckbox,
  StarRadio,
  StarSwitch,
  StarDate,
  StarTime,
  StarNumber,
  StarCascader
}
