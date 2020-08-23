import request from '../utils/request'

export default {
    getCategories(){
        return request({
            url:`/biz/categories/list`,
            method:'get'
        })
    },

    updateCategory(categoryId,category){
        return request({
            url:`/biz/categories/${categoryId}`,
            method:'put',
            data:category
        })
    },

    deleteCategory(categoryId){
        return request({
            url:`/biz/categories/${categoryId}`,
            method:'delete'
        })
    },
    addCategory(category){
        return request({
            url:`/biz/categories/addCat`,
            method:'post',
            data:category
        })
    }
}
