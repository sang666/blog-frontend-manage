import request from '../utils/request'


export default {

    doLogin(verifyCode,captcha_key,user){
        return request({
            url:`/biz/user/login/${verifyCode}/${captcha_key}?from=p_`,
            method:'post',
            data:user
        })
    },

    checkRole(){
        return request({
            url:`/biz/user/check-token`,
            method:'get'
        })
    }

    /*getTeacherListPage(current,limit,teacherQuery){
        return request({
            url: `/eduservice/edu-teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            data:teacherQuery   //data 表示把对象转换成json进行传递到接口
        })
    },

    removeTeacher(id){
        return request({
            url: `/eduservice/edu-teacher/${id}`,
            method: 'delete',
        })

    },

    addTeacher(eduTeacher){
        return request({
            url:`/eduservice/edu-teacher/addTeacher`,
            method:'post',
            data:eduTeacher
        })
    },


    getTeacherInfo(id){
        return request({
            url:`/eduservice/edu-teacher/getTeacher/${id}`,
            method:'get',

        })
    },

    updateTeacher(eduTeacher){
        return request({
            url:`/eduservice/edu-teacher/updateTeacher`,
            method:'post',
            data:eduTeacher
        })
    }*/






}

