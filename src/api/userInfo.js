import request from '../utils/request'

export default {

    getUserInfo(userId){
        return request({
            url:`/api/biz/user/user_info/${userId}`,
            method:'get'
        })
    },
    updateEmailAddress(){
        return request({
            url:`/api/biz/user/`,
            method:'put'
        })
    },
    checkRole(){
        return request({
            url:`/api/biz/user/check-token`,
            method:'get'
        })
    },

    updateuserInfo(userId,userInfo) {
        return request({
            url:`/api/biz/user/${userId}`,
            method:'put',
            data:userInfo
        })
    }


}
