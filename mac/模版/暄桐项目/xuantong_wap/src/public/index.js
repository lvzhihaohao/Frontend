import cookie from 'js-cookie';
import md5 from 'js-md5';
import moment from  "moment"
import { axios } from "@/public/utils"
let userId;
//存值 登录态
export let getCookie =(val)=> {
    return cookie.get('info')
}
//设置值 登录态
export let setCookie =(val) => {
    cookie.set('info',val,{expires:7, path: '' })
    // //console.log('登录成功')
   
    return 
}
//存值 个人信息
export let getUserInfoCookie =(val)=> {
    return cookie.get('userInfo')
}
//设置值 个人信息
export let setUserInfoCookie =(val) => {
    if(val!==undefined){
        let clientInfo = JSON.parse(window.localStorage.getItem("clientInfo")) ;
        // axios.post('utility/userLoginRecord',{
        //     token:'',
        //     // nickName:val.nickName,
        //     // userId:val.studentId,
        //     operatingSystem:clientInfo.os  + clientInfo.osVersion, //手机操作系统
        //     terminal:clientInfo.browser +clientInfo.browserVersion ,//操作终端
        //     source:clientInfo.device,//来源
        //     ip:returnCitySN["cip"],//ip地址
        //   }).then(res=>{
        //   })
        try{
            axios.post('user/recordUserLoginInfo',{
                ip:returnCitySN["cip"],
                ipAddr:returnCitySN.cname,
                token:'',
              }).then(res=>{
    
              })
        }catch (err){
            console.log(err)
        }
          
    }   
    // userId = val
    return cookie.set('userInfo',val,{expires:7, path: '' })
}
//设置值 个人信息单独存储
export let setUserInfoCookieSect =(val) => {
    return cookie.set('userInfo',JSON.stringify(val))
}
//手机正则验证
export let phoneVerification = (val,dom,submit) => {
    if(dom){
        let phoneReg=/^1[23456789]\d{9}$/;
        let phoneReg1=/^1[^23456789]\d{9}$/;
        if(val==''){
            //console.log(submit,'n+1')
            if(submit){
                dom.style.borderTop='1px solid #f56c6c';
                dom.innerHTML='请输入电话号码';
               
            }else{
                dom.style.borderTop='none';
                dom.innerHTML='';
            }
            return false;
        }
        // else if(phoneReg1.test(val)) {
        //     dom.style.borderTop='1px solid #f56c6c';
        //     dom.innerHTML='请输入大陆手机号';
        //     return false;
        // }
        else if(!(phoneReg.test(val))){
            dom.style.borderTop='1px solid #f56c6c';
            dom.innerHTML='请输入正确的11位手机号码';
            return false;
        }else{
            dom.style.borderTop='none';
            dom.innerHTML='';
            return true;
        }
    }
}
export let checkTaxId = (taxId)=> {
    // var reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{15,20}$/;  
    var reg= /^[\da-zA-Z]{12,20}$/i
    let str1 = reg.test(taxId)
    //纳税人识别号格式错误
    return str1;
  }
