<template>
    <div class="userInfo-box">

        <div class="user-info-list-part">
            <el-form  label-width="100px" class="demo-ruleForm" v-if="userInfo!==null" size="medium">
                <el-form-item label="用户id" >
                    <el-input type="text" v-model="userInfo.id" disabled></el-input>
                </el-form-item>

                <el-form-item label="邮箱地址" >
                    <el-input type="email" v-model="userInfo.email" autocomplete="off" disabled>

                    </el-input><el-button  type="primary" @click="toUpdateEmailPage" class="updateEmail">修改邮箱</el-button>

                </el-form-item>

                <el-form-item label="用户名" >
                    <el-input type="text" v-model="userInfo.userName" autocomplete="off"></el-input>
                </el-form-item>



                <el-form-item label="签名" >
                    <el-input type="email" v-model="userInfo.sign" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="头像" class="user-info-avatar">
                    <div class="user-avatar-container" @click="showAvatorDialog" >
                        <el-avatar :src="userInfo.avatar"></el-avatar>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="updateUserInfo">修改</el-button>
                </el-form-item>
            </el-form>

        </div>

        <div class="user-info-dialog">

            <avatar-upload field="file"
                       @crop-upload-success="cropUploadSuccess"
                       @crop-upload-fail="cropUploadFail"
                       v-model="showAvatorCutter"
                       :width="300"
                       :height="300"
                       url="/api/biz/images/upload/avatar"
                       img-format="png">

            </avatar-upload>

        </div>


    </div>

</template>

<script>
    import user from "../../api/user";
    import userInfo from "../../api/userInfo";
    import avatarUpload from 'vue-image-crop-upload/upload-2.vue';

    export default {
        components:{
          'avatar-upload' :avatarUpload
        },
        name: "Info",
        data() {
            return {
                lastUserName:'',
                showAvatorCutter:false,
                userId: '',
                userInfo:{

                },

            }
        },
        methods: {
            showAvatorDialog(){
              this.showAvatorCutter=true
            },

            cropUploadFail(status,field){
                this.$message.error('上传失败')

            },
            cropUploadSuccess(resp,field){
                //this.showAvatorCutter = false
                if (resp.code === 20000) {
                    console.log(field);
                    this.userInfo.avatar = 'https://'+resp.data.result.name
                }
                console.log(this.userInfo.avatar);
            },
            getUserInfo() {
                userInfo.checkRole().then(resp=>{
                    if (resp.data.code === 20020) {
                        this.userInfo = resp.data.data.user
                        this.lastUserName=this.userInfo.userName
                    }
                })
            },
            updateUserInfo(){
                if (this.userInfo.userName === '') {
                    this.$message.error('用户名不能为空')
                    return
                }
                //检查数据
                //检查用户名是否重复
                if (this.lastUserName === this.userInfo.userName) {
                    this.doUpdateInfo()
                }else {
                    user.checkUserName(this.userInfo.userName).then(resp=>{
                        if (resp.data.code === 20000) {
                            this.doUpdateInfo()
                        }
                    })
                }
                //头像不可以为空
            },
            doUpdateInfo(){
                if (this.avatar === '') {
                    this.$message.error('头像不能为空')
                    return
                }
                userInfo.updateuserInfo(this.userInfo.id,this.userInfo).then(resp=>{
                    if (resp.data.code === 20000) {
                        this.getUserInfo()
                    }
                })
            },
            toUpdateEmailPage(){
                this.$router.push({
                    path:'/user/email'
                })

            }
        },
        mounted() {
            this.getUserInfo();
        }
    }
</script>

<style scoped>
    .user-info-avatar{
        display: inline-block;

    }
    .userInfo-box .el-input{
        width: 250px;
    }
    .updateEmail{
        margin-left: 20px;
    }
    .user-avatar-container{
        width: 100px;
        cursor: pointer;
    }

</style>
