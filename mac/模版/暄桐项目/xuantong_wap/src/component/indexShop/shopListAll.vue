<template>
    <div class="indexUls" ref='wrappers'>
        <ul :class='types=="index"? "indexUl" : "searchUl"'>
            <li v-for="(item,index) in data" :key="index" @click="goShopLink(item.commodityUrlWap)">
                <img v-lazy="item.commodityCoverUrl" :key="item.commodityId" alt style="border:1px solid white" />
                <p class="c30 fz15">{{item.commodityName}}</p>
                <span class="c4a5 fz15">{{item.commodityPrice}}元</span>
            </li>
            <div class="textWarpperBottom" ref="mychild">{{moreTit}}</div>
        </ul>
    </div>
</template>
<script>
    import ScrollBottom from "@/component/ScrollBottom";
    import {
        mapState,
        mapActions
    } from "vuex";
    import Bscroll from "better-scroll";
    export default {
        name: "shop",
        data() {
            return {
                moreTit: "加载更多",
                Timingopen: null,
                page: 1,
                newArrData: 1,
            };
        },
        computed: {
            ...mapState({
                Index: state => state.searchStore.Index
            })
        },
        props: {
            data: {
                type: null,
                require: true
            },
            types: {
                type: null
            },
            typeId: {
                type: null
            }
        },
        components: {
            ScrollBottom
        },
        methods: {
            ...mapActions({
                changegetIndex: "searchStore/changegetIndex"
            }),
            goShopLink(url) {
                window.location.href = url;
            },
            clearZero() {
                this.moreTit = "加载更多";
            },
            goTop(){
                this.scroll.scrollTo(0, 0, 500)
            },
            renovation(ind){
                this.page = 1;
                this.$axios.post("/commodity/list", {
                    pageIndex: 0,
                    typeId: ind
                }).then(res=>{
                    let newarr = res.data.result.commodityResponseVos;
                    this.newArrData = newarr.length
                })
            }
        },
        created() {
            this.moreTit = "加载更多";
            this.$nextTick(() => {
                this.scroll = new Bscroll(this.$refs.wrappers, {
                    //初始化better-scroll
                    probeType: 3, //1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
                    click: true, //是否派发click事件
                    scrollY: true
                });
                // 滑动过程中事件  加载更多
                this.scroll.on("scroll", pos => {
                    if (pos.y < this.scroll.maxScrollY - 40) {
                        if (this.newArrData >= 1) {
                            this.moreTit = "松手加载更多"
                        } else {
                            this.moreTit = "暂时都在这里了..."
                        }
                    } else {
                        if (this.newArrData >= 1) {
                            this.moreTit = "下拉加载更多"
                        } else {
                            this.moreTit = "暂时都在这里了..."
                        }
                    }
                });
                this.scroll.on("scrollEnd", () => {
                    if (this.newArrData >= 1) {
                        this.moreTit = "下拉加载更多"
                    } else {
                        this.moreTit = "暂时都在这里了..."
                    }
                });
                this.scroll.on("touchEnd", async pos => {
                    if (this.moreTit == "松手加载更多") {
                        this.page = this.page + 1;
                        //console.log(this.page,'this.page')
                        clearInterval(this.Timingopen);
                        this.changegetIndex();
                        this.$axios.post("/commodity/list", {
                            pageIndex: this.page,
                            typeId: this.typeId
                        }).then(res=>{
                            let newarr = res.data.result.commodityResponseVos;
                            this.newArrData = newarr.length
                            //console.log(newarr.length,"123")
                            if (newarr.length == 0) {
                                this.moreTit = "暂时都在这里了...";
                                //console.log(this.moreTit)
                                this.scroll.refresh()
                                return;
                            } else {
                                newarr.forEach((item, i) => {
                                    this.data.push(item);
                                });
                                this.moreTit = "加载更多";
                                this.scroll.refresh()
                            }
                        })
                    }
                });
            });
        }
    };
</script>
<style lang='scss' scoped>
    .indexUl,
    .searchUl {
        position: relative;
    }
    .textWarpper {
        position: absolute;
        bottom:-3rem;
        left: 0;
        width: 100%;
        height: 3rem;
        text-align: center;
        line-height: 3rem;
        color: #C4A57F;
    }
    .textWarpperBottom {
        position: relative;
        left: 0;
        bottom:1rem;
        width: 100%;
        height: 3rem;
        text-align: center;
        line-height: 3rem;
        color: #C4A57F;
        z-index: 999999;
    }
    .Store_menuContent .Store_menuList ul {
        // display: inline-block!important;
    }
    .Four_stores .searchUl {
        box-sizing: border-box;
        padding: 1.3125rem 1.68rem 0 1.68rem;
    }
    .Four_stores ul li {
        width: 9.5625rem;
        margin-top: 0px;
        margin-bottom: 1.5rem;
    }
    .Four_stores ul li:nth-child(1) {
        margin-top: 0;
    }
    .Four_stores ul li:nth-child(2) {
        margin-top: 0;
    }
    .indexUls {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    img {
        display: block;
        width: 100%;
        height: 9.5625rem;
        border-radius: 0.18rem;
    }
    p {
        margin-top: 0.93rem !important;
        margin-bottom: 0.425rem !important;
    }
</style>