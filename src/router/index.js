import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from "../views/login/login";
import index from "../views/dashboard/index";
import ManageArticle from "../views/content/ManageArticle";
import ManageCategory from "../views/operation/ManageCategory";
import ManageComment from "../views/content/ManageComment";
import ManageImage from "../views/content/ManageImage";
import loop from "../views/operation/loop";
import PostArticle from "../views/content/PostArticle";
import FriendLink from "../views/settings/FriendLink";
import WebsizeInfo from "../views/settings/WebsizeInfo";
import RestPassword from "../views/user/RestPassword";
import list from "../views/user/list";
import RightContent from "../layout/RightContent";
import BaseView from "../layout/BaseView";
import Email from "../views/user/Email";
import Info from "../views/user/Info";



Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'BaseView',
    redirect:"/index",
    component: BaseView,
    children: [
        {
          /*仪表盘*/
          path:'/index',
            name:'首页',
            icon:'el-icon-s-home',
          component:index
        },
        {
            path: '/content',
            name: '内容',
            icon:'el-icon-tickets',
            component: RightContent,
            children:[
                {
                    path:'postArticle',
                    component:PostArticle,
                    icon:'el-icon-edit-outline',
                    name:'发表文章',
                },
                {
                    path: 'ManageComment',
                    name:'评论管理',
                    icon: 'el-icon-chat-line-square',
                    component: ManageComment
                },
                {
                    path: 'ManageArticle',
                    name:'文章管理',
                    icon:'el-icon-document-copy',
                    component: ManageArticle
                },
                {
                    path: 'ManageImage',
                    name:'图片管理',
                    icon: 'el-icon-picture',
                    component: ManageImage
                }
            ]
        },
        {
            path: '/user',
            name: '用户',
            icon: 'el-icon-user',
            component: RightContent,
            children: [
                {
                    path: 'list',
                    component: list,
                    icon: 'el-icon-user',
                    name:'用户列表',
                },

                {
                    path: 'email',
                    name:'邮箱设置',
                    icon: 'el-icon-message',
                    component: Email
                },
                {
                    path: 'Info',
                    name:'用户信息',
                    icon: 'el-icon-more',
                    component: Info
                }
            ]
        },
        {
            path: '/operation',
            name: '运营',
            icon: 'el-icon-document-remove',
            component: RightContent,
            children: [
                {
                    path: 'category',
                    name:'分类管理',
                    icon: 'el-icon-document',
                    component: ManageCategory
                },
                {
                    path: 'loop',
                    name:'轮播图管理',
                    icon: 'el-icon-picture-outline',
                    component: loop
                }
            ]
        },
        {
            path: '/settings',
            name: '设置',
            icon: 'el-icon-setting',
            component: RightContent,
            children: [
                {
                    path: 'web-site-info',
                    icon: 'el-icon-document',
                    name:'网站消息',
                    component: WebsizeInfo
                },
                {
                    path: 'friend-link',
                    name:'友情链接',
                    icon: 'el-icon-link',
                    component: FriendLink
                }
            ]
        }
        ]


  },
  {
      path: '/login',
      component: login,
  }


  /*,
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/!* webpackChunkName: "about" *!/ '../views/About.vue')
  }*/
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router


