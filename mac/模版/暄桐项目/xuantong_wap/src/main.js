import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'

import MintUI from 'mint-ui'
import { Toast, MessageBox, DatetimePicker, Picker, Popup } from 'mint-ui'
import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
import Viewer from 'viewerjs';
import 'mint-ui/lib/style.css'
import 'viewerjs/dist/viewer.css'
import './sass/gu_template.css'
import './css/normalize.css'
import './css/Project.css'
import './css/fonts/font.css'
import './css/iconfont/iconfont.css'
import 'video.js/dist/video-js.css'
import { getCookie, getMd5, getUserInfoCookie ,IsPC,DsWsetCookie,getCook} from './public/index.js'
import { PCUrl } from './public/url.js'
import getBrowserInfo from 'get-browser-info';
//终端信息
const clientInfo = getBrowserInfo()
import './public/wxShare_data.js'
// let vConsole = new VConsole() // 初始化/

//判断pc还是手机端
if (IsPC()) {
  window.location.href = PCUrl  //生产
} else {
 
}

//全局登录弹窗组件
import ModelToast from './public/toast'
Vue.use(ModelToast)

//全局赠课弹窗组件
import GifToast from './public/GifToast'
Vue.use(GifToast)

//全局遮罩弹窗组件
import loadings from './public/loading'
Vue.use(loadings)

//第一次重新刷新客服
window.localStorage.setItem('zhiCustomBtnFlag',null)
window.localStorage.setItem('deszhiCustomBtnFlag',null)

//axios
import { axios } from "./public/utils"
//图片懒加载
import VueLazyload from 'vue-lazyload'

Vue.prototype.$axios = axios
Vue.prototype.$Toast = Toast
Vue.prototype.$MessageBox = MessageBox
Vue.prototype.$Picker = Picker
Vue.prototype.$DatetimePicker = DatetimePicker
Vue.prototype.$Popup = Popup
const img = new Image();
const viewer = new Viewer(img, {
  toolbar: false,navbar: false, title: false, toolbar: {
    zoomIn: 1,
    zoomOut: 1,
    oneToOne: 0,
    reset: 0,
    prev: 0,
    play: 0,
    next: 0,
    rotateLeft: 1,
    rotateRight: 1,
    flipHorizontal: 0,
    flipVertical: 0,
  }
})
Vue.prototype.ShowViewer = (src) => {
  img.src = src
  viewer.show();
}
Vue.config.productionTip = false




window.localStorage.setItem('clientInfo', JSON.stringify(clientInfo))
//console.log( '我是浏览器信息', clientInfo)

//记录游客
// axios.post('utility/userLoginRecord', {
//   token: '',
//   // nickName:nickName,
//   // userId:userId,
//   operatingSystem: clientInfo.os + clientInfo.osVersion, //手机操作系统
//   terminal: clientInfo.browser + clientInfo.browserVersion,//操作终端
//   source: clientInfo.device,//来源
//   ip: returnCitySN["cip"],//ip地址
// }).then(res => {

// })

const error = require('../static/img/bg.png')
// 懒加载
Vue.use(MintUI, {
  //懒加载
  lazyload: {
    preLoad: 1.3,
    error: error,
    loading: error,
    // attempt: 1
  }
})



// 路由钩子
router.beforeEach((to, from, next) => {

  //设置页面头部
  if (to.meta.title) {
    document.title = to.meta.title
  }
  wx.ready (function () {  
    // 微信分享的数据  
    var shareData = {  
        "imgUrl" : "https://www.xuantong.cn/iconimg/logoIcon.png",    // 分享显示的缩略图地址  
        "link" : `https://cr-uat.xuantong.cn/wx/index.html#${to.path}`,    // uat分享地址  
        // "link" : `https://www.xuantong.cn/wx/index.html#${to.path}`,    // 生产分享地址  、
        "desc" : "暄桐是一间教室，基于中式文人审美，教授以书法为主的传统文化与技艺，推崇非功利的学习态度。教室认为写字是一种生活方式，师生共同以书法为原点延展深入传统与艺术的种种乐趣，探索着心手相应，知行合一的可能。",   // 分享描述  
        "title" : "暄桐教室",   // 分享标题  
        success : function () {    
               // 分享成功可以做相应的数据处理  
              // alert("分享成功");   
         }
        }
        wx.onMenuShareTimeline (shareData);   
        wx.onMenuShareAppMessage (shareData);   
        wx.onMenuShareQQ (shareData);   
        wx.onMenuShareWeibo (shareData);  
});  
//  console.log(`https://cr-uat.xuantong.cn/wx/index.html#${to.path}`,'totototo')
//  window.localStorage.setItem('shareUrl',`https://cr-uat.xuantong.cn/wx/index.html#${to.path}`)
  //维护
  // if (to.path == '/adminmaintenance20191015') {
  //   DsWsetCookie('admin-maintenance', true, 0.5)
  //   next('/index/indexshouye')
  // } else {
  //   if (getCook('admin-maintenance')) {
  //     next()
  //   } else {
  //     if (to.path !== '/systemError') {
  //       next('/systemError')
  //     } else {
  //       next()
  //     }
  //   }
  // }

  if (to.path == '/phonelogin' || to.path == '/emaillogin') {
    if (from.path == '/phoneforgetpasswordtwo' ||
      from.path == '/emailforgetpasswordtwo' || from.path == '/phonecaptchalogin' ||
      from.path == '/phoneregisterone' || from.path == '/phoneforgetpasswordone' || from.path == '/'
      || from.path == '/emailregisterone' || from.path == '/emailforgetpasswordone') {
      let url = window.localStorage.getItem('url')
      window.localStorage.setItem('url', url)
    } else {
      window.localStorage.setItem('url', from.fullPath)
    }
  }

  next()
})
//判断是不是微信页面来设置头部内容
let isWeiXin = () => {
  return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
}
if (isWeiXin()) {
  Vue.prototype.$flag = true
} else {
  Vue.prototype.$flag = false
}
let vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// utility/userLoginRecord

//按钮连续点击问题
Vue.directive('preventReClick', {
  bind (el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        el.style.pointerEvents = "none"
        setTimeout(() => {
          el.disabled = false
          el.style.pointerEvents = "auto"
        }, binding.value || 1000)//默认延迟1s
      }
    })
  }
})
