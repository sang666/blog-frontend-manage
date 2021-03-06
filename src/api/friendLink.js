import request from '../utils/request'

export default {

    getLinkList(){
        return request({
            url:`/biz/friends/list`,
            method:'get'
        })
    },
    postFriendLink(friendLink){
        return request({
            url:`/biz/friends`,
            method:'post',
            data:friendLink
        })
    },

    updateUpdateFriendLink(friendLinkId,friendLink) {
        return request({
            url:`/biz/friends/${friendLinkId}`,
            method:'put',
            data:friendLink
        })
    },
    deleteFriendLink(friendLinkId){
        return request({
            url:`/biz/friends/${friendLinkId}`,
            method:'delete'
        })
    }


}
