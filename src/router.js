import Vue from 'vue'
import Router from 'vue-router'
import AdminNew from './views/AdminNew.vue'
import AdminEdit from './views/AdminEdit.vue'
import AdminArticles from './views/AdminArticles.vue'
import StatusNotFound from './views/StatusNotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
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
      path: '/admin/edit',
      name: 'adminEdit',
      component: AdminEdit,
    },
    {
      path: '*',
      name: 'statusNotFound',
      component: StatusNotFound,
    },
  ]
})
