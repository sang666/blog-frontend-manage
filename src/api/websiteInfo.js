import request from '../utils/request'

export default {
    getUserCount(){
        return request({
            url:`/api/admin/web_site_info/register_count`,
            method:'get'
        })
    },

    getSeoInfo(){
        return request({
            url:`/api/admin/web_site_info/seo`,
            method:'get'
        })
    },
    getWebsiteTitle(){
        return request({
            url:`/api/admin/web_site_info/title`,
            method:'get'
        })
    },
    getWebsiteCount(){
        return request({
            url:`/api/admin/web_site_info/view_count`,
            method:'get'
        })
    },


    updateSeoInfo(description,keywords) {
        return request({
            url:`/api/admin/web_site_info/seo?description=${description}&keywords=${keywords}`,
            method:'put'
        })
    },

    updateWebsiteTitle(title) {
        return request({
            url:`/api/admin/web_site_info/title/${title}`,
            method:'put'
        })
    }


}