//密码正则验证
export let passwordVerification = (val,dom,submit)=>{
    let passwordNumberReg=/^[0-9]{8,16}$/;
    let passwordEnglisReg=/^[A-Za-z]{8,16}$/;
    let passwordReg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;

    let reg=/\d+/
    let reg1=/[a-zA-Z]+/
    let reg2=/^[A-Za-z0-9]{8,16}$/;
    if(val==''){
        if(submit){
            dom.style.borderTop='1px solid #f56c6c';
            dom.innerHTML='请输入密码';
        }else{
            dom.style.borderTop='none';
            dom.innerHTML='';
        }
        return false;
    }
    else if(!(reg2.test(val))){
        dom.style.borderTop=' 1px solid #f56c6c';
        dom.innerHTML='密码长度为8到16位';
        return false;
    }else{
        if(reg.test(val)&&reg1.test(val)&&reg2.test(val)){
            return true
        }else{
            return  dom.innerHTML='密码必须包含数字和字母';
        }
    }
    
    // else if(reg.test(val)){
    //     dom.style.borderTop='1px solid #f56c6c';
    //     dom.innerHTML='密码必须包含数字和字母';
    //     return false;
    // }else if(reg1.test(val)){
    //     dom.style.borderTop=' 1px solid #f56c6c';
    //     dom.innerHTML='密码必须包含数字和字母';
    //     return false;
    // }else{
    //     dom.style.borderTop='none';
    //     dom.innerHTML='';
    //     return true;
    // }
}
//验证码验证
export let captchaVerification = (val,dom,submit)=>{
    let captchaReg=/^[0-9]{6}$/;
    if(val==''){
        if(submit){
            dom.style.borderTop='1px solid #f56c6c';
            dom.innerHTML='请输入验证码';
        }else{
            dom.style.borderTop='none';
            dom.innerHTML='';
        }
        return false;
    }else if(!(captchaReg.test(val))){
        dom.style.borderTop='1px solid #f56c6c';
        dom.innerHTML='请输入6位验证码';
        return false;
    }else{
        dom.style.borderTop='none';
        dom.innerHTML='';
        return true;
    }
}
//昵称正则验证
export let nicknameVerification = (val,dom,submit)=>{
    if(dom){
        var len = 0;
        let TeShuReg=/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im
        val = val.split('');
        val.forEach(item=>{
            if (/[\u4e00-\u9fa5]/.test(item) || TeShuReg.test(item)){
                len += 2;
            }else{
                len += 1;
            }
        })
        if(val==''){
            if(submit){
                dom.style.borderTop='1px solid #f56c6c';
                dom.innerHTML='请输入昵称';
            }else{
                dom.style.borderTop='none';
                dom.innerHTML='';
            }
            return false;
        }else if(len < 2 || len > 32){
            dom.style.borderTop='1px solid #f56c6c';
            dom.innerHTML='最少两个字符,最多32个字符';
            return false;
        }else{
            dom.style.borderTop='none';
            dom.innerHTML='';
            return true;
        }
    }
}
//再次确认密码验证
export let passwordTwoVerification = (val,val1,dom,submit)=>{
    if(val1==''){
        if(submit){
            dom.style.borderTop='1px solid #f56c6c';
            dom.innerHTML='请输入密码';
        }else{
            dom.style.borderTop='none';
            dom.innerHTML='';
        }
        return false;
    }else if(val != val1){
        dom.style.borderTop='1px solid #f56c6c';
        dom.innerHTML='两次输入密码不一致';
        return false;
    }else{
        dom.style.borderTop='none';
        dom.innerHTML='';
        return true;
    }
}
//邮箱验证
export let emailVerification =(val,dom,submit)=>{
    let emailReg=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if(val==''){
        if(submit){
        dom.style.borderTop='1px solid #f56c6c';
        dom.innerHTML='请输入邮箱地址';
        }else{
        dom.style.borderTop='none';
        dom.innerHTML='';
        }
        return false;
    }else if(!(emailReg.test(val))){
        dom.style.borderTop='1px solid #f56c6c';
        dom.innerHTML='请输入正确的邮箱地址';
        return false;
    }else{
        dom.style.borderTop='none';
        dom.innerHTML='';
        return true;
    }
}
//登录注册时把当前时间处理成后台需要的格式
export let nowTime = () => { 
    // let year = new Date().getFullYear()
    // let mouth = new Date().getMonth()+1
    // let day = new Date().getDate()
    // let hours = new Date().getHours()
    // let minutes = new Date().getMinutes()
    // let seconds = new Date().getSeconds()
    // let time = year+'-'+mouth+'-'+ day +' '+hours+':'+minutes+':'+seconds
    //console.log(now)
    let now = moment().format("YYYY-MM-DD HH:mm:ss") //当前
    
    return now
} 
//报名截止日期
export let refundValidityPeriodTime = (num) =>{
    let nowTime = new Date().getTime() + num*24*60*60*1000;
    let year = new Date(nowTime).getFullYear();
    let mouth = new Date(nowTime).getMonth()+1;
    let day =  new Date(nowTime).getDate();
    let time = year+'-'+mouth+'-'+ day
    return time;
}
//任务树日期   我的订单日期
export let userclasshourTime = (num,type) => {
    //console.log(num,"----")
    let nowTime = new Date(num).getTime();
    //console.log(nowTime,"----")
    let year = new Date(nowTime).getFullYear();
    let mouth = new Date(nowTime).getMonth()+1;
    let day =  new Date(nowTime).getDate();
    let hours = new Date().getHours()
    let minutes = new Date().getMinutes()
    let time = ''
    if(type=='tree'){
        time = year+'-'+addZero(mouth)+'-'+ addZero(day)
    }else{
        time = year+'-'+mouth+'-'+ day+' '+hours+':'+minutes
    }
    //console.log(time)
    return time;
    function addZero(i){
        return i<10?"0"+i:i;
    }  
}


