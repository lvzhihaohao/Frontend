import axios from 'axios';
import {setUserInfoCookie} from '../../public/index'
//检测手机号是否存在
export let phoneHaveApi = ({phone}={})=> {
    return axios.post('/user/checkPhone',{  
        phone,
    }).then(res=>{
        return res.data;
    })
}
//手机登录
export let phoneLoginApi = ({account,password}={})=> {
    return axios.post('/user/loginbypassword',{  
        account,
        password,
    }).then(res=>{
        //console.log(res.data,'我是手机登录')
        
        return res.data;
    })
}
//手机发送验证
export let phoneGetCaptchaApi = ({phoneNumList,sendType}={})=> {
    return axios.post('/send/sendSms',{  
        phoneNumList,
        sendType,
    }).then(res=>{
        //console.log(res,'手机验证码')
        return res.data;
    })
}
//检测验证码是否存在
export let captchaHaveApi = ({confirmCode,findWay,nowTime,type,isExist}={})=> {
    return axios.post('/user/checkConfirmCode',{  
        confirmCode,
        findWay,
        nowTime,
        type,
        isExist
    }).then(res=>{
        //console.log(res,'检测验证码')
        return res.data;
    })
}
//检测昵称在不在
export let nickNameHaveApi = ({nickname}={}) =>{
    return axios.post('/user/checkNickname',{
        nickname
    }).then(res=>{
        return res.data
    })
}
//手机注册
export let phoneRegisterApi= ({confirmCode,mobible,newPassword,newPasswordConfirm,nickName,nowTime}={})=> {
    return axios.post('/user/registerbymobile',{
        confirmCode,
        mobible,
        newPassword,
        newPasswordConfirm,
        nickName,
        nowTime
    }).then(res=>{
        //console.log(res)
        return res.data;
    })
}
//手机验证码登录
export let phoneCaptchaLoginApi = ({confirmCode,mobile,nowTime}={})=> {
    return axios.post('/user/loginbyconfirm',{
        confirmCode,
        mobile,
        nowTime
    }).then(res=>{
        //console.log(res)
        return res.data;
    })
}
//手机找回密码
export let phoneForgetPasswordApi = ({confirmCode,mobile,nowTime,newPassword,newPasswordConfirm}={})=> {
    return axios.post('/user/getpasswordbymobile',{  
        confirmCode,
        mobile,
        nowTime,
        newPassword,
        newPasswordConfirm
    }).then(res=>{
        //console.log(res)
        return res.data;
    })
}
//获取个人信息
export let getUserInfoApi = ({appid,signature,timestamp,token}={}) =>{
    return axios.post('/user/getuserinfo',{
        appid,
        signature,
        timestamp,
        token
    }).then(res=>{
        setUserInfoCookie(res.data.result)
        return res.data;
    })
}
//是否需要完善注册信息
export let phoneNeedCompleteRegistrationInfoApi = ({appid,registerType,signature,timestamp,token}) =>{
    return axios.post('/user/needCompleteregistrationinfo',{  
        appid,
        signature,
        timestamp,
        registerType,
        token
    }).then(res=>{
        //console.log(res,'是否需要完善注册信息')
        return res.data;
    })
}

//记录用户信息
export let setRecord = ({...clientInfo}) =>{
    return axios.post('/utility/userLoginRecord',{  
        token:'',
        ...clientInfo,
    }).then(res=>{
        //console.log(res,'是否需要完善注册信息')
        return res.data;
    })
}