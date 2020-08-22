import request from '../utils/request'

export default {
    getCategories(){
        return request({
            url:`/api/biz/categories/list`,
            method:'get'
        })
    },
    getCommentList(current,limit){
        return request({
            url:`/api/biz/comment/list/${current}/${limit}`,
            method:'get'
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
    addCategory(category){
        return request({
            url:`/api/biz/categories/addCat`,
            method:'post',
            data:category
        })
    }
}
