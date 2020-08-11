import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/welcome',
    name: 'Welcome',
    meta: {tittle:'欢迎页',},
    component: () => import('../views/Welcome.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {title: '注册',},
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {title: '登录',},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/doc/:id',
    name:'Document',
    meta: {tittle:'文档',},
    component: () => import('../views/Doc.vue')
  },
  {
    path: '/test',
    name:'Test',
    meta: {tittle:'Test',},
    component: () => import('../views/Test.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
