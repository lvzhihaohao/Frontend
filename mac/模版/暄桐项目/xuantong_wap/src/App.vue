<template>
  <div id="app" ref="Apps">
    <router-view />
  </div>
</template>

<script>
import Router from './router/index'
export default {
    name: 'App',
    created(){
        (function() {
           if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
               handleFontSize();
           } else {
               if (document.addEventListener) {
                   document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
               } else if (document.attachEvent) {
                   document.attachEvent("WeixinJSBridgeReady", handleFontSize);
                   document.attachEvent("onWeixinJSBridgeReady", handleFontSize);  }
           }
           function handleFontSize() {
               // 设置网页字体为默认大小
               WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
               // 重写设置网页字体大小的事件
               WeixinJSBridge.on('menu:setfont', function() {
                   WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
               });
           }
       })();
    },
    
        updated(){
            //console.log(window.location.hash," @touchmove.prevent")
            if(window.location.hash=="#/index/indexwode"){
                // this.$refs.Apps.style="overflow:hidden;height:25rem"
            }else{
                // this.$refs.Apps.style="overflow:auto;height:100%"
            }
        },
}
</script>

<style lang='scss'>
@import url('./sass/template.css');
html,body,#app{
  width:100%;
  background:#fff;
  height: 100%;
//   overflow:sroll;
//   overflow: hidden;
//   position: fixed;top:0;left:0;
  .mobile_content{
      height:auto;
    //   overflow-y: auto;
  }
}
.gu_pos_r{
    img{
        display:block;
        border-radius: .1875rem !important;
    }
}
.Calligraphy-class{
    margin-top:1rem;       
    h2{
        font-family: 'FZXIYSJ' !important;
        font-weight:500;
        margin-bottom:0.575rem !important;
        color:#000;
    }
    .c5{
        font-size:0.93rem;
        s{
            text-decoration-color:#DDD;
        }
    }
    section{
        margin:0;
        span{
            display:inline-block;
            font-size:.75rem;
            margin-left:0.58rem;
            transform: translateY(-.07rem);
            color: #333;
        } 
        p{
            font-weight: 600;
        }
        .mt-5{
            margin-top:0.6125rem;
        }
        .mb-10{
            margin-bottom:1.56rem;
        }
    }
  }
  .app-h5-indexdanfull{
        li{
            margin-bottom:1.18rem !important;
        }
        img{
            display:block; 
            border-radius: .1875rem !important;
        }
      .fz15{
          margin-top:0.87rem !important;
        samp{
            span{
                font-family: 'FZXIYSJ' !important;
                font-weight:400;
            }
        }
      }
      .gu_fz12{
            margin-top:0.625rem !important;
            color: #333;
            .price{
                margin-right:.65rem;
            }
      }
  }
.gu_clear_guide{
      display:flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      div{
        margin:1rem auto 0;
        width:100%;
        background:#f7f7f7;
        text-align: center;
      }
  }
.phoneError,.emailError,.captchaError,.passwordError,.passwordTwoError,.nicknameError{
    width:100%;
    height:14px;
    padding: .4rem 0 0 0;
    box-sizing: border-box;
    color:#f56c6c;
    font-size:.75rem;
    transform: translateY(-.1rem)
}
.gu_apply{
    width:100%;
    height:0.04rem;
    background:#C4A57F;
    margin-top:1.875rem;
    margin-bottom:1.875rem;
    opacity: .3;
    &.gu_apply_chanjie{
        margin:1.875rem auto 1.875rem auto;
        width:80%;
        height:0.07rem;
        box-sizing: border-box;
        padding:0 1.68rem;
    }
}
.email_content{
    h3{
        margin-bottom:4rem;
        font-size:1.5rem;
        line-height: 3rem;
        font-weight: 400;
    }
    .mint-button-text{
        font-size:1.125rem;
    }
    .mint-cell-text{
        display: inline-block;
        font-size:.93rem;
        font-weight: 600;
        transform: translateY(-.47rem);
    }
    .mint-cell:nth-child(1){    
        .mint-cell-value{
            transform:translate3d(-1.8rem,-.47rem,0)
        }
    }
    .mint-cell.mint-field.is-nolabel{
        margin-top:.8rem;
        .mint-cell-value{
            transform:translate3d(0,-.27rem,0);
            input{   
                padding-right:1.4rem;
            }
        }
        .mint-field-clear{
            display:inline-block;
            transform:translateX(-1rem);
        }
    }
    .c9.fz15.mt-15{
        margin-top:.48rem;
    }
    .mt-20{
        margin-top:1.5rem;
    }
    .mint-button--primary{
        border-radius:.18rem;
        font-size:.93rem;
    }
    .mint-cell .mint-cell-value input::-webkit-input-placeholder{
        color:#999;
        font-size:.93rem;
    }
    .captcha{
        line-height: 33px;
    }
}
.gu_nav_title_img{
    width:1.2rem;
    height:1.2rem;
    position: fixed;
    left:.78rem;
    top:.7rem;
    z-index:20;
}
.gu_nav_title_img_top{
    width:1.2rem;
    height:1.2rem;
    position:static;
    margin-top:.6rem;
    margin-left:.6rem;
    z-index:20;
}
img.emoji {
  cursor: pointer;
  height: 1.875rem;
  width: 1.875rem;
//   margin: 0 0.05em 0 0.1em;
  vertical-align: -0.1em;
   margin: 0rem 0.25px 0px 0.25px;
}
</style>
