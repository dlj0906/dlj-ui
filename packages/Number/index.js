import Number from './Number.vue'

Number.install = function (Vue) {
  Vue.component(Number.name, Number)
}

export default Number
