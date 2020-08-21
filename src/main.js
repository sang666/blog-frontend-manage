import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
/*
import 'mavon-editor/dist/css/index.css'
*/
import LeftMenu from "./layout/LeftMenu";
import TopHeader from "./layout/TopHeader";
import RightContent from "./layout/RightContent";
import axios from 'axios';
import login from '../src/api/login'
/*
import mavonEditor from 'mavon-editor'
*/


// use

/*
Vue.use(mavonEditor)
*/
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('LeftMenu',LeftMenu)
Vue.component('TopHeader',TopHeader)
Vue.component('RightContent',RightContent)

Vue.prototype.$axios = axios;


router.beforeEach((to,from,next)=>{
  //如果是登陆界面，则需要放行
  if (to.path === '/login') {
    next();
  }else {
    //否则检查用户角色
    login.checkRole().then(resp=>{
      let res = resp.data;
      if (res.code === 20020) {
        //成功,判断用户角色
        if (res.data.user.roles === 'role_admin') {
          next();
        }else {
          //跳转到首页
          location.href='https://www.baidu.com';
        }
      }else {
        next({
          path:'/login'
        })
      }
    })
    /*this.get('/api/biz/user/check-token').then(resp=>{
      console.log(resp.data);
    })*/
    //如果是管理员，放行，
    // 如果是普通用户，跳转到门户首页
  }

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
