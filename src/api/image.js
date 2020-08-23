import request from '../utils/request'

export default {
    getImageList(current,limit,original){
        return request({
            url:`/api/biz/images/list/${current}/${limit}?original=${original}`,
            method:'get'
        })
    },


    deleteImage(imageId){
        return request({
            url:`/api/biz/images/${imageId}`,
            method:'delete'
        })
    },

}
