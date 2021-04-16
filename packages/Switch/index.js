import Switch from './Switch.vue'

Switch.install = function (Vue) {
  Vue.component(Switch.name, Radio)
}

export default Switch
