import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
