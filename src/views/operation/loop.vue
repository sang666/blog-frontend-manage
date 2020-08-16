<template>
<div class="loop-box" >
    <div class="loop-action-bar">
        <el-button type="primary" size="medium" @click="showAddloop" round>添加轮播图</el-button>
    </div>
    <div class="loop-list-box">

        <el-table
                :data="loopers"
                v-loading="loading"
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="id"
                    label="ID"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="标题"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="targetUrl"
                    label="链接地址"
                    width="150">
            </el-table-column>
            <el-table-column
                    label="图片"
            >
                <template slot-scope="scope">
                        <el-image
                                style="width: 100px; height: 100px"
                                :src="scope.row.imageUrl"
                        >
                        </el-image>
                   <!-- <img :src="scope.row.imageUrl" width="200px" height="100px">-->
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

    <div class="category-dialog">
        <el-dialog
                title="提示"
                :visible.sync="deleteDialogShow"
                width="400px">
            <span>你确定要删除{{deleteMassage}}这个分类吗</span>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="deleteDialogShow = false">取 消</el-button>
            <el-button type="danger" @click="doDeleteItem">确 定</el-button>
        </span>
        </el-dialog>

    </div>

    <div class="loop-dialog-box">

        <el-dialog :title="editTitle" :visible.sync="editorDialogShow"  >
            <div class="category-editor-box">
                <el-form label-width="80px">
                    <el-form-item label="标题" >
                        <el-input  v-model="looper.title"></el-input>
                    </el-form-item>
                    <el-form-item label="轮播图路径" >
                        <el-input  v-model="looper.imageUrl"></el-input>
                    </el-form-item>
                    <el-form-item label="点击链接" >
                        <el-input  v-model="looper.targetUrl"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog" type="primary">取 消</el-button>
                <el-button type="danger"
                           @click="postLoop">{{editorCommitText}}</el-button>
            </div>
        </el-dialog>

    </div>
</div>
</template>

<script>
    import loop from "../../api/loop";
    import category from "../../api/category";
    export default {
        name: "loop",
        data() {
            return {
                loading:false,
                loopers: [

                ],
                looper:{
                    imageUrl:'',
                    targetUrl:'',
                    title:'',
                    id:''
                },
                editorDialogShow:false,
                editorCommitText:'修改轮播图',
                editTitle:'编辑轮播图',
                categories: [],
                deleteDialogShow:false,
                deleteMassage:'',
                deleteTargetId:'',
                srcList:[]
            }
        },
        methods:{

            closeDialog(){
                this.resetLooper();
                this.editorDialogShow=false;
            },
            showAddloop(){
                this.editTitle = '添加轮播图'
                this.editorCommitText = '添加'

                this.editorDialogShow = true

            },
            edit(item){
                //最好的做法是请求单个数据，在显示
                this.looper.imageUrl = item.imageUrl
                this.looper.targetUrl = item.targetUrl
                this.looper.title = item.title
                this.looper.id = item.id
                this.editorDialogShow = true
                this.editorCommitText = '修改轮播图'
                this.editTitle = '编辑轮播图'

            },
            deleteItem(item){
                //不是马上删除，而是给出警告提示
                this.deleteDialogShow = true;
                this.deleteMassage = item.name;
                this.deleteTargetId = item.id
            },
            getLoopers(){
                this.loading = true
                loop.listLoop().then(resp=>{
                    this.loading = false
                    this.loopers = resp.data.data.loopers
                })
            },
            doDeleteItem(){
                loop.deleteLoop(this.deleteTargetId).then(resp=>{
                    this.getLoopers();
                })
                this.deleteDialogShow = false;
            },

            postLoop(){
                this.editorDialogShow = false;
                //检查内容，
                if (this.looper.title === '') {
                    this.showWarrning('轮播图标题不能为空');
                    return;
                }
                if (this.looper.imageUrl === '') {
                    this.showWarrning('轮播图链接不能为空');
                    return;
                }
                if (this.looper.targetUrl === '') {
                    this.showWarrning('转向链接不能为空');
                    return;
                }
                //如果有id的就是更新的，
                if (this.looper.id === '') {
                    // 提交数据
                    loop.addLoop(this.looper).then(resp=>{
                        if (resp.data.code === 20000) {
                            this.getLoopers()
                            this.resetLooper()
                        }

                    })
                }else {
                    loop.updateLoop(this.looper.id,this.looper).then(resp=>{
                        this.editorDialogShow = false;
                        if (resp.data.code===20000) {
                            this.getLoopers()
                            this.resetLooper()

                        }
                    })
                }
                // 如果没有id的就是添加的

                //提示结果
            },
            resetLooper(){
                this.looper.title=''
                this.looper.imageUrl=''
                this.looper.targetUrl=''
                this.looper.id=''
                this.looper.order=''
                this.looper.state=''
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
            this.getLoopers()
        }
    }
</script>

<style scoped>

</style>
