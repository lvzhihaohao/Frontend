//工具类
import Vue from 'vue'
import App from '../App'
import moment from "moment"
import store from '../store/chanJieDetail/chanJieDetailStore';


//将时间变为 X天X时X分X秒
export const initTime = (value) => {

  function addZero(num){
    if(num<10){
      return "0"+num
    }else{
      return num
    }
  }
  var theTime = parseInt(value);// 需要转换的时间秒 
  var theTime1 = 0;// 分 
  var theTime2 = 0;// 小时 
  var theTime3 = 0;// 天
  if(theTime > 60) { 
   theTime1 = parseInt(theTime/60); 
   theTime = parseInt(theTime%60); 
   if(theTime1 > 60) { 
    theTime2 = parseInt(theTime1/60); 
    theTime1 = parseInt(theTime1%60); 
    if(theTime2 > 24){
     //大于24小时
     theTime3 = parseInt(theTime2/24);
     theTime2 = parseInt(theTime2%24);
    }
   } 
  } 
  var result = '';
  if(theTime > 0){
   result = ""+addZero(parseInt(theTime))+"秒";
  }
  if(theTime1 > 0) { 
   result = ""+addZero(parseInt(theTime1))+"分"+result; 
  } 
  if(theTime2 > 0) { 
   result = ""+addZero(parseInt(theTime2))+"小时"+result; 
  } 
  if(theTime3 > 0) { 
   result = ""+addZero(parseInt(theTime3))+"天"+result; 
  }
  return result; 
}
//处理时间
//data 时间  type:"add" 加上时分秒   isUTC:  是否转为utc时间
//是否转为utc时间   获取日期控件时间时不需要utc时间  后台传来的时间  需要是utc时间
export const formData = (data, isUTC, type) => {
  // //console.log(moment(1552017509).format("YYYY-MM-DD HH:mm:ss"))
  if (data) { 
    if (isUTC == "utc") { //utc时间
      if (type == "add") {
        return moment(data).utc().format("YYYY-MM-DD HH:mm:ss")
      } else {
        return moment(data).utc().format("YYYY-MM-DD")
      }
    } else { //本地时间
      if (type == "add") {
        return moment(data).format("YYYY-MM-DD HH:mm:ss")
      } else {
          let t="Mon Jan 28 2019 00:00:00 GMT+0800"
        return moment(data).format("YYYY-MM-DD")
      }
    }

  } else {
    return ""
  }

}

export const formDatas = (data, isUTC, type) => {
  // //console.log(moment(1552017509).format("YYYY-MM-DD HH:mm:ss"))
  if (data) { 
    if (isUTC == "utc") { //utc时间
      if (type == "add") {
        return moment(data).utc().format("YYYY/MM/DD HH:mm:ss")
      } else {
        return moment(data).utc().format("YYYY/MM/DD")
      }
    } else { //本地时间
      if (type == "add") {
        return moment(data).format("YYYY/MM/DD HH:mm:ss")
      } else {
          let t="Mon Jan 28 2019 00:00:00 GMT+0800"
        return moment(data).format("YYYY/MM/DD")
      }
    }

  } else {
    return ""
  }

}
//处理时间  24小时以内 显示距离几小时  大于24小时 显示 MM-DD
//isCountDown: 是否需要倒计时
export const computingTime =(data,isCountDown)=>{
  //传来的是一个时间
  //计算时间差
  // //console.log(data)
  data=moment(data)
  let now=moment()
  let diff=data.diff(now)//毫秒数
  // //console.log(diff)
  let n=1000*60*60*24//一天的毫秒数
  if(Math.abs(diff)>n){
    //超过一天 显示 月份-天数
    return data.format("MM-DD HH:mm")
  }else{
    if(isCountDown){
      //需要倒计时  计算出具体多少时间 传出去
      return moment(diff).add(-8,"hour").format("HH:mm:ss")

    }else{
      //没有超过一天  显示 多少时间前
      if(data.locale("zh-cn").fromNow()=='几秒前'){
        return "刚刚"
      }else{
        return data.locale("zh-cn").fromNow()
      }
    }
    
  }

  

}
//处理时间  24小时以内 显示时分   超过 年月/日

export  const computingDataTime=(data)=>{
  //传来的是一个时间
  //计算时间差
  // //console.log(data)
  data=moment(data)
  // //console.log(data)
  let now=moment()
  let diff=data.diff(now)//毫秒数
  // //console.log(diff)
  let n=1000*60*60*24//一天的毫秒数
  if(Math.abs(diff)>n){
    //超过一天 显示 月份-天数
    return data.utc().format("YYYY/MM/DD")
    // return data.format("YY/MM/DD")
  }else{
    return data.utc().format("HH:mm")
    // return data.format("HH:mm")
    // if(isCountDown){
    //   //需要倒计时  计算出具体多少时间 传出去
    //   return moment(diff).add(-8,"hour").format("HH:mm:ss")

    // }else{
    //   //没有超过一天  显示 多少时间前
    //   return data.locale("zh-cn").fromNow()
    // }
    
  }


}

