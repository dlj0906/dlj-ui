// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import element from 'element-ui'
import router from './router'
import demoBlock from './components/demo-block.vue'
import StarUi from '../packages/index'
import 'element-ui/lib/theme-chalk/index.css'
import '../packages/theme-default/index.less'
import { setPx, checkData, deepClone } from 'utils/util'

let prototypes = {
  setPx,
  checkData,
  deepClone
}

const install = function (Vue, opts = {}) {
  Object.keys(prototypes).forEach((key) => {
    Vue.prototype[key] = prototypes[key]
  })
}

Vue.component('demo-block', demoBlock)

Vue.use(StarUi)
Vue.use(element)
Vue.use(install)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
