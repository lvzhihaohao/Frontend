module.exports = {
    //服务器:118.190.202.65
    
    //于:10.112.124.114
    proxy: {
        '/api': {    
            target: 'http://118.190.202.65:8086',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '' 
            }
        },
        '/yapi': {    
            target: 'http://yapi.demo.qunar.com/mock/29556',
            changeOrigin: true,
            pathRewrite: {
                '^/yapi': '' 
            }
        }
    }
}