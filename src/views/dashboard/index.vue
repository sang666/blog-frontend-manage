<template>
<div class="dashboard-box">
    <div class="web-size-info-box">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="web-info-content">
                    <div class="web-info-title">访问总量：</div>
                    <div class="web-info-number">{{websiteCount}}</div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="web-info-content">
                    <div class="web-info-title">注册用户：</div>
                    <div class="web-info-number">{{UserCount}}</div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="web-info-content">
                    <div class="web-info-title">文章总量：</div>
                    <div class="web-info-number">{{articleCount}}</div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="web-info-content">
                    <div class="web-info-title">评论总量：</div>
                    <div class="web-info-number">{{commentCount}}</div>
                </div>
            </el-col>

        </el-row>

    </div>
    <div class="dashboard-bottom-part">
        <el-row :gutter="20">

            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="dashboard-box-card-title">快捷操作</span>
                        </div>
                        <div  class="fast-way-list">
                            <div class="fast-way-item">
                                <router-link class="el-icon-edit" to="/content/postArticle">写文章</router-link>
                            </div>
                            <div class="fast-way-item">
                                <router-link class="el-icon-edit" to="/settings/web-site-info">修改网站消息</router-link>
                            </div>
                            <div class="fast-way-item">
                                <router-link class="el-icon-edit" to="/settings/friend-link">添加友情链接</router-link>
                            </div>
                            <div class="fast-way-item">
                                <router-link class="el-icon-edit" to="/content/ManageArticle">文章管理</router-link>
                            </div>
                            <div class="fast-way-item">
                                <router-link class="el-icon-edit" to="/operation/loop">轮播图管理</router-link>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-col>


            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="dashboard-box-card-title">最新评论</span>
                            <el-button style="float: right; padding: 3px 0" type="text" @click="detil">
                                更多
                            </el-button>
                        </div>
                        <div  class="last-comment">
                            <el-table
                                    :data="comments"
                                    style="width: 100%">

                                <el-table-column
                                        label="评论内容"
                                >
                                    <template slot-scope="scope">
                                        <a href="#">{{scope.row.content}}</a>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        label="用户"
                                        width="200">
                                    <template slot-scope="scope">
                                        <a href="#" class="user-info-avatar clearfix">
                                            <el-avatar :src="scope.row.userAvatar"></el-avatar>
                                            <span class="comment-user-name">{{scope.row.userName}}</span>
                                        </a>
                                    </template>
                                </el-table-column>

                            </el-table>
                        </div>
                    </el-card>
                </div>
            </el-col>


        </el-row>


    </div>
</div>
</template>

<script>
    import websiteInfo from "../../api/websiteInfo";
    import articleApi from "../../api/articleApi";
    import comment from "../../api/comment";
    export default {
        name: "index",
        data() {
            return {

                articleCount:0,
                commentCount:0,
                UserCount:0,
                websiteCount:0,
                comments:[]
            }
        },
        methods: {
            detil(){
              this.$router.push({
                  path:'/content/ManageComment'
              })
            },
            getArticleCount() {
                articleApi.getArticleCount().then(resp=>{
                    if (resp.data.code === 20000) {
                        this.articleCount = resp.data.data.count
                    }
                })
            },
            getUserCount() {
                websiteInfo.getUserCount().then(resp=>{
                    if (resp.data.code === 20000) {
                        this.UserCount = resp.data.data.count
                    }
                })
            },
            getCommentCount() {
                comment.getCommentCount().then(resp=>{
                    if (resp.data.code === 20000) {
                        this.commentCount = resp.data.data.count
                    }
                })
            },
            getWebSiteCount() {
                websiteInfo.getWebsiteCount().then(resp=>{
                    if (resp.data.code === 20000) {
                        this.websiteCount = resp.data.data.result.web_site_view_count
                    }
                })
            },
            commentList() {
                comment.getCommentList(1,10).then(resp=>{
                    if (resp.data.code === 20000) {
                        this.comments=resp.data.data.page.records;

                    }
                })
            },
        },
        mounted() {
            this.getUserCount();
            this.getCommentCount();
            this.getArticleCount();
            this.getWebSiteCount();
            this.commentList()

        }
    }
</script>

<style>
    .dashboard-box-card-title{
        font-size: 20px;
        font-weight: 600;
    }
    .dashboard-box{
        min-width: 1140px;
        padding: 20px;
    }
    .bg-purple{
        background: #d3dce6;
    }
    .grid-content{
        border-radius: 4px;
        min-height: 36px;
    }
    .web-size-info-box{
        margin-bottom: 20px;
    }
    .web-info-content{
        height: 150px;
        box-shadow: 0 1px 10px #d4d4d4;
    }
    .web-info-title{
        padding: 20px;
        font-size: 20px;
    }
    .web-info-number{
        text-align: center;
        color: #1e90ff;
        font-size: 36px;
        font-weight: 600;
    }
    .fast-way-item{
        padding: 10px;
        margin-bottom: 5px;
    }

    .float-left{
        float: left;
    }
    .float-right{
        float: right;
    }
</style>
