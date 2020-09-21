import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/login/Login'),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/',
      name: 'Index',
      component: () => import('@/pages/Index'),
      meta: {
        requireAuth: false
      },
      children: [{
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/pages/welcome/Welcome'),
      }, {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/dashboard/Dashboard'),
      }]
    },
    {
      path: '/menu',
      name: 'Menu',
      component: () => import('@/components/layout/SideMenu'),
      meta: {
        requireAuth: false
      }
    }
  ]
})