//获取this
let that;
export default function (app) {
     that = app
}

//手机号正则
export function isvalidPhone(str) {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    return reg.test(str)
}
//手机号判断
export function validPhone(rule, value,callback) {
    if (!value){
      return  callback(new Error('请输入电话号码'))
    }else  if (!isvalidPhone(value)){
      return   callback(new Error('请输入正确的11位手机号码'))
    }else {
      if(that.store.state.login.isnewsouse){
          that.$axios.post("/user/checkPhone", {
            phone:value
          }).then(res=>{
            if(res.result){
              return  callback()
            }else{
              return   callback(new Error('此手机号尚未存在'))
            }
          })
      }else{
        return  callback()
      }
    }
}

//邮箱判断
export function isEmail(rule, value,callback) {
  if (!value){
    return  callback(new Error('请输入邮箱号码'))
  }else  if (!isvalidEmail(value)){
    return   callback(new Error('请输入正确的邮箱号码'))
  }else {
      return  callback()
  }
}
//网易验证
export function Verionesuc(rule, value,callback){
    if (!that.store.state.login.Vedislaysuccess){
       return callback(new Error('请先进行验证'))
    }else {
       return callback()
    }
}


//邮箱简单正则
export function issouemail(str) {
  const reg = /@/g
  return reg.test(str)
}
//邮箱判断验证
export function isvalidEmail(str) {
  const reg = /^.*@.+\..+$/
  return reg.test(str)
}

//手机号判断或邮箱判断
export function validPhoneandemail(rule, value,callback) {
  if (!value){
    return  callback(new Error('请输入电话号码或邮箱'))
  }
  else{
    if(issouemail(value)){
        if(!isvalidEmail(value)){
          return   callback(new Error('请输入正确的邮箱'))
        }else{
          return  callback()
        }
    }else{
        if (!isvalidPhone(value)){
          return   callback(new Error('请输入正确的11位手机号码'))
        }else{
          if(that.store.state.login.isnewsouse){
            that.$axios.post("/user/checkPhone", {
              phone:value
            }).then(res=>{
              if(res.result){
                return  callback()
              }else{
                return   callback(new Error('此手机号尚未存在'))
              }
            })
        }
        }
    }
  }
}

//axios的处理
import router from '@/router/index'
import { Toast,MessageBox,DatetimePicker,Picker,Popup} from 'mint-ui'
import axios from 'axios'

import { getCookie,setCookie, setUserInfoCookie,getMd5} from '../public/index.js'
import qs from 'qs'
axios.timeout =600000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.API
// axios.defaults.baseURL = '/api'

 // 错误回调
//  axios.onError(error => {
//   // 请求出错后  重定向
//   const code = parseInt(error.response && error.response.status)
//   //console.log(code)
//   if (code === 404) {
//     redirect('/404')
//   }
// })

axios.interceptors.request.use(function (config) {
  // if(getCookie()=='undefined'){
  //     if(config.url == '/userclasshour/list'){
  //       setCookie(undefined)
  //       setUserInfoCookie(undefined)
  //       Vue.prototype.$ModelToast(true)
  //     }
  // }
  if (config.data !== undefined) {
    if (config.data.token !== undefined) {
      let token;
      if (getCookie() == undefined || getCookie() == 'undefined' ) {
        token = null
      } else {
        token = JSON.parse(getCookie()).result
      }
      config.data.password = '6581a04d-dc14-11e8-98f9-00163e048dd6' //password
      config.data.token = token //token
      config.data.appid = '48832f76dc1411e898f900163e048dd6' //appid
      config.data.timestamp = new Date().valueOf() //时间戳
      let md5 = getMd5(config.data) //md5
      config.data.signature = md5
      delete config.data.password
    }
  }
  qs.stringify(config.data);
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) { 
  let servicerTime = moment(response.headers.date).utc().add(8,'h').format("YYYY-MM-DD HH:mm:ss")
  store.mutations.changeCurTime(store.state,servicerTime)
  if(response.data.code =='600002' || response.data.code=='900001'){
      setCookie(undefined)
      setUserInfoCookie(undefined)
      router.push({
        path:'/index/indexshouye',
     })
      Vue.prototype.$ModelToast(true)
     
  }
  return response 
}, error => {
  if(error&&error.response){
    switch(error.response.status){
      case 404:
      router.push({
        path:'/index/error',
     })
     break;
    }
  }
   
  return Promise.reject(error) 
})
 export {axios}

