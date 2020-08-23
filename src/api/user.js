import request from '../utils/request'

export default {

    logout(){
      return request({
          url:`/biz/user/logout`,
          method:'get'
      })
    },

    getUser(UserId){
        return request({
            url:`/biz/user/user_info/${UserId}`,
            method:'get'
        })
    },
    checkUserName(UserName){
        return request({
            url:`/biz/user/userName?UserName=${UserName}`,
            method:'get'
        })
    },

    listUser(current,limit){
        return request({
            url:`/biz/user/${current}/${limit}`,
            method:'get',

        })
    },
    searchListUser(userName,email){
        return request({
            url:`/biz/user/1/10?userName=${userName}&email=${email}`,
            method:'get',

        })
    },
    resetPasswrod(userId,password){
        return request({
            url:`/biz/user/reset-password/${userId}?password=${password}`,
            method:'put'
        })
    },


    deleteUser(userId){
        return request({
            url:`/biz/user/${userId}`,
            method:'delete',

        })

    },
    updateLoop(loopId,loop){
        return request({
            url:`/biz/looper/${loopId}`,
            method:'put',
            data:loop
        })
    }


}
