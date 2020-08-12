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
//在store/index.js里已经引入vuex

Vue.use(animate)//动画库插件
Vue.use(contentmenu)
Vue.use(Antd)
Vue.use(CKEditor)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
