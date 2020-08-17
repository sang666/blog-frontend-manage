<template>
<div class="email-box">
    <el-row >
        <el-col :span="8">
            <el-form label-width="100px" >
                <el-form-item
                        prop="email"
                        label="新邮箱地址"
                >
                    <el-input v-model="newEmail"></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                    <el-input v-model="verifyCode" class="email-verify-code-box">

                    </el-input>
                    <el-button v-if="!isCountDowning" class="verify-code-button-box" type="primary" @click="getVerifyCode">获取验证码</el-button>
                    <el-button v-else class="verify-code-button-box" type="primary" @click="getVerifyCode">{{countDownText}}</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="danger" @click="updateEmailAddress">修改</el-button>

                </el-form-item>
            </el-form>
        </el-col>
    </el-row>

</div>
</template>

<script>
    import email from "../../api/email";
    export default {
        name: "Email",
        data() {
            return {
                newEmail: '',
                verifyCode:'',
                countDownText:'重新发送',
                isCountDowning: false
            }
        },
        methods: {
            showWarrning(msg){
                this.$message({
                    message:msg,
                    type:'warning',
                    center:true,

                })
            },
            updateEmailAddress() {

            },
            getVerifyCode(){
                //校验邮箱格式是否正确
                let reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
                if (!reg.test(this.newEmail)) {
                    this.showWarrning('邮箱格式不对')
                    return;
                }
                //发起请求
                email.getVerifyCode(this.newEmail,'update').then(resp=>{

                })
                //禁止按钮可以使用，并且开始倒计时
                let time = 60;
                this.isCountDowning = true;
                let _this = this;
                let interval = setInterval(function () {
                    //执行倒计时内容
                    time--;
                    if (time <= 0) {
                        this.isCountDowning = false
                        clearInterval(interval)
                    }
                    _this.countDownText = '重新发送('+time+')';
                },1000)
            },
        },
    }
</script>

<style scoped>
    .email-verify-code-box{
        width: 150px;
    }

    .verify-code-button-box{
        margin-left: 30px;
    }

</style>
