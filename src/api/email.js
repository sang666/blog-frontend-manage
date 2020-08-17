import request from '../utils/request'

export default {

    getVerifyCode(emailAddress,type){
        return request({
            url:`/api/biz/user/verify_code?type=${type}&email=${emailAddress}`,
            method:'get'
        })
    },

    listUser(current,limit){
        return request({
            url:`/api/biz/user/${current}/${limit}`,
            method:'get',

        })
    },
    searchListUser(userName,email){
        return request({
            url:`/api/biz/user/1/10?userName=${userName}&email=${email}`,
            method:'get',

        })
    },
    resetPasswrod(userId,password){
        return request({
            url:`/api/biz/user/reset-password/${userId}?password=${password}`,
            method:'put'
        })
    },


    deleteUser(userId){
        return request({
            url:`/api/biz/user/${userId}`,
            method:'delete',

        })

    },
    updateLoop(loopId,loop){
        return request({
            url:`/api/biz/looper/${loopId}`,
            method:'put',
            data:loop
        })
    }


}
