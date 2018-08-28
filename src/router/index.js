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
      path: '/',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: { title: '自述文件' },
      children: [
      	{
      		path: '/dashboard',
      		component: resolve => require(['../components/page/Dashboard.vue'], resolve)
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
})
