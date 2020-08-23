<template>
<div>
    <!--列表-->
    <div class="image-lsit-box">
        <el-table
                :data="images"
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="id"
                    label="ID"
                    width="200">
            </el-table-column>

            <el-table-column
                    label="图片"
            >
                <template slot-scope="scope">
                    <el-image fit="cover" class="image-manager-item" :src="scope.row.url"></el-image>
                </template>
            </el-table-column>

            <el-table-column
                    prop="name"
                    label="图片名"
                    width="200">
            </el-table-column>

            <el-table-column
                    label="来源"
                    width="80">
                <template slot-scope="scope">
                    <div v-if="scope.row.original==='article'">
                        <el-tag type="" size="medium">文章图片</el-tag>
                    </div>
                    <div v-if="scope.row.original==='avatar'">
                        <el-tag type="success" size="medium">头像图片</el-tag>
                    </div>
                    <div v-if="scope.row.original==='link'">
                        <el-tag type="warning" size="medium">友链图片</el-tag>
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

    <div class="image-list-page">
        <el-pagination

                @current-change="onPageChange"
                :current-page="pageNavigation.current"
                :page-count="pageNavigation.pages"
                :page-size="pageNavigation.size"
                layout="total, prev, pager, next"
                :total="pageNavigation.total">
        </el-pagination>
    </div>

    <div class="image-list-dialog">
        <el-dialog
                title="提示"
                :visible.sync="deleteDialogShow"
                width="400px">
            <span>你确定要删除"{{deleteMassage}}"这张图片吗</span>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="deleteDialogShow = false">取 消</el-button>
            <el-button type="danger" @click="doDeleteItem">确 定</el-button>
        </span>
        </el-dialog>

    </div>
</div>
</template>

<script>
    import image from "../../api/image";
    import category from "../../api/category";
    export default {
        name: "manageImage",
        data() {
            return {
                deleteDialogShow:false,
                deleteMassage:'',
                deleteTargetId:'',
                images: [],
                pageNavigation: {
                    current:1,
                    size:10,
                    total:1,
                },

                searchQuery:{
                    original:''
                }
            }
        },
        methods: {
            doDeleteItem(){
                image.deleteImage(this.deleteTargetId).then(resp=>{
                    if (resp.data.code === 20000) {
                        this.listImages();
                    }
                })
                this.deleteDialogShow = false;
            },
            deleteItem(item){
                //不是马上删除，而是给出警告提示
                this.deleteDialogShow = true;
                this.deleteMassage = item.name;
                this.deleteTargetId = item.id
            },
            onPageChange(page){
                this.pageNavigation.current = page
                this.listImages()
            },
            listImages() {
                image.getImageList(this.pageNavigation.current,this.pageNavigation.size,this.searchQuery.original).then(resp=>{
                    if (resp.data.code === 20000) {
                        this.images=resp.data.data.page.records
                        this.pageNavigation = resp.data.data.page
                    }
                })
            }
        },
        mounted() {
            this.listImages()
        }
    }
</script>

<style>
.image-manager-item img{
    width: 120px;
    height: 76px;
}
</style>
