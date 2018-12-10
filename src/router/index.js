import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    }
    
  ]
})

export const powerRouter = [
  {
    path: '/',
    component: resolve => require(['../components/common/Home.vue'], resolve),
    meta: { title: '自述文件' },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: resolve => require(['../components/page/Dashboard.vue'], resolve),
        meta: { title: '系统首页', role:"student"},
      },
      {
        path: '/table',
        component: resolve => require(['../components/page/Table.vue'], resolve)
      }
    ]
  },
  {
    path: '/login',
    component: resolve => require(['../components/page/Login.vue'], resolve)
  }
]