import request from '../utils/request'

export default {
    getArticles(current,limit,categoryId,begin,end,labels,name,state){
        return request({
            url:`/api/biz/article/list/${current}/${limit}?categoryId=${categoryId}&begin=${begin}&end=${end}&labels=${labels}&name=${name}&state=${state}`,
            method:'post'
        })
    },

    getArticlesNo(current,limit){
        return request({
            url:`/api/biz/article/list/${current}/${limit}`,
            method:'post'
        })
    },

    updateCategory(categoryId,category){
        return request({
            url:`/api/biz/categories/${categoryId}`,
            method:'put',
            data:category
        })
    },

    deleteCategory(categoryId){
        return request({
            url:`/api/biz/categories/${categoryId}`,
            method:'delete'
        })
    },
    postArticle(article){
        return request({
            url:`/api/biz/article/add`,
            method:'post',
            data:article
        })
    },

    saveDraftArticle(article){
        return request({
            url:`/api/biz/article/add`,
            method:'post',
            data:article
        })
    }
}
