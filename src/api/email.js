import request from '../utils/request'

export default {

    getVerifyCode(emailAddress,type){
        return request({
            url:`/biz/user/verify_code?type=${type}&email=${emailAddress}`,
            method:'get'
        })
    },
    updateEmailAddress(email,verify_code){
        return request({
            url:`/biz/user/email?email=${email}&verify_code=${verify_code}`,
            method:'put'
        })
    }

}
