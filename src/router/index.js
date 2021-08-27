import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Article from '@/components/article'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/Article/:id',
      component:Article
    }

  ]
})
