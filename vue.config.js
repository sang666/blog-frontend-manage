module.exports = {
    devServer:{
        proxy:{
            /*'/api': {
                target: 'http://sang66.icu:8004/',
                changeOrigin:true,
                pathRewrite: {
                    '^/api': '/'   //重写接口 后台接口指向不统一  所以指向所有/
                }
            }*/
            '/user':{
                target:'http://localhost:8004',
                changeOrigin:true
            },
            '/biz':{
                target:'http://localhost:8004',
                changeOrigin:true
            },
            '/admin':{
                target:'http://localhost:8004',
                changeOrigin:true
            },
            '/protal':{
                target:'http://localhost:8004',
                changeOrigin:true
            },
            '/oss':{
                target:'http://localhost:8004',
                changeOrigin:true
            }

        }
    }
};
