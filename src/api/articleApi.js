import request from '../utils/request'

export default {

    getArticleCount(){
        return request({
            url:`/biz/article/total_count`,
            method:'get'
        })
    },
    getArticles(current,limit,categoryId,begin,end,labels,name,state){
        return request({
            url:`/biz/article/list/${current}/${limit}?categoryId=${categoryId}&begin=${begin}&end=${end}&labels=${labels}&name=${name}&state=${state}`,
            method:'post'
        })
    },

    getArticlesNo(current,limit){
        return request({
            url:`/biz/article/list/${current}/${limit}`,
            method:'post'
        })
    },

    topArticle(id){
        return request({
            url:`/biz/article/top/${id}`,
            method:'put'

        })
    },

    deleteArticle(articleId){
        return request({
            url:`/biz/article/state/${articleId}`,
            method:'delete'
        })
    },
    relDeleteArticle(articleId){
        return request({
            url:`/biz/article/${articleId}`,
            method:'delete'
        })
    },
    postArticle(article){
        return request({
            url:`/biz/article/add`,
            method:'post',
            data:article
        })
    },

    ArticleDetail(articleId){
        return request({
            url:`/biz/article/${articleId}`,
            method:'get'

        })
    },
    updateArticle(articleId,article){
        return request({
            url:`/biz/article/${articleId}`,
            method:'put',
            data:article
        })
    },

}
