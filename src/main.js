import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import LeftMenu from "./layout/LeftMenu";
import TopHeader from "./layout/TopHeader";
import RightContent from "./layout/RightContent";


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('LeftMenu',LeftMenu)
Vue.component('TopHeader',TopHeader)
Vue.component('RightContent',RightContent)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
