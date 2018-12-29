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
        meta: {
          title: '系统首页',
          role: "student",
          icon: 'el-icon-setting',
          index:"dashboard"
        },
      },
      {
        path: '/table',
        component: resolve => require(['../components/page/Table.vue'], resolve),
        meta: {
          title: '表格',
          role: "admin",
          icon: 'el-icon-tickets',
          index:"table"
        },
      }
    ]
  },
  {
    path: '/login',
    component: resolve => require(['../components/page/Login.vue'], resolve)
  }
]