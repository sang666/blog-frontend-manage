<template>
<div>

            <el-menu
                    default-active="1-1"
                    unique-opened="true"
                    class="el-menu-vertical-demo">


                <template  v-for="(item,index) in menuList" >

                    <router-link :to="item.path" v-if="!item.children" :key="index">
                        <el-menu-item :index="index">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>
                    </router-link>



                    <el-submenu  v-else :key="index" :index="index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{item.name}}</span>
                        </template>

                        <router-link :to="item.path+'/'+subItem.path" v-for="(subItem,subIndex) in item.children" :key="subIndex">
                            <el-menu-item :index="index+'-'+subIndex"  >
                                <i :class="subItem.icon"></i>
                                <span slot="title" v-text="subItem.name"></span>
                            </el-menu-item>
                        </router-link>



                    </el-submenu>
                </template>
            </el-menu>

</div>
</template>

<script>
    import {routes} from "../router";

    export default {
        name: "LeftMenu",
        data() {
            return {
                menuList:[]
            }
        },
        mounted() {
            let menuList = routes[0];
            this.menuList = menuList.children
            console.log(this.menuList)
        }
    }
</script>

<style scoped>

    .el-menu{
        border-right: none ;
    }

    .el-aside {

        text-align: center;
        line-height: 200px;
    }
    .router-link-active {
        text-decoration: none;
    }

    a {
        text-decoration: none;
    }


</style>
