// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
import VueX from 'vuex' // vuex
Vue.use(VueX) // 挂载vuex
//使用mui
import './lib/mui/css/mui.css' //导入全部MUI的样式
import './lib/mui/css/icons-extra.css' // 导入扩展图标样式
import $ from 'jquery'//导入jQuery
import 'bootstrap/dist/css/bootstrap.css'//引入bootstrap
//import popper from 'popper.js/dist/popper'
//Vue.use(popper)

Vue.filter('dataFormat', (data) => { return data.toLocaleString(); })


Vue.config.productionTip = false



const store = new VueX.Store({
  state: {

      score:0
  },
  mutations: {

         getScore(state,score){
              state.score=score
         }

  },
  getters: {


      

  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
