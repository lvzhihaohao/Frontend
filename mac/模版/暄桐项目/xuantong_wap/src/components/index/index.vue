<template>
    <div class="index_wrap">
        <section ref="scrollSection">
            <router-view></router-view>
        </section>
        <footer>
            <router-link to="/index/indexshouye">
                <img src="../../../static/icon/shouye2.png" alt class="img_Define" />
                <img src="../../../static/icon/shouye.png" alt class="img_Define active" />
                <span>首页</span>
            </router-link>
            <router-link to="/index/indexclass">
                <img src="../../../static/icon/kecheng2.png" alt class="img_Define" />
                <img src="../../../static/icon/kecheng.png" alt class="img_Define active" />
                <span>去上课</span>
            </router-link>
            <router-link to="/index/indexshop">
                <img src="../../../static/icon/shangdian2.png" alt class="img_Define" />
                <img src="../../../static/icon/shangdian.png" alt class="img_Define active" />
                <span>暄桐文房</span>
            </router-link>
            <router-link to="/index/indexwode">
                <img src="../../../static/icon/wode2.png" alt class="img_Define" />
                <img src="../../../static/icon/wode.png" alt class="img_Define active" />
                <span>我的</span>
            </router-link>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                scrollToNum: 0
            };
        },
        // 获取滚动条的高度
        mounted() {
            let scrollToNum = window.sessionStorage.getItem("scrollToNum");
            // //console.log("123-----------------------------------" + scrollToNum)
            //console.log(window.location.hash, " @touchmove.prevent");
            this.$nextTick(() => {
                window.addEventListener("scroll", this.handleScroll, true);
                setTimeout(function() {
                    if (scrollToNum) {
                        window.scrollTo(0, scrollToNum * 1);
                    }
                });
            });
        },
        methods: {
            // 获取滚动条的高度
            handleScroll: function() {
                var H =
                    window.pageYOffset ||
                    document.body.scrollTop ||
                    document.body.scrollHeight;
                if (H) {
                    this.scrollToNum = H;
                }
            }
        },
        // 页面销毁前存页面滚动高度
        beforeDestroy() {
            window.sessionStorage.setItem("scrollToNum", this.scrollToNum);
        },
        // 销毁获取滚动条的高度
        deactivated() {
            // //console.log(this.scrollToNum)
            window.removeEventListener("scroll", this.handleScroll);
        }
    };
</script>


<style lang ='scss' scoped>
    .index_wrap {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        section {
            flex: 1;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }
        footer {
            width: 100%;
            height:3.06rem;
            /* height: 3.0625rem; */
            padding: 0 0 1rem 0;
            display: flex;
            /* position: fixed;
            left: 0;
            bottom: -1px; */
            z-index: 10;
            background: #fff;
            flex-shrink: 0;
            box-shadow: 0px 0px 8px 0px rgba(231, 231, 231, 0.72);
            a {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                img {
                    width: 1.75rem;
                    height: 1.75rem;
                    margin-top: 0.4rem;
                }
                span {
                    display: block;
                    margin-top: 0.24rem;
                    color: #555;
                    font-size: 0.75rem;
                }
            }
        }
    }
    .img_Define {
        width: 1.375rem;
        height: 1.375rem;
        display: block;
        /* text-align: center; */
    }
    .img_Define.active {
        display: none;
    }
    .router-link-exact-active.router-link-active .img_Define {
        display: none;
    }
    .router-link-exact-active.router-link-active .img_Define.active {
        display: block;
    }
    .router-link-exact-active.router-link-active span {
        color: #097276;
    }
    /**xuys**/
    .Haveclass_menuContent {
        margin-top: 2.5rem;
    }
    @media only screen and (-webkit-min-device-pixel-ratio: 1.5),
    only screen and (-moz-min-device-pixel-ratio: 1.5),
    only screen and (-o-min-device-pixel-ratio: 3/2),
    only screen and (min-device-pixel-ratio: 1.5) {
        /* .img_Define {
                                   width: 2.75rem;
                                   height: 2.75rem;
                                } */
    }
</style>
