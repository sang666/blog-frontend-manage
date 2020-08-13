module.exports = {
    devServer:{
        proxy:{
            '/api': {
                target: 'http://localhost:8004/',
                changeOrigin:true,
                pathRewrite: {
                    '^/api': '/'   //重写接口 后台接口指向不统一  所以指向所有/
                }
            }
        }
    }
};
