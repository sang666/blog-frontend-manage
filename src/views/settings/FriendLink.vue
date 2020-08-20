<template>
    <div class="settings-friend-link-box">
        <div class="friend-link-action-box">
            <el-button type="primary" @click="showPostLink">添加友情链接</el-button>
        </div>

        <div class="friend-link-list-box">
            <el-table
                    :data="friendLinks"
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="id"
                        label="ID"
                        >
                </el-table-column>

                <el-table-column
                        prop="url"
                        label="链接地址"
                        >
                    <template slot-scope="scope">
                        <a class="link-title" :href="scope.row.url">{{scope.row.name}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                        label="logo"
                >
                    <template slot-scope="scope">
                        <el-image
                                style="width: 200px; height: 74px"
                                :src="scope.row.logo"
                        >
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="创建日期"
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
                        <el-button @click="edit(scope.row)" type="primary" size="mini">编辑</el-button>
                        <el-button @click="deleteItem(scope.row)" type="danger" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="friend-link-dialog">
            <el-dialog @close="closeDialog" :title="editTitle" :visible.sync="editorDialogShow"  >
                <div class="category-editor-box">
                    <el-form label-width="80px">
                        <el-form-item label="网站链接" >
                            <el-input  v-model="friendLink.url" @input="change($event)" ></el-input>
                        </el-form-item>
                        <el-form-item label="网站名称" >
                            <el-input  v-model="friendLink.name" @input="change($event)"></el-input>
                        </el-form-item>
                        <el-form-item label="网站logo" >
                            <div class="image-upload" @click="showLinkDiolag">
                                <i class="el-icon-plus" v-if="friendLink.logo===''"></i>
                                <el-image v-else :src="friendLink.logo"></el-image>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeDialog" type="primary">取 消</el-button>
                    <el-button type="danger"
                               @click="postLink">{{editorCommitText}}</el-button>
                </div>
            </el-dialog>
        </div>

        <div class="link-delete-dialog">
            <el-dialog
                    title="提示"
                    :visible.sync="deleteDialogShow"
                    width="400px">
                <span>你确定要删除'{{deleteMassage}}'这个友情链接吗</span>
                <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="deleteDialogShow = false">取 消</el-button>
            <el-button type="danger" @click="doDeleteItem">确 定</el-button>
        </span>
            </el-dialog>

        </div>

        <div class="logo-info-dialog">

            <avatar-upload field="file"
                           @crop-upload-success="cropUploadSuccess"
                           @crop-upload-fail="cropUploadFail"
                           v-model="showAvatorCutter"
                           :width="200"
                           :height="74"
                           url="/api/biz/images/upload/link"
                           img-format="png">

            </avatar-upload>

        </div>
    </div>
</template>

<script>
    import avatarUpload from 'vue-image-crop-upload/upload-2.vue';

    import friendLink from "../../api/friendLink";
    import loop from "../../api/loop";
    export default {
        name: "FriendLink",
        components:{
            'avatar-upload' :avatarUpload
        },
        data() {
            return {
                friendLinks: [],
                friendLink:{

                },
                showAvatorCutter:false,
                editorDialogShow:false,
                editorCommitText:'修改友情链接',
                editTitle:'编辑友情链接',
                deleteDialogShow:false,
                deleteMassage:'',
                deleteTargetId:'',
            }
        },
        methods: {
            change(e){
                this.$forceUpdate()
            },
            cropUploadSuccess(resp,field){
                //this.showAvatorCutter = false
                if (resp.code === 20000) {
                    console.log(field);
                    this.friendLink.logo = 'https://'+resp.data.result.name
                }
                //console.log(this.userInfo.avatar);

            },
            cropUploadFail(){
                this.$message.error('logo上传失败')
            },
            doDeleteItem(){
                friendLink.deleteFriendLink(this.deleteTargetId).then(resp=>{
                    this.ListLinks();
                })
                this.deleteDialogShow = false;

            },
            showLinkDiolag(){
                this.showAvatorCutter=true
            },
            showWarrning(msg){
                this.$message({
                    message:msg,
                    type:'warning',
                    center:true
                })
            },
            reset(){
                this.friendLink.id=''
                this.friendLink.name=''
                this.friendLink.url=''
                this.friendLink.logo=''

            },
            closeDialog(){
                this.reset()
                this.editorDialogShow=false;

            },
            showPostLink(){
                this.editTitle = '添加友情链接'
                this.editorCommitText = '添加'

                this.editorDialogShow = true
            },
            postLink(){
                if (this.friendLink.name === '') {
                    this.$message.error('网站名称不能为空')
                    return
                }
                if (this.friendLink.url === '') {
                    this.$message.error('友情链接不能为空')
                    return
                }
                if (this.friendLink.url === '') {
                    this.$message.error('url不能为空')
                    return
                }
                //判断是更新还是添加
                //有id是更新
                if (this.friendLink.id !== '') {
                    friendLink.updateUpdateFriendLink(this.friendLink.id,this.friendLink).then(resp=>{
                        this.editorDialogShow=false
                        if (resp.data.code === 20000) {
                            this.ListLinks()
                            this.reset()
                        }
                    })

                }else{
                    //提交数据
                    friendLink.postFriendLink(this.friendLink).then(resp=>{
                        this.editorDialogShow=false
                        if (resp.data.code === 20000) {
                            this.ListLinks()
                            this.reset()
                        }
                    })
                }


            },
            ListLinks() {
                friendLink.getLinkList().then(resp=>{
                    if (resp.data.code === 20000) {
                        this.friendLinks=resp.data.data.item
                    }
                })

            },
            edit(item){
                //最好的做法是请求单个数据，在显示
                this.friendLink.url = item.url
                this.friendLink.logo = item.logo
                this.friendLink.name = item.name
                this.friendLink.id = item.id
                this.editorDialogShow = true
                this.editorCommitText = '修改友情链接'
                this.editTitle = '编辑友情链接'

            },
            deleteItem(item){
                //不是马上删除，而是给出警告提示
                this.deleteDialogShow = true;
                this.deleteMassage = item.name;
                this.deleteTargetId = item.id

            }
        },
        mounted() {
            this.ListLinks()

        }
    }
</script>

<style scoped>
    .image-upload{
        width: 100px;
        height: 37px;
        border: #dfdfdf dashed 1px;
        text-align: center;
        cursor: pointer;
    }
    .link-title{
        text-decoration: none;
    }
</style>
