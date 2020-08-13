<template>
<div class="category-box">

    <div class="category-ction-bar">
        <el-button type="primary" @click="showAddCategory">添加分类</el-button>


    </div>

    <div class="category-list-box">
        <el-table
                :data="categories"

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
    <div>
        <el-dialog :title="editTitle" :visible.sync="editorDialogShow" class="editor-box">
            <div class="category-editor-box">
                <el-form >
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
                <el-button type="danger"  @click="editorDialogShow = false">确 定</el-button>
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
                editorDialogShow:false,
                editTitle:'编辑分类',
                categories: [],
                deleteDialogShow:false,
                deleteMassage:'',
                deleteTargetId:'',
                category:{

                }

            }
        },
        methods:{
            edit(item){

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
                category.getCategories().then(resp=>{
                    this.categories= resp.data.data.categories
                    console.log(this.categories);

                })
            },
            showAddCategory(){
                this.editorDialogShow = true
            }
        },
        mounted() {
            //获取分类列表
            this.getCategories();
        }
    }
</script>

<style scoped>

</style>
