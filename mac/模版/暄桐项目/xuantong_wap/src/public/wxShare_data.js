import { axios } from "./utils"
import { appid } from './url.js'
import md5 from 'js-md5';

//写调用微信的wxdata
var wxdata = {  
    wx_account : new Array(4),  
    wx_share : new Array(4),  
    //生产
    // wx_myuser : new Array("wx0a9411aa3ac42890","ef86641e32c01304acc9a75176b5bbf7"),  
    //uat
    // wx_myuser : new Array("wx6a0d56eb1c12553b","88e9f14fe2b894b77e5149b059470bf1"),  
    // access_token : "", // 凭证  
    // token_expires_in : "" , // 凭证过期时间 单位：s  
    jsapi_ticket : "", // 凭证  
    // ticket_expires_in : "" , // 凭证过期时间 单位：s  
}

//获取   access_token  token_expires_in
axios.post('/wechat/wxshare', {
   
  }).then(res => {
      //console.log(res.data.result)
      if(res.data.result){
        // wxdata.jsapi_ticket = JSON.parse(res.data.result).ticket
        // //console.log(wxdata.jsapi_ticket,'wxdata.jsapi_ticketwxdata.jsapi_ticket')
            // wxdata.access_token = res.data.result.access_token  // 获取到的交互凭证  需要缓存，存活时间token_expires_in  默认为7200s  
            // wxdata.token_expires_in = res.data.result.expires_in   // 过期时间 单位：s  
            // var timestamp = create_timestamp();   // timestamp  
// var noncestr =  create_noncestr();  // noncestr  
 



// wxdata.wx_account[0] = wxdata.wx_myuser[0];  // appid  
// wxdata.wx_account[1] = timestamp;   // timestamp  
// wxdata.wx_account[2] = noncestr; // noncestr  

// wxdata.wx_account[3] = create_signature(noncestr, wxdata.jsapi_ticket ,timestamp ,url);//signature  

let  shareUrl =   window.localStorage.getItem('shareUrl')
wxdata.wx_share[0] = "https://www.xuantong.cn/iconimg/logoIcon.png";  // share_img 分享缩略图图片  
wxdata.wx_share[1] =  shareUrl;// share_link  分享页面的url地址，如果地址无效，则分享失败  
wxdata.wx_share[2] = "暄桐是一间教室，基于中式文人审美，教授以书法为主的传统文化与技艺，推崇非功利的学习态度。教室认为写字是一种生活方式，师生共同以书法为原点延展深入传统与艺术的种种乐趣，探索着心手相应，知行合一的可能。";// share_title  
wxdata.wx_share[3] = "暄桐教室";// share_desc  

var $wx_account = wxdata.wx_account, // 自定义数据，见wxShare_data.js  
    $wx_share = wxdata.wx_share;   // 自定义数据  ，见wxShare_data.js  
    let timestamp= create_timestamp()
    let noncestr=create_noncestr()
    let url =window.location.href.split('#')[0]; 
    let jsapi_ticket= JSON.parse(res.data.result).ticket
    //console.log(timestamp,noncestr,url,jsapi_ticket,'参数')
//配置微信信息  
wx.config ({  
    debug : false,    // true:调试时候弹窗  
    appId : appid,  //  生产   微信appid  
 //   appId : 'wx6a0d56eb1c12553b',  //  uat   微信appid  
    timestamp :timestamp , // 时间戳  
    nonceStr : noncestr,  // 随机字符串  
    signature :create_signature(noncestr,jsapi_ticket ,timestamp ,url), // 签名  
    jsApiList : [  
        // 所有要调用的 API 都要加到这个列表中  
        'onMenuShareTimeline',       // 分享到朋友圈接口  
        'onMenuShareAppMessage',  //  分享到朋友接口  
        'onMenuShareQQ',         // 分享到QQ接口  
        'onMenuShareWeibo'      // 分享到微博接口  
    ]  
});

wx.error(function(res){   
    // config信息验证失败会执行error函数，如签名过期导致验证失败，  
   // 具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，  
    //对于SPA可以在这里更新签名。   
  //  alert("好像出错了！！");  
}); 
          
        }

})
    

// 数据签名 
function  create_signature(nocestr,ticket,timestamp,url){  
    var result = {
        jsapi_ticket: ticket,
        noncestr: nocestr,
        timestamp: timestamp,
        url: url,
    }

    let str=`jsapi_ticket=${ticket}&noncestr=${nocestr}&timestamp=${timestamp}&url=${url}`
    // var str = 'jsapi_ticket=' + ticket + '&noncestr=' + nonceStr + '&timestamp=' + timeStamp + '&url=' + url;
    // 对str使用sha1签名，得到signature，这里使用jsSHA模块，需install
    //console.log(sha1(str),'数据签名')
    return sha1(str)
    // shaObj = new jsSHA(str, 'TEXT');
    // result.signature = shaObj.getHash('SHA-1', 'HEX');
    // return result; // 返回到前端，提供接口由前端请求


            // var signature = "";  
            // // 这里参数的顺序要按照 key 值 ASCII 码升序排序  
            // var s = "jsapi_ticket=" + ticket + "&noncestr=" + nocestr + "×tamp=" + timestamp + "&url=" + url;  
            // return hex_sha1(s);   
}

//自定义创建随机串 自定义个数0 < ? < 32   
function create_noncestr() {  
             var str= "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";  
             var val = "";  
            for (var i = 0; i < 16; i++) {  
                 val += str.substr(Math.round((Math.random() * 10)), 1);  
             } 
        return val;  
 }

  //自定义创建时间戳  
function create_timestamp() {  
        return new Date().getSeconds();  
}  


//  ----- 5 开始 ------  
 


function encodeUTF8(s) {
    var i, r = [], c, x;
    for (i = 0; i < s.length; i++)
      if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
      else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
      else {
        if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
          c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
            r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
        else r.push(0xE0 + (c >> 12 & 0xF));
        r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
      };
    return r;
  }
  
  // 字符串加密成 hex 字符串
function sha1(s) {
    var data = new Uint8Array(encodeUTF8(s))
    var i, j, t;
    var l = ((data.length + 8) >>> 6 << 4) + 16, s = new Uint8Array(l << 2);
    s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
    for (t = new DataView(s.buffer), i = 0; i < l; i++)s[i] = t.getUint32(i << 2);
    s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
    s[l - 1] = data.length << 3;
    var w = [], f = [
      function () { return m[1] & m[2] | ~m[1] & m[3]; },
      function () { return m[1] ^ m[2] ^ m[3]; },
      function () { return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]; },
      function () { return m[1] ^ m[2] ^ m[3]; }
    ], rol = function (n, c) { return n << c | n >>> (32 - c); },
      k = [1518500249, 1859775393, -1894007588, -899497514],
      m = [1732584193, -271733879, null, null, -1009589776];
    m[2] = ~m[0], m[3] = ~m[1];
    for (i = 0; i < s.length; i += 16) {
      var o = m.slice(0);
      for (j = 0; j < 80; j++)
        w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
          t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
          m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
      for (j = 0; j < 5; j++)m[j] = m[j] + o[j] | 0;
    };
    t = new DataView(new Uint32Array(m).buffer);
    for (var i = 0; i < 5; i++)m[i] = t.getUint32(i << 2);
  
    var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
      return (e < 16 ? "0" : "") + e.toString(16);
    }).join("");
    return hex;
  }
