import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/index';
import Article from '@/components/article';
import Personal from '@/components/personal';
import Video from '@/components/video';
import List from '@/components/list';
import List_x from '@/components/list_x';
Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
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
    },
    {
      path:'/Personal',
      component:Personal
    },
    {
      path:'/Video',
      component:Video
    },
    {
      path:'/List',
      component:List
    },
    {
      path:'/List_x/:id',
      component:List_x
    }
  ]
})
