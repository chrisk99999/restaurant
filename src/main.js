// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios'
import 'lib-flexible'
import qs from 'qs'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'

Vue.prototype.$api = axios
Vue.prototype.$qs = qs
axios.defaults.baseURL = ''

Vue.use(ElementUI).use(VueI18n)
Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    'zh': {
      ...require('./assets/i18n/zh'),
      ...zhLocale
    },
    'en': {
      ...require('./assets/i18n/en'),
      ...enLocale
    }
  }
})
ElementLocale.i18n((key, value) => i18n.t(key, value))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
})
