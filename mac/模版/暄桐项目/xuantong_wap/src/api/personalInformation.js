import axios from 'axios';
//枚举列表
export let personalInformationApi = ({enumKey}={})=> {
    return axios.post('/utility/enumlist',{  
        enumKey
    }).then(res=>{
        res.data.result.splice(0,1)
        return res.data.result;
    })
}
//查询国家
export let searchCountryApi = ({enumKey}={})=> {
    return axios.post('/utility/searchcountry').then(res=>{
        return res.data.result;
    })
}
//查询省份
export let searchProvinceApi = ({id}={})=> {
    return axios.post('/utility/searchprovince',{  
        id
    }).then(res=>{
        return res.data.result;
    })
}
//查询城市
export let searchCityApi = ({id}={})=> {
    return axios.post('/utility/searchcity',{  
        id
    }).then(res=>{
        return res.data.result;
    })
}
//更改头像
export let changeHeaderUrlApi = ({appid,headThumbnailUri,headUri,signature,timestamp,token}={}) => {
    return axios.post('/user/updateuserhead',{  
        appid,
        headThumbnailUri,
        headUri,
        signature,
        timestamp,
        token
    }).then(res=>{
        return res.data;
    })
}
//更改个人信息
export let changeUserInfoApi = ({appid,birthday,career,careerId,cityId,countryId,education,educationId,
    headThumbnailUri,headUri,industry,industryId,nickName,provinceId,sex,signature,timestamp,token}={})=>{
    return axios.post('/user/updateuserinfo',{  
        appid,
        birthday,
        career,
        careerId,
        cityId,
        countryId,
        education,
        educationId,
        headThumbnailUri,
        headUri,
        industry,
        industryId,
        nickName,
        provinceId,
        sex,
        signature,
        timestamp,
        token
    }).then(res=>{
        return res.data;
    })
}

//更改个人信息
// export let updatenicknameApi = ({nickName,token}={})=>{
//     //console.log(nickName,token,"---------------")
//     return axios.post('/user/updatenickname',{  
//         nickName,
//         token
//     }).then(res=>{
//         return res.data;
//     })
// }