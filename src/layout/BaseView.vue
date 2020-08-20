<template>
    <div>
        <el-container>
            <el-header id="admin-header-box">
                <TopHeader></TopHeader>
            </el-header>
            <el-container class="main-container">
                <el-aside id="left-menu-list-box" width="220px">
                    <LeftMenu></LeftMenu>
                </el-aside>
                    <el-main>
                            <router-view></router-view>
                    </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
    export default {
        name: "BaseView",
        mounted() {
            /*//动态设置侧边栏的高度
            let leftMenuBox =  document.getElementById('left-menu-list-box');
            let adminHeaderBox = document.getElementById('admin-header-box');
            if (leftMenuBox&&adminHeaderBox) {
                leftMenuBox.style.height = (window.innerHeight-adminHeaderBox.offsetHeight)+'px';
            }*/
        }
    }
</script>

<style scoped>

    #left-menu-list-box .el-menu{
        border-right: none ;
    }


    .el-header, .el-footer {
        background-color: #409EFF;
        line-height: 46px;
        height: 46px !important;
    }
    .el-aside{
        border-right: solid 1px #e6e6e6;
        line-height: 200px;
    }
    .el-main{
        padding: 0;
    }
    .main-container{
        position: absolute;
        top: 46px;
        bottom: 0;
        width: 100%;
    }

</style>
