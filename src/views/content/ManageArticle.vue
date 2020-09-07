<template>
<div class="article-list-box">
    <div class="article-action-box">
        <!--发表文章，搜索-->
        <div>
            <el-form  :model="courseQuery" label-width="80px" :inline="true" ref="refname">
                <el-form-item label="标题" prop="name">
                    <el-input v-model="courseQuery.name" size="medium"></el-input >
                </el-form-item>

                <el-form-item label="标签" prop="labels">
                    <el-input v-model="courseQuery.labels" size="medium"></el-input>
                </el-form-item>

                <el-form-item label="状态" prop="state">
                    <el-select v-model="courseQuery.state" placeholder="选择文章状态" size="medium">
                        <el-option label="已删除的" value="1"></el-option>
                        <el-option label="已发布的" value="0"></el-option>
                        <el-option label="为草稿的" value="2"></el-option>
                        <el-option label="被置顶的" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="文章分类" prop="categoryId">
                    <el-select v-model="courseQuery.categoryId" placeholder="请选择" size="medium">
                        <el-option
                                v-for="item in categories"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="开始" prop="state" >
                        <el-date-picker
                                size="medium"
                                type="date" placeholder="开始日期" v-model="courseQuery.begin" style="width: 100%;"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd">
                        </el-date-picker>
                </el-form-item>
                <el-form-item label="结束" prop="end">
                        <el-date-picker
                                size="medium"
                                type="date" placeholder="终止日期" v-model="courseQuery.end" style="width: 100%;"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd">
                        </el-date-picker>
                </el-form-item>
                <el-form-item class="article-top-button">
                    <el-button type="primary" @click="listArticleS">查询</el-button>
                    <el-button type="primary" @click="resetForm('refname')">重置</el-button>
                </el-form-item>

            </el-form>
        </div>

    </div>

    <div class="article-list-part">
        <el-table
                :data="articles"
                v-loading="loading"

                style="width: 100%">
            <!--<el-table-column
                    fixed
                    prop="id"
                    label="ID"
                    width="200">
            </el-table-column>-->
            <el-table-column
                    fixed
                    label="标题"
                    width="120">
                <template slot-scope="scope">
                    <a :href="'http://localhost:3000/article/'+scope.row.id" target="_blank">
                        <span v-text="scope.row.title">

                        </span>
                    </a>
                </template>
            </el-table-column>
            <el-table-column
                    label="状态"
                    width="80">
                <template slot-scope="scope">
                    <div v-if="scope.row.state===1">
                        <el-tag type="danger" size="medium">已删除</el-tag>
                    </div>
                    <div v-if="scope.row.state===0">
                        <el-tag type="success" size="medium">已发布</el-tag>
                    </div>
                    <div v-if="scope.row.state===2">
                        <el-tag type="warning" size="medium">草稿</el-tag>
                    </div>
                    <div v-if="scope.row.state===3">
                        <el-tag type="" size="medium">置顶</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="viewCount"
                    label="游览量"
                    width="80"
            >
            </el-table-column>
            <el-table-column
                    prop="summary"
                    label="摘要"
            >
            </el-table-column>
            <el-table-column
                    label="标签"
                    >
                <template slot-scope="scope">

                        <el-tag
                                effect="plain"
                                type="success"
                                v-for="(item,index) in scope.row.labelList" :key="index">{{item}}
                        </el-tag>
                </template>
            </el-table-column>

            <el-table-column
                    prop="updateTime"
                    label="更新日期"
                    width="150">
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="操作"
                    width="300">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="primary" size="mini">编辑</el-button>
                    <el-button v-if="scope.row.state===1" @click="top(scope.row)" type="success" size="mini" disabled>置顶</el-button>
                    <el-button v-else-if="scope.row.state===3" @click="top(scope.row)" type="success" size="mini">取消置顶</el-button>
                    <el-button v-else @click="top(scope.row)" type="success" size="mini">置顶</el-button>
                    <el-button @click="deleteItem(scope.row)" v-if="scope.row.state !==1" type="danger" size="mini" >删除</el-button>
                    <el-button @click="deleteItem(scope.row)" v-if="scope.row.state ===1" type="danger" size="mini" disabled>删除</el-button>

                </template>
            </el-table-column>
        </el-table>
    </div>

    <div class="article-page-navigation">
        <el-pagination

                @current-change="onPageChange"
                :current-page="pageNavigation.current"
                :page-count="pageNavigation.pages"
                :page-size="pageNavigation.size"
                layout="total, prev, pager, next"
                :total="pageNavigation.total">
        </el-pagination>
    </div>

    <div class="article-dialog-part">
        <el-dialog
                title="提示"
                :visible.sync="deleteDialogShow"
                width="400px">
            <span>你确定要删除"{{deleteMassage}}"这个文章吗</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="deleteDialogShow = false">取 消</el-button>
                <el-button type="danger" @click="RealDeleteItem">真的删除</el-button>
                <el-button type="danger" @click="doDeleteItem">假装删除</el-button>
        </span>
        </el-dialog>
    </div>

