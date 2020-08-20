<template>
<div class="setting-web-info-box">
    <el-form  label-width="100px" size="medium">
        <el-form-item label="网站名称">
            <el-input v-model="websiteTitle"></el-input>
        </el-form-item>
        <el-form-item label="关键字" placeholder="请用逗号隔开">
            <el-input v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item label="网站描述">
            <el-input v-model="description"
                      type="textarea"
                      :rows="3">
            </el-input>
        </el-form-item>
        <el-form-item >
            <el-button type="primary" @click="updateSeoInfo">更新</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
    import websiteInfo from "../../api/websiteInfo";
    export default {
        name: "WebsizeInfo",
        data() {
            return {
                websiteTitle: '',
                keyword:'',
                description:'',
                oldInfo:{
                    websiteTitle: '',
                    keyword:'',
                    description:'',
                }

            }
        },
        methods: {
            updateSeoInfo(){
                if (this.websiteTitle === '') {
                    this.$message.error('网站标题不能为空')
                    return
                }
                if (this.keyword === '') {
                    this.$message.error('关键字不能为空')
                    return
                }
                if (this.description==='') {
                    this.$message.error('网站描述不能为空')
                    return
                }
                let isupdateInfoSeo = false
                if (this.description !== this.oldInfo.description||this.keyword!==this.oldInfo.keyword) {
                    isupdateInfoSeo = true
                    websiteInfo.updateSeoInfo(this.description,this.keyword).then(resp=>{
                        if (resp.data.code === 20000) {
                            this.getWebsiteInfo()
                        }
                    })
                }
                //如果是更新seo信息，就不做标题更新的提示
                //提交数据
                if (this.websiteTitle!==this.oldInfo.websiteTitle) {
                    //更新一下标题
                    websiteInfo.updateWebsiteTitle(this.websiteTitle).then(resp=>{
                        if (resp.data.code === 20000) {
                            if (!isupdateInfoSeo) {
                                this.$message.success(resp.data.message)
                            }
                            this.getWebsiteTitle()
                        }
                    })
                }

            },
            getWebsiteInfo() {
                websiteInfo.getSeoInfo().then(resp=>{
                    if (resp.data.code === 20000) {
                        this.keyword=resp.data.data.result['web_site_keywords']
                        this.description=resp.data.data.result['web_site_description']
                        this.oldInfo.keyword = this.keyword
                        this.oldInfo.description = this.description
                    }
                })
            },
            getWebsiteTitle(){
                websiteInfo.getWebsiteTitle().then(resp=>{
                    if (resp.data.code === 20000) {
                        this.websiteTitle=resp.data.data.title.value
                        this.oldInfo.websiteTitle = this.websiteTitle
                    }
                })
            },
            getWebSiteCount(){
                websiteInfo.getWebsiteCount().then(resp=>{

                })
            }
        },
        mounted() {
            this.getWebsiteInfo()
            this.getWebsiteTitle()

        }
    }
</script>

<style scoped>
    .setting-web-info-box .el-input,.setting-web-info-box .el-textarea{
        width: 500px;

    }
</style>
