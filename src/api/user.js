import request from '../utils/request'

export default {

    getUser(UserId){
        return request({
            url:`/api/biz/user/user_info/${UserId}`,
            method:'get'
        })
    },

    listUser(current,limit){
        return request({
            url:`/api/biz/user/${current}/${limit}`,
            method:'get',

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