</div>
</template>

<script>

    import category from "../../api/category";
    import articleApi from "../../api/articleApi";
    export default {
        name: "ManageArticle",
        data() {
            return {

                deleteDialogShow:false,
                deleteMassage:'',
                deleteTargetId:'',
                editorDialogShow:false,
                editorCommitText:'修改分类',
                editTitle:'编辑分类',
                loading: false,
                articles:[],
                article:{
                },
                courseQuery:{
                    categoryId:'',
                    begin:'',
                    end:'',
                    labels:'',
                    name:'',
                    state:''
                },
                categories:[],
                pageNavigation: {
                    current:1,
                    size:10,
                    total:1,
                },
                types:''

            }
        },
        methods: {
            doDeleteItem(){
                articleApi.deleteArticle(this.deleteTargetId).then(resp=>{
                    this.listArticleS();
                })
                this.deleteDialogShow = false;
            },
            RealDeleteItem(){
                articleApi.relDeleteArticle(this.deleteTargetId).then(resp=>{
                    this.listArticleS();
                })
                this.deleteDialogShow = false;
            },
            resetForm(refname) {
                this.courseQuery.end=''
                this.courseQuery.begin=''
                this.$refs[refname].resetFields();
                this.listArticleS()
            },
            edit(item){
                let articleId=item.id
                this.$router.push({
                    path:'/content/postArticle',
                    query:{
                        articleId:articleId
                    }
                });
            },
            deleteItem(item){
                //不是马上删除，而是给出警告提示
                this.deleteDialogShow = true;
                this.deleteMassage = item.title;
                this.deleteTargetId = item.id
            },
            listArticleS() {
                this.loading = true
                articleApi.getArticles(this.pageNavigation.current,this.pageNavigation.size,this.courseQuery.categoryId
                    ,this.courseQuery.begin,this.courseQuery.end
                    ,this.courseQuery.labels,this.courseQuery.name
                    ,this.courseQuery.state).then(resp=>{
                    if (resp.data.code === 20000) {
                        this.loading = false
                        this.pageNavigation = resp.data.data.rows
                        this.articles= resp.data.data.rows.records
                    }
                })
            },

            onPageChange(page){
                this.pageNavigation.current = page
                this.listArticleS()
            },
            listCategories(){
                category.getCategories().then(resp=>{
                    if (resp.data.code === 20000) {
                        this.categories=resp.data.data.categories
                    }
                })
            },
            top(item){
                articleApi.topArticle(item.id).then(resp=>{
                    if (resp.data.code === 20000) {
                        this.listArticleS()
                    }
                })

            }

        },
        mounted() {
            this.listArticleS()
            this.listCategories()

        },

    }
</script>

<style >
    .article-top-button{
        margin-left: 80px;
    }

    .article-list-part .el-tag--success {

        margin-right: 10px;
        margin-bottom: 5px;
    }

</style>
