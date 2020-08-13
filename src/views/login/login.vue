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
                            <el-input type="password" v-model="user.password" placeholder="密码"></el-input>
                        </el-form-item>
                        <el-form-item label="人类验证码" required>
                            <el-input v-model="loginInfo.verifyCode" placeholder="请输入右侧的验证码" @keypress.enter.native="doLogin"></el-input>

                        </el-form-item>

                        <el-form-item style="border: 0;background: 0;" class="login-button">
                            <el-button type="primary" size="small" @click="doLogin" >登录</el-button>
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
import axios from 'axios'
import login from "../../api/login";
    export default {

        data() {
            return {
                user: {
                    userName:'',
                    password:''
                },
                loginInfo:{
                    verifyCode:'',
                    from:'p_',
                    captcha_key:''
                },
                captchaPath:'',

            }
        },
        methods: {

            toastE(msg){
              this.$message({
                  message:msg,
                  center:true,
                  type:'error'
              })
            },

            doLogin() {
                //todo：
                //发起登录
                //检查数据，向服务器提交数据，处理结果
                if (this.user.userName === '') {
                    this.toastE('用户名不能为空')
                    return
                }
                if (this.user.password === '') {
                    this.toastE('密码不能为空')
                    return
                }
                if (this.loginInfo.verifyCode === '') {
                    this.toastE('验证码不能为空')
                    return
                }
                console.log(this.loginInfo)
                console.log(this.user)
                login.doLogin(this.loginInfo.verifyCode,this.loginInfo.captcha_key,this.user)
                .then(response=>{
                    //如果成功则跳转---判断角色，如果是普通用户，跳转到门户页，如果是管理员，跳转到管理中心

                    if (response.data.code === 20000) {
                        //todo:需要判断角色
                        this.$router.push({path:'/index'});
                    }else{
                        this.updateVerifyCode();
                    }
                })


            },
            updateVerifyCode(){
              this.captchaPath = 'http://sang66.icu:8004/biz/user/captcha?captcha_key='+this.loginInfo.captcha_key+"&random="+Date.parse(new Date());

            }
        },
        mounted() {
            //todo:检查登录是否有效
            //如果已经登录了，跳转到管理员界面
             this.loginInfo.captcha_key = Date.parse(new Date());
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
