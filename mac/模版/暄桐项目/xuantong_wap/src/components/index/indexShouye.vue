<template>
  <div id="Home_menu" style="overflow:auto">
    <p class="ipt_p" @click="goSearch()">
      <input type="text" placeholder="搜索你感兴趣的内容">
      <img src="../../../static/mobile_img/search.png" alt>
      <span class="ipt_p_span" @click.stop="goOld">返回老教室</span>
    </p>
    <div class="mobile_content gu_mobile_content">
      <!--swipe-->
      <article class="swipe_height">
        <Banner :data="bannerList"/>
      </article>
      <!--课程菜单-->
      <article class="mobile_ XT_menu bg3f pl-27 pr-27 ">
        <ol class="mobile_xt_navigation">
          <li>
            <router-link to="/xtmenulist2">
              <img src="../../../static/icon/navigation1.png" style="width:2rem" alt>
              <span class="dis_block">全部课程</span>
            </router-link>
          </li>
          <li>
            <router-link to="/thingwrite/2">
              <img src="../../../static/icon/navigation2.png" style="width:2rem" alt>
              <span class="dis_block">写字的事</span>
            </router-link>
          </li>
          <li>
            <router-link to="/chairlist">
              <img src="../../../static/icon/navigation3.png"  style="width:2rem" alt>
              <span class="dis_block">视频分享</span>
            </router-link>
          </li>
          <li>
            <router-link to="/peoplewrite/1">
              <img src="../../../static/icon/navigation4.png"  style="width:2rem" alt>
              <span class="dis_block">写字的人</span>
            </router-link>
          </li>
          <li>
            <router-link to="/classmatework">
              <img src="../../../static/icon/navigation5.png"  style="width:2rem" alt>
              <span class="dis_block">同学作业</span>
            </router-link>
          </li>
        </ol>
      </article>
      <!-- 写字课 -->
      <article class="bgfaf9 pt-24" v-if="courseRecommendTwoList">
        <h3 class="c097 text-center titleLeiht">写字课</h3>
        <p class="c30 fz15 text-center tesuleight">
          <!-- <span>从书法之美到生活之美</span> -->
          <span>以一支毛笔，开启中国传统文化大门</span>
        </p>
        <CourseRecommendList
          v-if="JSON.stringify(this.courseRecommendTwoList)!='{}'"
          :data="courseRecommendTwoList"
          :index="0"
        />
      </article>
      <article class="pt-24" v-if="courseRecommendTwoList.length>1">
        <h3 class="c097 text-center titleLeiht">写字进阶课</h3>
        <p class="c30 fz15 text-center tesuleight">
          <!-- <span>从书法之美到生活之美</span> -->
          <span>以静定，滋养身和心</span>
        </p>
        <CourseRecommendList
          v-if="JSON.stringify(courseRecommendTwoList)!='{}'"
          :data="courseRecommendTwoList"
          :index="1"
        />
      </article>
      <!-- 养生课 -->
      <!-- <article class="pt-30">
        <h3 class="c4a5 text-center titleLeiht">养生课</h3>
        <p class="c30 fz15 text-center tesuleight">中医养生基础课</p>
        <Healthclass v-if="courseRecommendList" :data="courseRecommendList"/>
      </article> -->
      <!-- 读书课 -->
      <!-- <article class="bgfaf9 pt-24 pb-20">
        <h3 class="c097 text-center titleLeiht">读书课</h3>
        <p class="c30 fz15 text-center tesuleight">慢慢读书</p>
        <Readingclass v-if="courseRecommendList" :data="courseRecommendList"/>
      </article> -->
      <!-- 文房商城 Four_stores -->
        <!-- style="border-bottom:1px solid #ccc" -->
      <article
        style="position: relative;"
        class="Book fl Four_stores publicPadding border_bottom "
        v-if="commodityRecommendList"
      >
          <h3 class="c4a5 text-center gu_c4a5_text-center">
            暄桐文房
            <a to="javascript:void(0)" @click="goBookShopMore" class="fr fz14 c6">更多</a>
          </h3>
          <p class="c30 fz15 text-center textLeiht">笔砚精良，人生一乐</p>
          <ShopList :data="commodityRecommendList" :types="types" :moreFlag="false"/>
      </article>
      <!--视频分享-->
      <article class="Book fl publicPadding Chairclass border_bottom">
        <h3 class="c097 text-center gu_c097_text-center">
          视频分享
          <router-link ref="videoShare" to="/chairlist" class="fz14 c6 fr">更多</router-link>
        </h3>
        <div class="videoPlaceholder">
          <p class="c30 fz15 text-center textLeiht">好看的，智慧的，滋养的</p>
          <!-- <p class="c30 fz15 text-center" v-if="firellWork">{{firellWork.courseName}}</p> -->
          <CoursefreeRecommendList
            v-if="firellWork"
            :data="firellWork"
            @courseFreeParent="courseFreeParent"
          />
        </div>
      </article>
      <!--写字的人-->
      <article class="Book fl publicPadding border_bottom pb-0 People_write">
        <h3 class="c4a5 text-center">
          写字的人
          <router-link to="/peoplewrite/1" class="fz14 c6 fr">更多</router-link>
        </h3>
        <p class="c30 fz15 text-center textLeiht">他们有各自的样子，恰好都爱写字</p>
        <div class="Chairclass-content" v-if="artivityResponseVos" @click='goSearchUrl(artivityResponseVos.articleUrl)'>
          <img  style="border-radius: .18rem;" :src="artivityResponseVos.pictureUrl" alt>
          <div class="fz18 c30 pbottom Chairclass-content-text" style="line-height: 1.5rem;">{{artivityResponseVos.articleTitle}}</div>
          <p class="fz15 c5">{{artivityResponseVos.articleIntroduction}}</p>
        </div>
      </article>
      <!--写字的事-->
      <article class="Book fl publicPadding border_bottom pb-0 People_things">
        <h3 class="c097 text-center gu_things">
          写字的事
          <router-link to="/thingwrite/2" class="fz14 c6 fr">更多</router-link>
        </h3>
        <p class="c30 fz15 text-center textLeiht">关于写字的“一万种”可能</p>
        <div class="Chairclass-content" v-if="thingWriteList" @click='goSearchUrl(thingWriteList.articleUrl)'>
          <!-- {{thingWriteList}} -->
          <img style="border-radius: .18rem;" :src="thingWriteList.pictureUrl" alt>
          <h3 class="fz18 c30 pbottom">{{thingWriteList.articleTitle}}</h3>
         
          <p class="fz15 c5">{{thingWriteList.articleIntroduction}}</p>
        </div>
      </article>
      <!--同学作业-->
      <article class="Book fl publicPadding border_bottom homework pb-0 student">
        <h3 class="c4a5 text-center">
          同学作业分享
          <router-link to="/classmatework" class="fz14 c6 fr">更多</router-link>
        </h3>
        <p class="c30 fz15 text-center textLeiht">从第一笔至今，每一步都踏实</p>
        <ProductionRecommendList
          :rFlag="false"
          @showImg="showImg"
          v-if="productionRecommendList.length > 0"
          :data="productionRecommendList"
          @productionParent="productionParent"
        />
      </article>
      <!--教室与老师-->
      <article class="Book fl publicPadding Classroom_teacher pb-0 teacher">
        <h3 class="c097 text-center gu_teacher">
          教室与老师
          <router-link to="/classroomteacher" class="fz14 c6 fr">更多</router-link>
        </h3>
        <p class="c30 fz15 text-center textLeiht">
          关于书法与传统文化的美育教室
        </p>
        <RecoArtList
        />
      </article>
    </div>
    <mt-popup v-model="popupVisible" popup-transition="popup-fade">
      <img :src="imgUrl" alt>
      <p></p>
    </mt-popup>
  </div>
