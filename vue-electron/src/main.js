import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './css/iconfont.css'
import VueSocketIO from 'vue-socket.io';
Vue.use(ElementUI)
// Vue.use(new VueSocketIO({
//   debug:false,
//   connection:'http://localhost:8081',
//   cors_allowed_origins:'*'
// }))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
