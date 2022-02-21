import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import VueContentPlaceholders from 'vue-content-placeholders'
import moment from 'moment'
import uniqid from 'uniqid';

Vue.config.productionTip = false

Vue.prototype.$moment = moment
Vue.prototype.$uniqid = uniqid

Vue.component('pagination', require('laravel-vue-pagination'));

Vue.use(VueContentPlaceholders)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
