import Time from './Time.vue'

Time.install = function (Vue) {
  Vue.component(Time.name, Date)
}

export default Time
