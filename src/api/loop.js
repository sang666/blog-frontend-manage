import request from '../utils/request'

export default {

    getLoop(looperId){
        return request({
            url:`/api/biz/looper/${looperId}`,
            method:'get'
        })
    },

    listLoop(){
        return request({
           url:`/api/biz/looper/list`,
           method:'get',

        })
    },

    addLoop(loop){
        return request({
            url:`/api/biz/looper`,
            method:'post',
            data:loop
        })

    },

    deleteLoop(loopId){
        return request({
            url:`/api/biz/looper/${loopId}`,
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
