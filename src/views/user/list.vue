<template>
    <div class="user-list-box">
        <div class="user-search-pat">
            <el-form :inline="true" >
                <el-form-item label="用户名">
                    <el-input v-model="search.userName" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="email">
                    <el-input v-model="search.email" placeholder="email"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchUserInfo">查询</el-button>
                    <el-button type="danger" @click="searchReset">清空</el-button>

                </el-form-item>
            </el-form>
        </div>
        <div class="list-box">
            <el-table
                    :data="userInfos"
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="id"
                        label="ID"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="用户名称"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="roles"
                        label="权限"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="avatar"
                        label="头像"
                >
                    <template slot-scope="scope">
                        <el-avatar :size="60" src="https://empty" @error="errorHandler">
                            <img :src="scope.row.avatar"/>
                        </el-avatar>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱"
                        width="150">
                </el-table-column>

                <el-table-column
                        prop="sign"
                        label="签名"
                        width="150">
                </el-table-column>

                <el-table-column
                        prop="updateTime"
                        label="更新日期"
                        width="150">
                </el-table-column>

                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button @click="resetPassword(scope.row)" type="primary" size="mini">重置密码</el-button>
                        <el-button @click="deleteItem(scope.row)" type="danger" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="category-dialog">
            <el-dialog
                    title="提示"
                    :visible.sync="deleteDialogShow"
                    width="400px">
                <span>你确定要删除{{deleteMassage}}这个用户吗</span>
                <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="deleteDialogShow = false">取 消</el-button>
            <el-button type="danger" @click="doDeleteItem">确 定</el-button>
        </span>
            </el-dialog>

        </div>

        <div class="category-dialog">
            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    title="密码重置"
                    :visible.sync="resetPasswordShow"
                    width="400px">
                <div class="reset_password-box">
                    <div class="reset-tips-text">修改用户:{{targetResetUserName}}的密码</div>
                    <el-form label-width="100px" >
                        <el-form-item label="新密码" prop="pass">
                            <el-input type="password" v-model="resetPasswordValue" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="resetPasswordShow = false">取 消</el-button>
            <el-button type="danger" @click="doResetPassword">确 定</el-button>
        </span>
            </el-dialog>

        </div>

        <div class="page-navigation-box">
            <div class="block">
                <el-pagination

                        @current-change="onPageChange"
                        :current-page="pageNavigation.current"
                        :page-count="pageNavigation.pages"
                        :page-size="pageNavigation.size"
                        layout="total, prev, pager, next"
                        :total="pageNavigation.total">
                </el-pagination>
            </div>

        </div>

    </div>


</template>

<script>
    import {hex_md5} from "../../utils/md5";
    import user from "../../api/user";
    import category from "../../api/category";
    export default {
        name: "list",
        data() {
            return {
                targetResetUserId:'',
                targetResetUserName:'',
                resetPasswordValue:'',
                resetPasswordShow:false,
                loading:false,
                editorDialogShow:false,
                editorCommitText:'修改分类',
                editTitle:'编辑分类',
                deleteDialogShow:false,
                deleteMassage:'',
                deleteTargetId:'',
                search:{
                  userName:'',
                  email:''
                },
                userInfo:{

                },
                userInfos:[],
                pageNavigation: {
                    current:1,
                    size:10,
                    total:1,
                }
            }
        },
        methods:{
            doResetPassword(){
                //检查密码不为空
                if (this.resetPasswordValue === '') {
                    this.showWarrning('密码不能为空')
                    return;
                }
                user.resetPasswrod(this.targetResetUserId,hex_md5(this.resetPasswordValue)).then(resp=>{
                    this.resetPasswordShow = false
                })

            },
            deleteItem(item){
                //不是马上删除，而是给出警告提示
                this.deleteDialogShow = true;
                this.deleteMassage = item.userName;
                this.deleteTargetId = item.id
            },
            doDeleteItem(){
                //删除用户
                user.deleteUser(this.deleteTargetId).then(resp=>{
                    this.listUser()
                })
                this.deleteDialogShow = false;
            },
            onPageChange(page){
                this.pageNavigation.current = page
                this.listUser()
            },
            searchReset(){
                this.search.email=''
                this.search.userName=''
                this.listUser()
            },
            searchUserInfo(){
                user.searchListUser(this.search.userName,this.search.email).then(resp=>{
                    this.userInfos =  resp.data.data.rows.records
                    console.log(resp.data.data.rows.records);
                })
            },
            resetPassword(item){
                this.resetPasswordShow =true;
                this.targetResetUserName = item.userName
                this.targetResetUserId = item.id
            },
            errorHandler() {
                return true
            },
            listUser(){
                user.listUser(this.pageNavigation.current,this.pageNavigation.size).then(resp=>{
                    this.pageNavigation = resp.data.data.rows
                    this.userInfos =  resp.data.data.rows.records
                    console.log(resp.data.data.rows.records);
                })
            },
            showWarrning(msg){
                this.$message({
                    message:msg,
                    type:'warning',
                    center:true
                })
            },
        },
        mounted() {
            this.listUser(this.pageNavigation.current,this.pageNavigation.limit);
        }
    }
</script>

<style scoped>

    .page-navigation-box{
        margin:0 auto;width:400px;height:100px;
        margin-top: 40px;
    }
    .reset-tips-text{
        margin-left: 45px;
        margin-bottom: 15px;


    }

</style>
