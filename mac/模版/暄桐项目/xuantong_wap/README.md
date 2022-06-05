# xuantong

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

```
    npm run build注意事项
        config文件夹中  
            dev.env.js里面更换
            prod.env.js里面更换
        src中public的url.js更换
        main.js中微信分享地址记得更换
    
    Uat打包的话文件夹中有一个MP_verify_InG3pNY2Gu3kLnYm.txt文件放到打包好的dist_wap根目录上面
    生产打包的话文件我会单独给你 
    
    本地起服务
        npm start || npm run dev   ps:本地起服务的话记得更换config中index.js中的本地路径
    
    本地代理是dev.env.js

    服务器代理是prod.env.js

    sass与css中是抽出来的css样式慎重改   有些样式是公用的

    public中是一些封装的公共方法
        utils中有axios的封装

    src中的api是接口
    src中的store是vuex
    src中的router是路由列表


```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

```
    接口问题:
    页面问题：
```