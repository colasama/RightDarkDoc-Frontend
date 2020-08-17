import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    meta:{title:'工作台 - 右墨文档'},
    component: Home
  },
  {
    path: '/welcome',
    name: 'Welcome',
    meta: {title:'右墨文档 - 可能是第二好的文档协作平台',},
    component: () => import('../views/Welcome.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {title: '注册账户 - 右墨文档',},
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {title: '登录 - 右墨文档',},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/doc/:id',
    name:'Document',
    meta: {tittle:'文档 - 右墨文档',},
    component: () => import('../views/Doc.vue')
  },
  {
    path: '/test',
    name:'Test',
    meta: {tittle:'Test',},
    component: () => import('../views/Test.vue')
  },
  {
    path: '/docno',
    name:'No',
    meta: {tittle:'文档 - 右墨文档',},
    component: () => import('../views/DocNoAuth.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {title:'个人信息 - 右墨文档',},
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/message',
    name: 'Message',
    meta: {title:'消息 - 右墨文档',},
    component: () => import('../views/Message.vue')
  },
  {
    path: '/doc404',
    name: 'Doc404',
    meta: {title:'404 - 右墨文档',},
    component: () => import('../views/Doc404.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeResolve((to, from, next) => {
  if (store.state.token==null) {
    store.state.token=window.sessionStorage.getItem('token');
    store.state.username=window.sessionStorage.getItem('username');
    store.state.userid=window.sessionStorage.getItem('userid');
  }
  console.log(store.state.token);
  if (to.name=="Document") {
    var docid = to.params.id;
    Vue.axios({
      method: "get",
      url: "http://39.106.230.20:8090/document/" + docid,
      headers: {
        token: store.state.token,
      },
    }).then(function (response) {
      if (response.data.success==false) {
        next('/doc404');
      }
    }).catch(function () {
      next('/doc404');
    });
  }
  if (store.state.token==null&&to.fullPath=="/") {
    next('/welcome');
  }else{
    next();
  }
})

export default router
