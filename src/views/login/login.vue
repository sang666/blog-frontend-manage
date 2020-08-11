<template>
<div class="admin-login-box">
    <!--顶部内容-->
    <div class="admin-login-header-box">
        <div class="admin-login-header-center">
            <div class="admin-login-logo">
                博客系统|登录
            </div>
        </div>
    </div>
    <!--中间内容-->
    <div class="admin-login-center-box">
        <div class="center login-center-box">
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form label-position="right" label-width="100px" >
                        <el-form-item label="账号" required>
                            <el-input v-model="user.userName" placeholder="用户名/邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" required>
                            <el-input v-model="user.password" placeholder="密码"></el-input>
                        </el-form-item>
                        <el-form-item label="人类验证码" required>
                            <el-input v-model="loginInfo.verifyCode" placeholder="请输入右侧的验证码"></el-input>

                        </el-form-item>

                        <el-form-item style="border: 0;background: 0;" class="login-button">
                            <el-button type="primary" size="small" @click="doLogin">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="10">
                    <img :src="captchaPath" @click="updateVerifyCode" style="margin-top: 45%" class="captcha_code">
                </el-col>
            </el-row>

        </div>

    </div>

</div>
</template>

<script>
    export default {

        data() {
            return {
                user: {
                    userName:'',
                    password:''
                },
                loginInfo:{
                    verifyCode:'',
                    captcha_key:'',
                    from:''
                },
                captchaPath:'',
                captcha_key:''
            }
        },
        methods: {
            doLogin() {

            },
            updateVerifyCode(){
              this.captchaPath = 'http://localhost:8004/biz/user/captcha?captcha_key='+this.captcha_key+"&random="+Date.parse(new Date());

            }
        },
        mounted() {
             this.captcha_key = Date.parse(new Date());
            this.updateVerifyCode();
        }
    }
</script>

<style scoped>
    .admin-login-header-box{
        width: 100%;
        height: 46px;
        background: #409EFF;
        margin-bottom: 5%;

    }
    .admin-login-header-center{
        line-height: 46px;
        margin: 0 auto;
        width: 1140px;
    }
    .admin-login-logo{
        color: #fff;
        font-size: 20px;
        font-weight: 600;
    }
    .center{
        margin: 0 auto;
        width: 1140px
    }
    .login-center-box{
        padding: 20px;
        border-radius: 5px;
        width: 50%;
        height: 300px;
        background: #fff;
        box-shadow: 0 1px 10px #afafaf;
    }
    .el-form-item {
        background: #F2F6FC;
        border-left: #E4E7ED solid 1px;
        border-top: #E4E7ED solid 1px;
        border-bottom: #E4E7ED solid 1px;

        text-align: center;
    }
    .login-button{
        margin-bottom: 0;
        margin-right: 100px;

    }
    .captcha_code{
        cursor: pointer;
        width: 60%;

    }

</style>
