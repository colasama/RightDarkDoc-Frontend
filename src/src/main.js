import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import store from './store'
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
import animate from 'animate.css'
import CKEditor from '@ckeditor/ckeditor5-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueClipboard from 'vue-clipboard2'
import VueParticles from 'vue-particles'

Vue.use(VueParticles)
Vue.use(VueAxios, axios)

//在store/index.js里已经引入vuex

Vue.use(animate)//动画库插件
Vue.use(contentmenu)
Vue.use(Antd)
Vue.use(CKEditor)
Vue.use(VueClipboard)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
