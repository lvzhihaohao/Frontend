<template>
  <div class="m-auto-afters" @click="ClickMore">
    {{moreTit}}</div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      //获取屏幕滚动值
      getScrollTop() {
        //网页滚动量
        var scrollTop = 0,
          bodyScrollTop = 0,
          documentScrollTop = 0;
        if (document.body) {
          //兼容IE
          bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
          //主流浏览器
          documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop =
          bodyScrollTop - documentScrollTop > 0 ?
          bodyScrollTop :
          documentScrollTop;
        return scrollTop;
      },
      //获取真实高度
      getScrollHeight() {
        //网页可见区域高  //文档总高度    网页内容真实高度
        var scrollHeight = 0,
          bodyScrollHeight = 0,
          documentScrollHeight = 0;
        if (document.body) {
          bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
          documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight =
          bodyScrollHeight - documentScrollHeight > 0 ?
          bodyScrollHeight :
          documentScrollHeight;
        return scrollHeight;
      },
      //获取屏高
      getWindowHeight() {
        //window的高度  屏高
        var windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
          windowHeight = document.documentElement.clientHeight;
        } else {
          windowHeight = document.body.clientHeight;
        }
        return windowHeight;
      },
      get() {
        //重复调用滚动条判断是否到达底部
        var that = this;
        window.onscroll = function() {
          let positions =
            that.getScrollTop() +
            0.5 +
            that.getWindowHeight() -
            that.getScrollHeight() <
            2 &&
            that.getScrollTop() +
            0.5 +
            that.getWindowHeight() -
            that.getScrollHeight() >
            0.1;
          if(that.FiexTop!==undefined){
                if(that.getScrollTop() >= that.FiexTop+20){
                      that.FiexTopAdd('add')
                }else{
                    that.FiexTopAdd('remove')
                }
          }
          //console.log(positions);
          if (positions) {
            that.$emit("timer", window.onscroll);
            window.onscroll = null;
          }
        };
      },
      ClickMore() {
        this.$emit("timer", window.onscroll);
      },
      gets() {
        window.onscroll = null;
        let that = this
        if(that.FiexTop!==undefined){
              window.onscroll = function() {
                  //console.log('吸附99999999')
                   if(that.getScrollTop() >= that.FiexTop+20){
                    that.FiexTopAdd('add')
                    }else{
                        that.FiexTopAdd('remove')
                    }
              }
        }
      }
    },
    data() {
      return {};
    },
    props: {
      timer: {
        type: null
      },
      moreTit: {
        type: null
      },
      FiexTop:{
        type:null
      },
      FiexTopAdd:{
        type:null
      }
    },
    mounted() {
      var that = this;
      //滚动条事件
      // //console.log(window)
      window.onscroll = function() {
        let positions =
          that.getScrollTop() + that.getWindowHeight() <
          that.getScrollHeight() + 1.5 &&
          that.getScrollTop() +
          0.5 +
          that.getWindowHeight() -
          that.getScrollHeight() >
          0.1;
        // that.getScrollTop() + that.getWindowHeight() == that.getScrollHeight();
        // //console.log(
        //   that.getScrollTop(),
        //   "top",
        //   that.getWindowHeight(),
        //   "height",
        //   that.getScrollHeight(),
        //   "zongs"
        // );
        if(that.FiexTop!==undefined){
          //console.log(positions, '定位哦',that.getScrollTop(),that.FiexTop);
              if(that.getScrollTop() >= that.FiexTop+20){
                    that.FiexTopAdd('add')
              }else{
                   that.FiexTopAdd('remove')
              }
        }
        if (positions) {
          //判断是否到达底部
          //console.log("我到底部了");
          that.$emit("timer", window.onscroll);
          window.onscroll = null;
        }
        // 屏高+上偏移量>=真实内容高度-100 ===> 距离底部100时加载更多
        // if (
        //   that.getScrollTop() + that.getWindowHeight() >=
        //   that.getScrollHeight() - 100
        // ) {
        //   //console.log("我到底部了");
        //   that.$emit("timer", window.onscroll);
        //   window.onscroll = null;
        // }
      };
    }
  };
</script>

<style>
  .m-auto-afters {
    width: 100%;
    text-align: center;
    color: #b49876;
    font-size: 0.875rem;
    padding-bottom: 2rem;
  }
</style>
