<template>
    <div>
        <el-container>
            <el-header id="admin-header-box">
                <TopHeader></TopHeader>
            </el-header>
            <el-container>
                <el-aside id="left-menu-list-box" width="200px">
                    <LeftMenu></LeftMenu>
                </el-aside>
                <el-container>
                    <el-main>
                        <div class="content">
                            <router-view></router-view>
                        </div>
                    </el-main>

                </el-container>
            </el-container>
        </el-container>

    </div>
</template>

<script>
    export default {
        name: "BaseView",
        mounted() {
            //动态设置侧边栏的高度
            let leftMenuBox =  document.getElementById('left-menu-list-box');
            let adminHeaderBox = document.getElementById('admin-header-box');
            if (leftMenuBox&&adminHeaderBox) {
                leftMenuBox.style.height = (window.innerHeight-adminHeaderBox.offsetHeight)+'px';



            }
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

</style>
