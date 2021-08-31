// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import $ from 'jquery';
import LyTab from 'ly-tab';
import MescrollVue from 'mescroll.js/mescroll.vue';
import VueLazyload from 'vue-lazyload';
Vue.use(LyTab);
Vue.use(VueLazyload, {
  preLoad: 1,
  error: require('./image/img_preview.png'),
  loading: require('./image/img_preview.png'), // 为图片加载前展示的默认图片路径
  attempt: 3,
});
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(require('vue-moment'));
Vue.component('MescrollVue', MescrollVue);
require('es6-promise').polyfill();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

