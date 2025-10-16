import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './Routes'
import Helper from './Helper'


Vue.config.productionTip = false
const router = new VueRouter({
  routes:Routes,
  mode:'history'
})

Vue.mixin(Helper)

Vue.use(VueRouter)
new Vue({
  render: h => h(App),
  router: router

}).$mount('#app')
