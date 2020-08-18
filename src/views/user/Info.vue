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
                    <el-avatar :src="userInfo.avatar"></el-avatar>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="updateUserInfo">修改</el-button>
                </el-form-item>
            </el-form>

        </div>

        <div class="user-info-dialog">

            <avatar-upload field="img"
                       @crop-success="cropSuccess"
                       @crop-upload-success="cropUploadSuccess"
                       @crop-upload-fail="cropUploadFail"
                       v-model="show"
                       :width="300"
                       :height="300"
                       url="/upload"
                       :params="params"
                       :headers="headers"
                       img-format="png">

            </avatar-upload>

        </div>


    </div>

</template>

<script>
    import userInfo from "../../api/userInfo";
    import avatarUpload from 'vue-image-crop-upload/upload-2.vue';

    export default {
        components:{
          'avatar-upload' :avatarUpload
        },
        name: "Info",
        data() {
            return {
                userId: '',
                userInfo:{

                }
            }
        },
        methods: {
            getUserInfo() {
                userInfo.checkRole().then(resp=>{
                    if (resp.data.code === 20020) {
                        this.userInfo = resp.data.data.user
                    }
                })
            },
            updateUserInfo(){

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
        cursor: pointer;
    }
    .userInfo-box .el-input{
        width: 250px;
    }
    .updateEmail{
        margin-left: 20px;
    }

</style>