//根据字母表升序 转化成md5,然后转大写
//'6581a04d-dc14-11e8-98f9-00163e048dd6', password
//'48832f76dc1411e898f900163e048dd6' appid
export let getMd5 = (params)=> {
    // //console.log(params.password)
    let ary = Object.keys(params) //拿到ary
    ary.sort((a, b) => {
    return a.localeCompare(b)
    })
    let str = ""

    ary.forEach((item) => {
    // //console.log(item)
    if (item == "appid" || item == "password" || item == "token" || item == "timestamp") {
        str += item + params[item]
    }
    })
    // //console.log(str)
    let md = md5(str)
    return md.toUpperCase()
}
//报名截止日期倒计时
export let downTime = (time) => {
    // 1) 计算时间差
    var nowTime = +new Date(),// 获取当前时间戳 ==> 增加
        stopTime = +new Date(time.replace(/-/g, '/')); // 设置时间戳
    var timer = stopTime - nowTime;// 时间差 ms
   // //console.log(stopTime)
    let oneDay= 24*60*60*1000 //一天的毫秒数
    var timeStr = '';
    if(timer > oneDay){
        var days= Math.floor( timer/1000/60/60/24)
        timeStr = days+'天'
    }else{
        var hours = Math.floor( timer/1000/60/60%24),
            minutes = Math.floor( timer/1000/60%60),
            seconds = Math.floor( timer/1000%60);
        timeStr =  addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);
    }
    if(timeStr <= '00:00:00'){
        return null;
    }
    return timeStr;
    // 封装加0函数
    function addZero(i){
        return i<10?"0"+i:i;
    }
}
//图片转化成文件流
function convertBase64UrlToBlob(urlData) {
    var bytes = window.atob(urlData.split(",")[1]); //去掉url的头，并转换为byte
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/png" });
  }
//转化为fromData格式
export let sumitImageFile = (base64Codes,nickName)=> {
    var form = document.forms[0];
    var formData = new FormData(form);
    formData.append("profile", convertBase64UrlToBlob(base64Codes));
    formData.append("nickName",JSON.parse(getUserInfoCookie()).nickName);
    formData.append("size",convertBase64UrlToBlob(base64Codes).size);
    // wordSize
    // picWidth
    // picLong
    //console.log(convertBase64UrlToBlob(base64Codes).size)
    return formData;


}

// 60s 验证码倒计时
export const captchaDownTime = dom => {
    let record =Math.floor(new Date().getTime()/1000)
    var timer = setInterval(function () {
        var newDataTime = Math.floor(new Date().getTime()/1000)
        let num=60-(newDataTime-record);
        //console.log("---"+num+"----")
        dom.innerHTML = num + 's';
        dom.style.background = '#ccc'
        if(num<=0){
            dom.style.background = '#C4A57F'
            dom.innerHTML = '获取验证码'
            clearInterval(timer)
        }
    }, 1000)
}
//加载更多方法
export const addMore = (arr,newArr) => {
    newArr = newArr.concat(arr.courseCommentResponseVos);
    return newArr;
}


// 改: 处理时间
//处理时间
//data 时间  type:"add" 加上时分秒   isUTC:  是否转为utc时间
//是否转为utc时间   获取日期控件时间时不需要utc时间  后台传来的时间  需要是utc时间
export const formData = (data, isUTC, type,isSecond=true) => {
    // //console.log(moment(1552017509).format("YYYY-MM-DD HH:mm:ss"))
    if (data) {
      if (isUTC == "utc") { //utc时间
        if (type == "add") {
          if(!isSecond){
            return moment(data).utc().format("YYYY-MM-DD HH:mm")
          }else{
            return moment(data).utc().format("YYYY-MM-DD HH:mm:ss")
          }
        } else {
          return moment(data).utc().format("YYYY-MM-DD")
        }
      } else { //本地时间
        if (type == "add") {
          if(!isSecond){
            return moment(data).format("YYYY-MM-DD HH:mm")
          }else{
            return moment(data).format("YYYY-MM-DD HH:mm:ss")
          }
        } else {
            let t="Mon Jan 28 2019 00:00:00 GMT+0800"
          return moment(data).format("YYYY-MM-DD")
        }
      }
    } else {
      return ""
    }
  }


// 转分钟
export const totalTime = (data)=>{
    var minute = zero(Math.floor(data / 60));
    var second = zero(Math.floor((data / 60 - minute) * 60));
    return minute + ":" + second;
}
// 补0函数
export const zero=(opts)=>{
    return opts < 10 ? "0" + opts : opts
}

//获取字符长度
export const getBLen = function(str) {
    if (str == null) return 0;
    if (typeof str != "string"){
     str += "";
    }
    return str.replace(/[^\x00-\xff]/g,"01").length;
   }
//判断手机还是pc
export const IsPC =  function(){  
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
    var flag = true;  
    for (var v = 0; v < Agents.length; v++) {  
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
    }  
    return flag;  
}

//维护
export const DsWsetCookie = (name, value, hour) => {
    //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
    var expires = hour * 60 * 60 * 1000;
    var date = new Date(+new Date() + expires);
    //console.log(date);
    document.cookie =
      name +
      "=" +
      escape(value) +
      ";expires=" +
      date.toUTCString() +
      ";path=/";
  };

  export const getCook = (name) => {//获取用户token
    var arr;
    var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      return decodeURIComponent(arr[2]);
    } else {
      return false
    }
  
  }