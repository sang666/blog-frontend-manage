import request from '../utils/request'

export default {
    getImageList(current,limit,original){
        return request({
            url:`/api/biz/images/list/${current}/${limit}?original=${original}`,
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
