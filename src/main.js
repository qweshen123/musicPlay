import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios  from 'vue-axios'
import $ from 'jquery'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import eleconfigUi from './elementUi.config'
import 'element-ui/lib/theme-chalk/index.css';
// import elementUI from 'element-ui'

Vue.config.productionTip = false
Vue.use(VueAxios,axios)
Vue.use(eleconfigUi)


let vm = new Vue({
  $,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vm

