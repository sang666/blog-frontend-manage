<template>
    <div class="article-post-box">
        <!--文章发表-->
        <!--标题-->
        <div class="article-title-port" >
            <el-input v-model="article.title" placeholder="文章标题(8-64个字符)"
                      maxlength="64"
                      minlenth="8"
                      show-word-limit
                      style=""

            ></el-input>

        </div>
        <!--内容编辑-->
        <div class="article-post-part margin-bottom-20">
            <mavon-editor

                    @onImageClick="onEditorImageClick"
                    ref="emEditor"
                    @change="onContentChange"
                    v-model="article.content"/>

        </div>
        <!--文章设置-->
        <div class="article-post-settings-part">
            <el-form  label-width="100px" >
                <el-form-item label="文章分类" required>
                    <el-select v-model="article.categoryId" placeholder="请选择" size="medium">
                        <el-option
                                v-for="item in categories"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="摘要" required>
                    <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入内容"
                            v-model="article.summary">
                    </el-input>
                </el-form-item>
                <el-form-item label="封面" required>
                    <div class="article-cover-selector" @click="showImageSelector">
                        <i class="el-icon-plus" v-if="article.cover===''||article.cover===null"></i>
                        <el-image  fit="cover" v-else :src="article.cover"></el-image>
                    </div>
                </el-form-item>
                <el-form-item label="标签"  class="label-input-box" required>
                    <el-tag
                            :key="tag"
                            v-for="tag in labelList"
                            closable
                            :disable-transitions="false"
                            @close="deleteLabel(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="labelNewValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-if="!inputVisible&&!isEnough" class="button-new-tag" size="small" @click="showLabelInput">+ 添加标签</el-button>
                </el-form-item>
            </el-form>

        </div>
        <!--发布/草稿/预览的按钮-->
        <div class="article-post-action-bar clearfix">
            <div class="action-btn-container">
                <el-button plain @click="preView">全屏预览</el-button>
                <el-button v-if="!disableDraftbtn" plain @click="saveArticleDraft">保存草稿</el-button>
                <el-button plain @click="saveArticleDraft" v-else disabled>保存草稿</el-button>
                <el-button plain type="primary" @click="commitArticle">{{commitText}}</el-button>
            </div>

        </div>

        <div class="article-post-dialog-box">
            <el-dialog
                    title="图片选择"
                    :visible.sync="isImageSelectorShow"
                    width="500"

            >
                <div class="image-selector-box">
                    <div class="image-action-bar">
                            <el-upload class="image-selector-uploader"
                                       action="/biz/images/upload/article"
                                       :show-file-list="false"
                                       :on-success="uploadSuccess"
                                       :on-error="onUploadError"
                                       accept="image/*"
                            >
                                <el-button size="medium">上传图片</el-button>
                            </el-upload>

                    </div>
                    <div class="image-selector-list">
                        <el-radio-group v-model="selectedImageIndex">
                            <el-radio-button :label="index" v-for="(item,index) in images" :key="index">
                                <el-image :src="item.url" style="width: 160px;height: 150px;float: left;">
                                </el-image>
                            </el-radio-button>
                        </el-radio-group>

                    </div>

                    <div class="image-picker-navigation">
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

                <span slot="footer" class="dialog-footer">
                        <el-button @click="isImageSelectorShow = false" size="medium">取 消</el-button>
                        <el-button type="primary" @click="onImageSelected" size="medium">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import articleApi from "../../api/articleApi";
    import editor from '../../../lib/mavon-editor/mavon-editor'
    import '../../../lib/mavon-editor/css/index.css'
    import Vue from 'vue'
    Vue.use(editor)
    import category from "../../api/category";
    import image from "../../api/image";
    export default {
        name: "PostArticle",
        data() {
            return {
                imageSelectFor:'article',
                isImageSelectorShow:false,
                isEnough:false,
                inputVisible:false,
                article: {
                    content:'',
                    categoryId:'',
                    title:'',
                    summary:'',
                    cover:'',
                    labels:'',
                    state:0,
                    type:'1',
                    id:''
                },
                images:[],
                labelNewValue:'',
                labelList:[],
                categories:[],
                articles:[],
                selectedImageIndex:0,
                pageNavigation:{
                    current:1,
                    size:10,
                    total:1,
                },
                commitText:'发表文章',
                disableDraftbtn:false

            }
        },
        methods: {

            preView(){
              this.$refs.emEditor.toolbar_right_click('read')
            },
            saveArticleDraft(){
                if (this.article.title === '') {
                    this.showWarrning('标题不能为空')
                    return
                }
                let temLabels='';
                //先处理一下标签

                this.labelList.forEach((item,index)=>{
                    temLabels+=item;
                    if (index !== this.labelList.length - 1) {
                        temLabels+='-';
                    }
                })
                this.article.labels = temLabels;
                //修改状态
                this.article.state =2;
                //提交数据
                articleApi.postArticle(this.article).then(resp=>{
                    if (resp.data.code === 20000) {
                        window.onbeforeunload = null;
                        //跳转到文章列表页面
                        this.$router.push({
                            path:'/content/ManageArticle'
                        })
                    }
                })
            },
            showWarrning(msg){
                this.$message({
                    message:msg,
                    type:'warning',
                    center:true
                })
            },
            commitArticle(){

                //检查内容：标题，内容，分类，摘要，封面，标签
                if (this.article.title === '') {
                    this.showWarrning('标题不能为空')
                    return
                }
                if (this.article.content === '') {
                    this.showWarrning('内容不能为空')
                    return
                }
                if (this.article.categoryId === '') {
                    this.showWarrning('分类不能为空')
                    return
                }
                if (this.article.summary === '') {
                    this.showWarrning('不能为空')
                    return
                }
                if (this.article.cover === '') {
                    this.showWarrning('请设置文章封面')
                    return
                }
                if (this.labelList.length === 0) {
                    this.showWarrning('请设置标签，方便搜索')
                    return
                }

                let temLabels='';
                //先处理一下标签

                this.labelList.forEach((item,index)=>{
                      temLabels+=item;
                    if (index !== this.labelList.length - 1) {
                        temLabels+='-';
                    }
                })
                this.article.labels = temLabels;
                //提交数据
                //判断article的id是否存在，如果有就是更新，否则就是发布
                if (this.article.id==='') {
                    //console.log(this.article);
                    if (this.article.state === '3') {
                    }else if (this.article.state === '2'){
                        this.article.state='0'
                    }else if (this.article.state === '1'){
                        this.article.state='0'
                    }
                    articleApi.postArticle(this.article).then(resp=>{
                        if (resp.data.code === 20000) {
                            window.onbeforeunload = null;
                            //跳转到文章列表页面
                            this.$router.push({
                                path:'/content/ManageArticle'
                            })
                        }
                    })
                }else {
                    //更新文章
                    this.article.state='0'
                    articleApi.updateArticle(this.article.id,this.article).then(resp=>{
                        if (resp.data.code === 20000) {
                            //跳转到文章列表页面
                            this.$router.push({
                                path:'/content/ManageArticle'
                            })
                        }
                    })
                }

            },
            onEditorImageClick(){
              //this.$message.success('编辑器图片点击了...')
                this.imageSelectFor = 'article'
                this.isImageSelectorShow = true
            },
            onPageChange(page){
                this.pageNavigation.current = page
                this.listImages()
            },
            onUploadError(){
              this.$message.error('图片上传失败')
            },
            uploadSuccess(response){
                if (response.code === 20000) {
                    this.$message.success(response.message)
                    //更新列表
                    this.listImages()
                }
            },
            showLabelInput(){
                //判断个数
                if (this.labelList.length < 5) {
                    this.inputVisible=true
                }else {
                    this.inputVisible=false
                }

            },
            handleInputConfirm(){
                //回车的时候
                if (this.labelList.length < 5) {
                    this.labelList.push(this.labelNewValue)
                    this.labelNewValue=''
                }
                if (this.labelList.length >= 5) {
                    this.inputVisible = false
                    this.isEnough = true
                }

            },
            name() {
            },
            deleteLabel(label){
                //从数组里删除
                this.labelList.splice(this.labelList.indexOf(label),1)
                if (this.labelList.length < 5) {
                    this.isEnough = false
                    this.inputVisible = true
                }
                //todo:处理显示输入框
            },
            listCategories(){
                category.getCategories().then(resp=>{
                    if (resp.data.code === 20000) {
                        this.categories=resp.data.data.categories
                    }
                })
            },
            onContentChange(value,render){

            },
            showImageSelector(){
                this.imageSelectFor='cover'
                //显示图片选择器
                this.isImageSelectorShow = true

            },
            onImageSelected(){
                //判断当前的操作是给谁选择的
                //如果是文章则插入到文章
                //如果是封面则作为封面
                let item = this.images[this.selectedImageIndex]
                if (this.imageSelectFor==='article') {
                    this.$refs.emEditor.toolbar_left_addlink('no-link',item.name,item.url)
                }else if(this.imageSelectFor==='cover') {
                    //从数组里面拿到档期那选中的对象
                    //console.log(item);
                    this.article.cover = item.url;
                }
                this.isImageSelectorShow = false

            },
            listImages(){
              image.getImageList(this.pageNavigation.current,this.pageNavigation.size,'article').then(resp=>{
                  if (resp.data.code === 20000) {
                      this.images = resp.data.data.page.records
                      this.pageNavigation = resp.data.data.page
                  }
              })
            },
            getArticleDetail(articleId){
                articleApi.ArticleDetail(articleId).then(resp=>{
                    if (resp.data.code === 20000) {
                        this.article.id=resp.data.data.article.id
                        this.article.type=resp.data.data.article.type
                        this.article.state=resp.data.data.article.state
                        this.article.labels=resp.data.data.article.labels
                        this.article.cover=resp.data.data.article.cover
                        this.article.summary=resp.data.data.article.summary
                        this.article.categoryId=resp.data.data.article.categoryId
                        this.article.title=resp.data.data.article.title
                        this.article.content=resp.data.data.article.content
                        this.labelList = resp.data.data.article.labelList
                        //如果当前文章的状态是草稿，按钮显示发表文章
                        //如果已经发布了，发布，置顶按钮显示更新
                        if (this.article.state === 2) {
                            this.commitText = '发表文章'
                            this.disableDraftbtn = false
                        }else {
                            this.commitText = '更新文章'
                            //草稿这个按钮就不能用了
                            this.disableDraftbtn = true
                        }
                    }
                })
            },
            open() {
                this.$confirm('系统可能不会保存填写的信息噢~(￣▽￣)~*', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '返回!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消返回'
                    });
                });
            }

        },
        beforeDestroy() {
          window.onbeforeunload = null;
        },
        mounted() {

            window.onbeforeunload = function(){

                return '系统可能不会保存填写的信息噢~(￣▽￣)~*'
            };
            //是否要获取文章详情
            let articleId = this.$route.query.articleId
            if (articleId) {
                //获取文章详情
                this.getArticleDetail(articleId)

            }
            //获取文章分类
            this.listCategories()
            this.listImages()

        },
        /*beforeRouteLeave(to,from,next){
            //做一个弹窗，如果确定才跳转
        }*/
    }
