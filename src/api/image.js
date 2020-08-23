import request from '../utils/request'

export default {
    getImageList(current,limit,original){
        return request({
            url:`/biz/images/list/${current}/${limit}?original=${original}`,
            method:'get'
        })
    },


    deleteImage(imageId){
        return request({
            url:`/biz/images/${imageId}`,
            method:'delete'
        })
    },

}
