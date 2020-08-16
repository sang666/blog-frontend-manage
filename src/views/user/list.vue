<template>
    <div class="user-list-box">
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

    </div>

</template>

<script>
    import user from "../../api/user";
    export default {
        name: "list",
        data() {
            return {
                userInfo:{

                },
                userInfos:[],
                pageNavigation: {
                    current:1,
                    limit:5,
                    total:1,
                    pages:1

                }
            }
        },
        methods:{
            resetPassword(){


            },
            errorHandler() {
                return true
            },
            listUser(){
                user.listUser(this.pageNavigation.current,this.pageNavigation.limit).then(resp=>{
                    this.userInfos =  resp.data.data.rows.records
                    console.log(resp.data.data.rows.records);
                })
            }

        },
        mounted() {
            this.listUser(this.pageNavigation.current,this.pageNavigation.limit);
        }
    }
</script>

<style scoped>

</style>