</template>
<script>


import CourseRecommendList from "@/component/indexCourseRecommendList.vue"; //写字课
import Healthclass from "@/component/index/Healthclass"; //养生课
import Readingclass from "@/component/index/Readingclass"; //读书课
import {getUserInfoCookie,getCookie,setCookie,nowTime,setUserInfoCookie} from '../../public/index'
import { mapState, mapActions } from "vuex";
import { imgLocation } from "@/public/index";
import Banner from "@/component/indexBannerList.vue";
import ShopList from "@/component/search/searchShopList";
import CoursefreeRecommendList from "@/component/indexCoursefreeRecommendList.vue";
import ProductionRecommendList from "@/component/indexProductionRecommendList.vue";
import RecoArtList from "@/component/index/RecoArtList.vue";
export default {
  name: "indexshouye",
  data() {
    return {
      NewWxHearImg:'',
      value: "",
      types: "index",
      popupVisible: false,
      imgUrl: "",
       firellWork:null,//免费 视频
       userInfo:[],
       artivityResponseVos:[],//写字的人
    };
  },
  computed: {
    ...mapState({
      //首页轮播图数据
      bannerList: state => state.indexStore.bannerList,
      //首页课程数据
      courseRecommendList: state => state.indexStore.courseRecommendList,
      courseRecommendTwoList: state => state.indexStore.courseRecommendTwoList,
      //首页商城数据
      commodityRecommendList: state => state.indexStore.commodityRecommendList,
      //首页免费讲座数据
      coursefreeRecommendList: state =>
        state.indexStore.coursefreeRecommendList,
      //首页作品数据
      productionRecommendList: state =>
        state.indexStore.productionRecommendList,
      //首页教师与老师数据
      articleRecommendList: state => state.indexStore.articleRecommendList,
      //首页写字的人数据
      peopleWriteList:state=>state.peopleWriteStore.peopleWriteList[0],
      //首页写字的事数据
      thingWriteList:state=>state.thingWriteStore.thingWriteList[0],
      //微信数据
       WXinfo: state => state.indexStore.WXinfo,
     
    })
  },
  created () {
    
     //微信
    var test = window.location.search;
    let UserCode = window.localStorage.getItem('UserCode')
    //console.log(test,'window.location.search')
    //console.log(this.GetQueryString('code'),this.GetQueryString('state'))
    if(UserCode==this.GetQueryString('code')){

    }else{
          if(this.GetQueryString('state')=='SectBind'){
              this.$router.push({
                            path:'/BangWX',
                            query:{
                              state:this.GetQueryString('state'),
                              code:this.GetQueryString('code')
                            }
              })
          }
          if(this.GetQueryString('state')=='Pay'){
             let obj = JSON.parse( window.localStorage.getItem('OrderObj'))
              this.$router.push({
                            path:'/allCourseSubmitOrder',
                            query:{
                              state:this.GetQueryString('state'),
                              code:this.GetQueryString('code'),
                              istype:obj.istype,
                              fullid:obj.fullid,
                              isTurnFull: obj.isTurnFull,
                              orderType:obj.orderType,
                              //订单过来
                              orderId:obj.orderId,
                              typenumber:obj.phoneNum,
                              nickName:obj.gifname
                    }
              })
          }
          if(this.GetQueryString('state')=='STATE'){
            this.wxLogin(this.GetQueryString('code'),this.GetQueryString('state'))
          }else if(this.GetQueryString('state')=='Bang'){
             this.getIMG(this.GetQueryString('code'),this.GetQueryString('state'))
            // this.getEmail(this.GetQueryString('code'),this.GetQueryString('state'))
          }
    }
    //正常
    if(!getUserInfoCookie() || getUserInfoCookie() == 'undefined'){
        this.userInfo = undefined
        // if(this.GetQueryString('state')=='Bang'){
          
        // }
    }else{
        let getUserList =  JSON.parse(getUserInfoCookie())
        if(!getUserList){
          this.$axios.post("/user/getuserinfo", {
            token: ""
          }).then(res => {
            setUserInfoCookie(res.data.result)
            this.userInfo = res.data.result
          });
        }else{
          this.userInfo = getUserList
        }
        this.$GifToast(true);
    }
  },
  components: {
    Healthclass, //养生课
    Readingclass, //读书课
    Banner, //轮播
    CourseRecommendList, //课程
    ShopList, //商城
    CoursefreeRecommendList, //讲座
    ProductionRecommendList, //作品
    RecoArtList, //教室与老师
  },
  async mounted() {
   
    window.onscroll = null
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    // alert(test);
    this.getIndexBannerAction();
    await this.getIndexCourseRecommendAction({ token: "", courseTypeKey: 7 });
    await this.getIndexCourseRecommendTwoAction({ token: "", courseTypeKey: 7 });
    this.getIndexCommodityRecommendAction();
    // await this.getIndexCoursefreeRecommendAction({ token: "", pageIndex: 1 });
    this.courseFreeParent()
    this.getIndexProductionRecommendAction({ token: "", pageIndex: 1 });
    // this.getIndexArticleRecommendAction();
    this.getPeopleWriteAction({columnId:"1",pageIndex:1})
    this.getThingWriteAction({columnId:"2",pageIndex:1})

    this.$axios.post('/article/recommendlist',{}).then(res=>{
      // //console.log(res.data.result.artivityResponseVos,'artivityResponseVosartivityResponseVos')
      this.artivityResponseVos = res.data.result.artivityResponseVos[0]
    })
    
    //console.log(this.courseRecommendTwoList[1],"courseRecommendList")
  },
  
  methods: {
  // 回到老系统
            goOld(){
                // window.location.href='https://ex.xuantong.cn/'
                window.open("https://former.xuantong.cn")
            },
    GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    },
    ...mapActions({
      //首页轮播图
      getIndexBannerAction: "indexStore/getIndexBannerAction",
      //首页课程
      getIndexCourseRecommendAction: "indexStore/getIndexCourseRecommendAction",
      getIndexCourseRecommendTwoAction: "indexStore/getIndexCourseRecommendTwoAction",
      //首页商城
      getIndexCommodityRecommendAction:
        "indexStore/getIndexCommodityRecommendAction",
      //首页免费讲座
      getIndexCoursefreeRecommendAction:
        "indexStore/getIndexCoursefreeRecommendAction",
      //首页作品
      getIndexProductionRecommendAction:
        "indexStore/getIndexProductionRecommendAction",
      //首页教师与老师
      getIndexArticleRecommendAction:
        "indexStore/getIndexArticleRecommendAction",
      //首页写字的人方法
      getPeopleWriteAction:'peopleWriteStore/getPeopleWriteAction',
      //首页写字的事
      getThingWriteAction:'thingWriteStore/getThingWriteAction',
      //微信登录
      getChangeWXInfo:
        "indexStore/getChangeWXInfo",
        //用户个人信息
      getUserInfoAction:'phoneStore/getUserInfoAction'
    }),
    async courseFreeParent() { 
         this.$axios.post('/coursefree/recommendlist',{
          pageIndex:1,
          token:''
        }).then(res=>{
            //console.log(res.data.result.courseFreeResponseVos[0],'免费时评')
            this.firellWork = res.data.result.courseFreeResponseVos[0]
            // return res.data.result;
        })
      // await this.getIndexCoursefreeRecommendAction({ token: "", pageIndex: 1 });
    },
    //重新刷新 作品数据
    async productionParent() {
      await this.getIndexProductionRecommendAction({ token: "", pageIndex: 1 });
    },
    goxtmenulistOne(){
      if(this.userInfo == undefined){
          this.$ModelToast(true)
          return
      }
      this.$router.push({
          path:'/xtmenulist1'
      })
    },
    goxtmenulistWhe(){
      if(this.userInfo == undefined){
          this.$ModelToast(true)
          return
      }
      this.$router.push({
          path:'/xtmenulist2'
      })
    },
    //去往搜索页
    goSearch() {
      this.$router.push({
        path: "/search"
      });
    },
    //去往商城
    goBookShopMore() {
      this.$router.push({
        path: "/index/indexshop"
      });
    },
    showImg(item,introduction) {
      // this.popupVisible =true;
      // this.imgUrl =item.pictureUrl;
      this.ShowViewer(item.pictureUrl);
      if(introduction){

      this.$nextTick(()=>{
                    setTimeout(()=>{
                        let A = document.querySelectorAll('.viewer-footer')[0]
                        let ASon = document.querySelectorAll('.viewer-title')[0]
                        var tmp = document.createElement('div');
                        tmp.setAttribute('class','viewer-title')
                        tmp.innerHTML =  introduction
                        tmp.style.lineHeight = '1rem'
                        tmp.style.fontSize = '.93rem'
                        tmp.style.marginBottom = '1rem'
                        tmp.style.color = 'white'
                        tmp.style.opacity = '0.7'
                        tmp.style.fontFamily = 'FZLTHJ'
                        tmp.style.whiteSpace = 'normal'
                        A.replaceChild(tmp,ASon)
                     },100)
        })
      }

    },
    goSearchUrl(url){ 
       window.location.href = url; 
    },
    //微信登录后回调确认登录
  async  wxLogin(code,state){
        // code="001ES6Uc1wjIJw01P4Sc1Q7gUc1ES6U2"
        // state="STATE" 
         this.$loading(true)
        this.$axios.post("/wechat/wapcallback",{code:code,state:state,}).then(res=>{
          if(res.data.code!==0){
                  this.$Toast(res.data.msg)
                  this.$loading(false)
                    return
          }
          window.localStorage.setItem('UserCode',code)
          //console.log(res.data.result,'我是微信返回参数')
            if(res.data.result.token){
              let obj = {
                result:res.data.result.token
              }
              setCookie(obj)
              this.getUserInfoAction({token:''});
                   this.$Toast('登录成功') 
                   this.$loading(false)
                   this.$GifToast(true);
            }else{
               this.$loading(false)
               this.PushboundLogin(res.data.result)
            }
        })
    },
    //传递
  async  PushboundLogin(obj){
       this.getChangeWXInfo(obj)
       //console.log(this.WXinfo,'我是存储数据')
        await  this.$router.push({
                    path:'/boundLogin',
                    query:{registerType:'WX'}
        })
    },
    //邮箱注册
  // async   getEmail(code,state){
        
  //       this.$loading(true)
  
  //      let EmailObj =  JSON.parse(window.localStorage.getItem('EmailObj'))
  //      //console.log(EmailObj,'EmailObjEmailObj')
  //           this.$axios.post('/wechat/wapemailbindingwechat',{
  //                code:code,
  //                state:state,
  //                userRegisterByEmailVo:{
  //                     email:EmailObj.email,
  //                     nickName:EmailObj.nickName,
  //                     confirmCode:EmailObj.confirmCode,
  //                     newPassword:EmailObj.newPassword,
  //                     newPasswordConfirm:EmailObj.newPasswordConfirm,
  //                     nowTime:nowTime(),
  //                },
  //           }).then(res=>{
  //              //console.log(res.data.result,'绑定')
  //               if(res.data.code!==0){
  //                this.$Toast(res.data.msg)
  //                this.$loading(false)
  //                 return
  //               }
  //                window.localStorage.setItem('UserCode',code)
  //               if(res.data.result){
  //                               this.updateImg(this.NewWxHearImg)
  //                               let obj = {
  //                                   result:res.data.result.result
  //                               }
  //                               setCookie(obj)
  //                               this.getUserInfoAction({token:''});
  //                               this.$Toast('绑定成功')
  //                               this.$loading(false)
                                
  //                               // this.$router.push({
  //                               //     path:'/index/indexshouye'
  //                               // })
  //               }
  //           })
  //       },
        getIMG(code,state){
          this.$loading(true)
              this.$axios.post("/wechat/wapcallback",{code:code,state:state,}).then(res=>{
                  if(res.data.code!==0){
                          this.$Toast(res.data.msg)
                          this.$loading(false)
                            return
                  }
                  if(res.data.result.token){
              
                  }else{
                    this.getEmail(res.data.result)
                  }
             })
        },
        //邮箱注册
        getEmail(WXinfo){
            let EmailObj =  JSON.parse(window.localStorage.getItem('EmailObj'))
            this.$axios.post('/user/registerbyemail',{
                 email:EmailObj.email,
                 nickName:EmailObj.nickName,
                 confirmCode:EmailObj.confirmCode,
                 wechat:WXinfo.unionid,
                 wechatOpenId:WXinfo.openid,
                 newPassword:EmailObj.newPassword,
                 newPasswordConfirm:EmailObj.newPasswordConfirm,
                 nowTime:nowTime(),
            }).then(res=>{
                if(res.data.code!==0){
                                this.$loading(false)
                                this.$Toast(res.data.msg)
                                return
                 }
                if(res.data.result){
                                let obj = {
                                    result:res.data.result
                                }
                                setCookie(obj)
                                this.getUserInfoAction({token:''});
                                this.$loading(false)
                                this.$Toast('绑定成功') 
                                this.updateImg(WXinfo.headimgurl)
                                // this.$router.push({
                                //     path:'/index/indexshouye'
                                // })
                    }
            })
        },
        // 上传头像
        async updateImg(formData) {
          formData=formData.replace(/http:/,'')
           this.$axios.post("/user/updateuserhead", {
                headThumbnailUri:formData,
                headUri: formData,
                isLocalThumb:true,
                token: ""
            }).then(res=>{
               //console.log(res,"-----")
               //console.log(formData,"")
           })
        },
  },
  
  // beforeRouteLeave(to,from,next){
  //   //console.log(to)
  // }
};
</script>
<style lang="scss" scoped>
.mobile_xt_navigation{
  display:flex;
  padding-top: 1.5rem;
  padding-bottom: .96875rem;
  justify-content:space-between;
  li{
    a{
      display: inline-block;
      width:100%;
      height:1rem;
      text-align: center;
      span{
        width: 100%;
        color:#C4A57F;
        font-size:.625rem;
        padding-top: .3125rem;
      }
    }
  }
}
.border_bottom{
  position: relative;
}
.border_bottom::after {
    content: '';
    border-bottom: none;
    display: block;
    margin: 0rem -0.84375rem;
    width: 86%;
    height: .05rem;
    background: #eee;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -43%;
}
// .border_bottoms{
//   
//   .border_bottoms::after {
//         position: absolute;
//         content: '';
//         border-bottom: 1px solid #EEEEEE;
//         display: block;
//         margin: 0rem -0.84375rem;
//         width: 100%;
//         bottom: 0px;
//   }
// }
.titleLeiht{
  margin-bottom: 0!important;
}
.textLeiht{
  padding-top: .6375rem;
  padding-bottom: 1.5625rem;
}
.tesuleight{
  padding-top: .6375rem;
  padding-bottom: .625rem;
}
.pbottom{
  padding-bottom: .35rem;
}
.ipt_p {
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 0 1.43rem;
  z-index: 10;
  position: relative;
  display: flex;
  align-items: center;
}
.ipt_p img {
  width: 1rem;
  height: 1rem;
  position: absolute;
  // right: 15.31rem;
  z-index: 10;
  /* top:0.2rem; */
  top: 50%;
  margin-top: -.6rem;
  left: 2rem;
  color: #ccc;
}
.ipt_p > input {
  // padding-left: 6.75rem;
  // padding-right: 6.375rem;
  // width: 20.625rem;
  padding-left: 2rem;
  height: 2.25rem;
  background: #eeeeee;
  border-radius: 1.125rem;
  outline: none;
  border: none;
  text-align: left;
  line-height: 2.25rem;
  color: #ccc;
  margin: 0.625rem 0;
  flex: 1;
  box-sizing: border-box;
  overflow: hidden;
  &::-webkit-input-placeholder {
    color: #ccc;
    font-size: 1rem;
    font-family: "FZLTHJW--GB1-0";
  }
}
.ipt_p > .ipt_p_span{
  display: inline-block;
  color: #C4A57F;
  width: 5rem;
  padding-left: 1.1rem;
  flex-shrink: 0;
  white-space: nowrap;
  font-size: 1rem;
}
.ipt_p > input::-webkit-input-placeholder {
  color: #ccc;
  font-size: 1rem;
  font-family: "FZLTHJW--GB1-0";
}
.c097.text-center {
  margin-bottom: 1.9rem;
}
.gu_c097_text-center {
  margin-bottom: 1rem !important;
}
.gu_things,
.gu_teacher {
  margin-bottom: 1.68rem !important;
}
.Chairclass > h3 + p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 0.93rem;
  margin-bottom: 1.56rem;
}
.mb-30 {
  margin-bottom: 2.06rem;
}
.c097,
.c4a5 {
  font-weight: 400;
  font-size: 1.31rem;
}
.pt-30,
.bgfaf9,
.Book {
  padding-top: 1.525rem !important;
}
.Chairclass.border_bottom,
.border_bottom.pb-0.People_write,
.People_things,
.student,
.teacher {
  padding-top: 1.68rem !important;
}
.People_things .Chairclass-content,
.People_write .Chairclass-content {
  img {
    width: 20rem;
    height: 11.25rem;
    display: block;
  }
  h3 {
    margin-top: 0.93rem;
    margin-bottom: 0.35rem;
    font-weight: 400;
    font-family: "FZXIYSJ";
  }
  .Chairclass-content-text{
    margin-top: 0.93rem;
    margin-bottom: 0.35rem;
    font-weight: 400;
    font-family: "FZXIYSJ";
  }
  p {
    margin-bottom: 1.56rem;
    line-height: 1.5rem;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    word-break:break-all;
    text-overflow:ellipsis;
    overflow:hidden;
    font-size: .875rem!important;
    opacity: .8;
  }
}
.fz14.c6.fr{
  color:#555!important;
  opacity: .8;
}
.pb-20 {
  padding-bottom: 0;
}
.Book h3 {
  margin-bottom:0!important;
}
.publicPadding h3 a {
  right: -0.72rem;
}

.c30.fz15 {
  text-align: center;
}
.mint-popup {
  width: 90%;
}
.videoPlaceholder{
  // height: 18.5rem;
  &>p{
    margin-bottom: .5rem;
  }
}
</style>


