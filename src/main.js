// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import axios from 'axios'
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.use(Viser)
Vue.use(Antd)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