</script>

<style >



    .input-new-tag .el-input__inner{
        width: 100px;
    }
    .label-input-box .el-tag{
        margin-right: 20px;
    }
    .article-post-settings-part .el-textarea{
        width: 400px;
    }
    .article-post-part .markdown-body{
        height: 800px;
        box-shadow: none !important;
    }
    .action-btn-container{
        float: right;
        margin-right: 50px;
        padding: 10px;
    }
    .article-post-part{

        background: #42b983;
    }
    .article-post-part .v-note-op{
        background: #42b983;
        position: sticky;
        top: 0;
    }

    .article-post-settings-part{
        margin-bottom: 60px;
        margin-right: 50px;
        padding: 10px;
    }
    .article-cover-selector{
        cursor: pointer;
        width: 200px;
        height: 160px;
        border: #dcdfe6 dashed 1px;
        border-radius: 4px;
        text-align: center;
    }
    .article-cover-selector i{
        font-size: 20px;
        line-height: 140px;
        color: #dcdfe6;
    }
    .article-post-action-bar {
        width: 100%;
        position: fixed;
        bottom: 0;
        margin-left: -220px;

    }
    .article-title-port .el-input{
        border: none;
        padding-left: 10px;
        margin-bottom: 20px;
        font-size: 20px;
    }

    .image-selector-box{
    }

    .image-selector-list .el-radio-button__inner,.el-radio-button:first-child .el-radio-button__inner{
        border: none;
        border-radius: 4px;
        padding: 3px;
        margin: 5px;

    }
    .image-action-bar{
        margin-bottom: 20px;
    }

    .article-post-dialog-box .el-dialog__header {
        display: none;
    }
    .image-picker-navigation{
        margin-top: 20px;
    }
    .article-cover-selector img{
        width: 200px;
        height: 140px;

    }
    .article-title-port .el-input__inner{
        border: none;
    }




</style>
