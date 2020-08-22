<template>
<div>
    <!--列表内容-->
    <div class="comments-list-box">
        <el-table
                :data="comments"
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="id"
                    label="ID"
                    width="200">
            </el-table-column>

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
            <el-table-column
                    label="状态"
                    width="80">
                <template slot-scope="scope">
                    <div v-if="scope.row.state===1">
                        <el-tag type="danger" size="medium">已删除</el-tag>
                    </div>
                    <div v-if="scope.row.state===0">
                        <el-tag type="success" size="medium">正常</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建日期"
                    width="100">
            </el-table-column>

            <el-table-column
                    prop="updateTime"
                    label="更新日期"
                    width="100"
                    >
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button @click="deleteItem(scope.row)" type="danger" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <!--分页-->
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
</div>
</template>

<script>
    import comment from "../../api/comment";
    export default {
        name: "ManageComment",
        methods: {
            commentList() {
                comment.getCommentList(this.pageNavigation.current,this.pageNavigation.size).then(resp=>{
                    if (resp.data.code === 20000) {
                        this.comments=resp.data.data.page.records;
                        this.pageNavigation = resp.data.data.page;
                    }
                })
            },
            edit(){

            },
            deleteItem(){

            },
            onPageChange(page){
                this.pageNavigation.current = page
                this.commentList()
            },
        },
        data() {
            return {
                comments: [],
                pageNavigation: {
                    current:1,
                    size:10,
                    total:1,
                },
            }
        },
        mounted() {
            this.commentList()
        }
    }
</script>

<style>
    .comments-list-box{
        padding: 20px;
    }

    .user-info-avatar{
        display: block;

    }
    .user-info-avatar span{
        display: block;
        float: left;
        line-height: 40px;

    }
    .comment-user-name{
        margin-left: 10px;
        font-weight: 600;
        color: #222222;
    }
    .user-info-avatar img{
        vertical-align: middle;
    }

</style>
