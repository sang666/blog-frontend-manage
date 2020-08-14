<template>
<div class="category-box">

    <div class="category-ction-bar">
        <el-button type="primary" @click="showAddCategory">添加分类</el-button>


    </div>

    <div class="category-list-box">
        <el-table
                :data="categories"
                v-loading="loading"

                style="width: 100%">
            <el-table-column
                    fixed
                    prop="id"
                    label="ID"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="分类名称"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="pinyin"
                    label="拼音"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="描述"
                    >
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

    <!--添加/编辑分类的-->
    <div class="editor-box">
        <el-dialog :title="editTitle" :visible.sync="editorDialogShow"  >
            <div class="category-editor-box">
                <el-form label-width="80px">
                    <el-form-item label="分类名称" >
                        <el-input  v-model="category.name"></el-input>
                    </el-form-item>
                    <el-form-item label="拼音" >
                        <el-input  v-model="category.pinyin"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" >
                        <el-input  v-model="category.description"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="editorDialogShow = false" type="primary">取 消</el-button>
                <el-button type="danger"
                @click="postCategory">{{editorCommitText}}</el-button>
            </div>
        </el-dialog>

    </div>

</div>
</template>

<script>
    import category from "../../api/category";
    export default {
        name: "ManageCategory",
        data() {
            return {
                loading:false,
                editorDialogShow:false,
                editorCommitText:'修改分类',
                editTitle:'编辑分类',
                categories: [],
                deleteDialogShow:false,
                deleteMassage:'',
                deleteTargetId:'',
                category:{

                    name:'',
                    description:'',
                    pinyin:'',
                    id:'',

                }

            }
        },
        methods:{
            edit(item){
                //最好的做法是请求单个数据，在显示
                this.category.name = item.name
                this.category.description = item.description
                this.category.pinyin = item.pinyin
                this.category.id = item.id
                this.editorDialogShow = true
                this.editorCommitText = '修改分类'
                this.editTitle = '编辑分类'

            },
            deleteItem(item){
                //不是马上删除，而是给出警告提示
                this.deleteDialogShow = true;
                this.deleteMassage = item.name;
                this.deleteTargetId = item.id
            },
            doDeleteItem(){
                category.deleteCategory(this.deleteTargetId).then(resp=>{
                    this.getCategories();
                })
                this.deleteDialogShow = false;
            },
            getCategories(){
                this.loading = true
                category.getCategories().then(resp=>{
                    this.loading = false
                    this.categories= resp.data.data.categories
                    console.log(this.categories);

                })
            },
            showAddCategory(){
                this.editTitle = '添加分类'
                this.editorCommitText = '添加'

                this.editorDialogShow = true
            },
            postCategory(){
                this.editorDialogShow = false;
                //检查内容，
                if (this.category.name === '') {
                    this.showWarrning('分类名称不能为空');
                    return;
                }
                if (this.category.description === '') {
                    this.showWarrning('分类描述不能为空');
                    return;
                }
                if (this.category.pinyin === '') {
                    this.showWarrning('分类拼音不能为空');
                    return;
                }
                //如果有id的就是更新的，
                if (this.category.id === '') {
                    // 提交数据
                    category.addCategory(this.category).then(resp=>{
                        if (resp.data.code === 20000) {
                            this.getCategories()
                            this.resetCategory()
                        }

                    })
                }else {
                    category.updateCategory(this.category.id,this.category).then(resp=>{
                        this.editorDialogShow = false;
                        if (resp.data.code===20000) {
                            this.getCategories()
                            this.resetCategory()

                        }
                    })
                }
                // 如果没有id的就是添加的

                //提示结果
            },

            showWarrning(msg){
                this.$message({
                    message:msg,
                    type:'warning',
                    center:true
                })
            },
            resetCategory(){
                this.category.name=''
                this.category.description=''
                this.category.pinyin=''
                this.category.id=''
                this.category.order=''
                this.category.status=''
            },

        },
        mounted() {
            //获取分类列表
            this.getCategories(this.category.id,this.category);

        }
    }
</script>

<style scoped>

</style>
