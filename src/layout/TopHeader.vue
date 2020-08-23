<template>
<div>
    <div class="header=left-box">
        <div class="header-logo float-left">
            博客管理中心

        </div>
    </div>
    <div class="header-right-box float-right">
        <div class="header-user-info clearfix">
            <div class="header-user-avatar float-left">
                <img :src="avatar" style="object-fit: cover">
            </div>
            <div class="header-user-username float-left">
                <el-dropdown @command="handlerCommand">
                      <span class="el-dropdown-link">
                        {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userInfo">用户信息</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>


    </div>
</div>
</template>

<script>
    import user from "../api/user";

    export default {
        name: "TopHeader",
        data() {
            return {
                userName:'',
                avatar:'',
            }
        },
        methods: {
            handlerCommand(command) {
                if (command === 'userInfo') {
                    this.$router.push({
                        path:'/user/Info'
                    })
                }else if (command === 'logout') {
                    user.logout().then(resp=>{
                        //跳转到登录页面
                        this.$router.push({
                            path:'/login'
                        })
                    })
                }


            }
        },
        mounted() {
            this.avatar = window.localStorage.getItem('avatar')
            this.userName = window.localStorage.getItem('userName')
        }
    }
</script>

<style >
    .header-user-info{
        margin-right: 30px;
    }
    .header-user-username .el-dropdown-link{
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        color: #fff;
        margin-left: 10px;
    }
    .header-user-avatar img{
        width: 36px;
        height: 36px;
        border-radius: 50%;
        vertical-align: middle;
    }
.header-logo{
    color: #fff;
    font-size: 20px;
    font-weight: 600;
}
</style>
