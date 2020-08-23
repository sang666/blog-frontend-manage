import request from '../utils/request'

export default {

    getCommentList(current,limit){
        return request({
            url:`/biz/comment/list/${current}/${limit}`,
            method:'get'
        })
    },

    getCommentCount(){
        return request({
            url:`/biz/comment/comment_count`,
            method:'get'
        })
    },



    deleteComment(commentId){
        return request({
            url:`/biz/comment/${commentId}`,
            method:'delete'
        })
    },

    topComment(commentId){
        return request({
            url:`/biz/comment/top/${commentId}`,
            method:'put'
        })
    }

}
