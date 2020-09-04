import Vue from 'vue';
import App from './App';

import router from './router';

import '../static/css/common.less';

import './ui.js'

var vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
vm.$Message.config({
    top: 50,
    duration: 5
});

