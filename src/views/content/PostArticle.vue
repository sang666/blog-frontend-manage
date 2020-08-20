<template>
    <div class="article-post-box">
        <!--文章发表-->
        <!--标题-->
        <div class="article-title-port">
            <el-input v-model="article.title"></el-input>

        </div>
        <!--内容编辑-->
        <div class="article-post-part">
            <mavon-editor v-model="article.content"/>

        </div>
        <!--文章设置-->
        <div class="article-post-settings-part">

        </div>
        <!--发布/草稿/预览的按钮-->
        <div class="article-post-action-bar">
            <div class="action-btn-container">
                <el-button plain>全屏预览</el-button>
                <el-button plain>保存草稿</el-button>
                <el-button plain>发表文章</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PostArticle",
        data() {
            return {
                article: {
                    content:'',

                },
                articles:[],

            }
        },
        methods: {
            name() {

            }

        },
        mounted() {

        }
    }
</script>

<style scoped>
    .article-post-part .markdown-body{
        height: 800px;
    }
    .action-btn-container{
        float: right;
        margin-right: 50px;
        padding: 10px;
    }
    .article-post-part{

        background: #42b983;
    }
    .article-post-settings-part{
        background: #afafaf;
        margin-right: 50px;
        padding: 10px;
    }
</style>
