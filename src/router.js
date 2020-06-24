import Vue from 'vue'
import Router from 'vue-router'
import AdminLogin from '@/views/AdminLogin.vue'
import AdminNew from '@/views/AdminNew.vue'
import AdminEdit from '@/views/AdminEdit.vue'
import AdminArticles from '@/views/AdminArticles.vue'
import UserArticles from '@/views/UserArticles.vue'
import UserDetail from '@/views/UserDetail.vue'
import StatusNotFound from '@/views/StatusNotFound.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/admin/login',
      name: 'adminLogin',
      component: AdminLogin,
    },
    {
      path: '/admin/new',
      name: 'adminNew',
      component: AdminNew,
    },
    {
      path: '/admin/articles',
      name: 'adminArticles',
      component: AdminArticles,
    },
    {
      path: '/admin/articles/:id',
      name: 'adminEdit',
      component: AdminEdit,
    },
    {
      path: '/articles',
      name: 'userArticles',
      component: UserArticles,
    },
    {
      path: '/articles/:id',
      name: 'userDetail',
      component: UserDetail,
    },
    {
      path: '/',
      name: 'userArticles',
      component: UserArticles,
    },
    {
      path: '*',
      name: 'statusNotFound',
      component: StatusNotFound,
    },
  ],
})
