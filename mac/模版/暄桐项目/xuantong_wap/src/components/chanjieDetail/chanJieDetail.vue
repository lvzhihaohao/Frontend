<template>
  <div id="chanJieDetailBox">
    <article class="nav-title" v-if="!backFlag && !this.$flag">
      <mt-header fixed title="课程详情">
        <a href="javascript:void(0);" slot="left" @click="goBacks">
          <mt-button icon="back"></mt-button>
        </a>
        <router-link to="/" slot="right"></router-link>
      </mt-header>
    </article>
    <div class="Chanjie mt-40" ref="bigBox">
      <!--mobile_content 固定底部的话+add -->
      <div style="position:relative">
        <img
          src="../../../static/img/back.png"
          style="z-index:9999"
          class="gu_nav_title_img"
          v-if="this.$flag && !backFlag "
          @click="goBacks"
        />
        <span
          class="Before_course fz15 c4a5"
          ref="Beforecourse"
          @click="classBefore"
          v-if="chanJieDetailData.purchased && ChanjieTable=='2'"
        >
          <i class="gu_c4a5_fz15 c4a5 fz15">
            <img src="../../../static/img/myDoubt.png" alt />
          </i>开课前请了解
        </span>
        <div
          ref="ChanjieTitle"
          :class="this.$flag||popupVisible1||popupVisible?'Chanjie-title':'Chanjie-title mtLei40'"
        >
          <img
            :src="chanJieDetailData.coursePictureUri"
            style="width:23.43rem;height:13.25rem"
            :data-src="chanJieDetailData.coursePictureUri"
            alt
          />
          <!-- <Videos v-if="chanJieDetailData.courseTypeName==='录播课'" :data="chanJieDetailData.coursePictureUri" :url="Rurl" :index="0"/> -->
        </div>
        <article class="pl-30 pr-30 Chanjie-content mt-15">
          <div class="dis_flow_root">
            <div class="Chanjie-body">
              <p class="ChanjieTitle">
                <span
                  class="fz12 cf recorded"
                  v-if="chanJieDetailData.courseType=='1'"
                  style="background:#C4A57F"
                >直播课</span>
                <span class="fz12 cf recorded" v-else style="background:#EA9C91">录播课</span>
                <strong class="fz18 c30">{{chanJieDetailData.courseName}}</strong>
              </p>
              <p class="fz15 c30" style="line-height: 1.5rem;">{{chanJieDetailData.courseSubtitle}}</p>
              <section class="frreq">
                <span
                  class="c097 fz18"
                  v-if="!chanJieDetailData.purchased"
                >{{chanJieDetailData.courseFullPrice}}元</span>
                <span class="fz15">共{{chanJieDetailData.classHourCount}}课</span>
                <span
                  class="fz15 c4a5"
                  v-if="chanJieDetailData.statusName=='已报名'"
                >{{chanJieDetailData.statusName}}</span>
                <span class="fz15" style="color:#999" v-else>{{chanJieDetailData.statusName}}</span>
                <span class="fr">
                  <span
                    class="mr-10"
                    v-if="chanJieDetailData.purchased&&chanJieDetailData.canGift"
                    @click="buyHtml('B')"
                  >
                    <img src="../../../static/img/gifboxpng.png" style="width:2rem;height:2rem" />
                  </span>
                  <!-- <label for="" class="fz12 c9 fr">
                                                    <i class="iconfont icon-shoucang middle"></i>
                                                    <span class=" pos_r" style="top:2px;">收藏</span>
                  </label>-->
                </span>
              </section>
            </div>
            <div class="gu_apply gu_apply_chanjie"></div>
            <article class="ChanjieTable">
              <div ref="tab" class="gu_chanjieBox">
                <mt-navbar v-model="ChanjieTable" class="ChanjieTab" style="padding-top: 0.3rem;">
                  <img
                    src="../../../static/img/back.png"
                    class="gu_nav_title_img"
                    v-if="this.$flag && backFlag"
                    @click="goBack"
                  />
                  <mt-button
                    icon="back"
                    @click="goBack"
                    v-if="!this.$flag && backFlag"
                    style="color:#000"
                    class="button"
                  ></mt-button>
                  <mt-tab-item id="1">课程介绍</mt-tab-item>
                  <mt-tab-item id="2">去上课</mt-tab-item>
                  <mt-tab-item id="3">晒作业</mt-tab-item>
                  <mt-tab-item id="4">留言</mt-tab-item>
                </mt-navbar>
              </div>
              <div ref="tabFexld"></div>
              <!-- tab-container -->
              <mt-tab-container v-model="ChanjieTable">
                <!-- 课程介绍 -->
                <mt-tab-container-item id="1">
                  <div
                    class="mobile_content"
                    style="paddingBottom:6rem"
                    @touchstart="leftRightStartOne"
                    @touchmove="leftRightMoveOne"
                  >
                    <chanjieintroduce
                      :FiexTop="FiexTop"
                      :FiexTopAdd="FiexTopAdd"
                      :data="chanJieDetailUserCourseIntroduceImg"
                      v-if="chanJieDetailUserCourseIntroduceImg"
                    />
                    <!-- <article class="dis_flow_root mt-30">
                                                <div class="clear" style="margin-top:7px;" v-if='chanJieDetailUserCourseIntroduceImg'>
                                                    <img v-for='(item,ind) in chanJieDetailUserCourseIntroduceImg' :key='ind' :src="item" alt="">
                                                </div>
                                                <div class="clear" style="margin-top:7px;" v-if='chanJieDetailUserCourseIntroduceImg'>
                                                    <img v-for='(item,ind) in chanJieDetailUserCourseIntroduceImg' :key='ind' :src="item" alt="">
                                                </div>
                                                <div class="clear" style="margin-top:7px;" v-if='chanJieDetailUserCourseIntroduceImg'>
                                                    <img v-for='(item,ind) in chanJieDetailUserCourseIntroduceImg' :key='ind' :src="item" alt="">
                                                </div>
                                                <div class="clear" style="margin-top:7px;" v-if='chanJieDetailUserCourseIntroduceImg'>
                                                    <img v-for='(item,ind) in chanJieDetailUserCourseIntroduceImg' :key='ind' :src="item" alt="">
                                                </div>
                                                <div class='gu_clear_guide' v-else>
                                                    <img src="../../../static/img/null-My_discussion.png" alt="">
                                                    <p class=" fz12 mt-15 c9">暂时没有哦~</p>
                                                </div>
                    </article>-->
                  </div>
                  <div
                    v-if="chanJieDetailData.canBuy"
                    class="WritingEvaluation_footFixed text-center flex"
                  >
                    <mt-button
                      class="cf lecturing"
                      v-if="chanJieDetailData.canGift"
                      @click="buyHtml('B')"
                    >{{chanJieDetailData.giftButtonText}}</mt-button>
                    <mt-button
                      class="cf signUp"
                      v-if="chanJieDetailData.canBuy"
                      @click="buyHtml('A')"
                    >
                      {{chanJieDetailData.buyButtonText}}
                      <time
                        class="dis_block fz12"
                        style="opacity: 0.5;"
                        v-if="this.downTimes != null"
                      >剩余{{downTimes}}</time>
                    </mt-button>
                  </div>
                  <!-- <div class="WritingEvaluation_footFixed text-center flex"
                                                v-if="chanJieDetailData.courseType =='1' && 
                                                    chanJieDetailData.canBuy && chanJieDetailData.canGift">
                                                <mt-button class="cf lecturing">{{chanJieDetailData.giftButtonText}}</mt-button>
                                                <mt-button class="cf signUp" @click='buyHtml'>
                                                    {{chanJieDetailData.buyButtonText}}
                                                    <time class="dis_block" v-if='this.downTimes != null'>剩余{{downTimes}}</time>
                                                </mt-button>
                  </div>-->
                  <!-- <div class="WritingEvaluation_footFixed text-center flex"
                                                v-else-if="chanJieDetailData.courseType =='1' && 
                                                !(chanJieDetailData.canBuy) && chanJieDetailData.canGift"
                                                :style="{display:'none'}">
                                                <mt-button class="cf lecturing">{{chanJieDetailData.giftButtonText}}</mt-button>
                                                <mt-button class="cf signUp">{{chanJieDetailData.buyButtonText}}</mt-button>
                                            </div>
                                            <div class="WritingEvaluation_footFixed text-center flex"
                                                v-else-if=" chanJieDetailData.courseType =='1' && !(chanJieDetailData.canBuy)
                                                && !(chanJieDetailData.canGift)"  :style="{display:'none'}">
                                                <mt-button class="cf lecturing">
                                                    {{chanJieDetailData.giftButtonText}}</mt-button>
                                                <mt-button class="cf signUp">
                                                    {{chanJieDetailData.buyButtonText}}
                                                </mt-button>
                                            </div>
                                            <div class="WritingEvaluation_footFixed text-center flex"
                                                v-else-if="chanJieDetailData.courseType =='2' && chanJieDetailData.canGift && 
                                                    chanJieDetailData.canBuy">
                                                <mt-button class="cf lecturing">{{chanJieDetailData.giftButtonText}}</mt-button>
                                                <mt-button class="cf signUp" @click='buyHtml'>{{chanJieDetailData.buyButtonText}}</mt-button>
                                            </div>
                                            <div class="WritingEvaluation_footFixed text-center flex"
                                                v-else-if="chanJieDetailData.courseType =='2' && !(chanJieDetailData.canGift)
                                                    && !(chanJieDetailData.canBuy)" :style="{display:'none'}">
                                                    
                                                <mt-button class="cf lecturing">{{chanJieDetailData.giftButtonText}}</mt-button>
                                                <mt-button class="cf signUp">{{chanJieDetailData.buyButtonText}}</mt-button>
                                            </div>
                                            <div class="WritingEvaluation_footFixed text-center flex"
                                                v-else-if="chanJieDetailData.courseType =='2' && chanJieDetailData.canGift
                                                    && !(chanJieDetailData.canBuy)"   :style="{display:'none'}">
                                                <mt-button class="cf lecturing">{{chanJieDetailData.giftButtonText}}</mt-button>
                                                <mt-button class="cf signUp">{{chanJieDetailData.buyButtonText}}</mt-button>
                  </div>-->
                </mt-tab-container-item>
                <!-- 课程内容 -->
                <mt-tab-container-item id="2">
                  <div
                    class="mobile_content"
                    @touchstart="leftRightStartTwo"
                    @touchmove="leftRightMoveTwo"
                  >
                    <article class="dis_flow_root mt-50 pos_r">
                      <ChanJieDetailUserClassHourList
                        :FiexTop="FiexTop"
                        :FiexTopAdd="FiexTopAdd"
                        v-if="ValueTbale=='2'"
                        :data="chanJieDetailUserclasshourList.userClassHourResponseVos"
                        :purchased="chanJieDetailData.purchased"
                      />
                      <p
                        class="After_course text-center fz15 c4a5"
                        v-if="chanJieDetailData.purchased&&chanJieDetailData.courseType==1"
                      >您可以在{{moment(ChnageLastTime).format("YYYY年MM月DD日")}}之前提交作业和将作业发布到“晒作业”与大家分享</p>
                      <p
                        class="After_course text-center fz15 c4a5"
                        v-if="chanJieDetailData.purchased&&chanJieDetailData.courseType==2"
                      >
                        录播课学习有效期提示：
                        该课程自报名之日起的2年内有效，截至{{moment(ChnageLastTime).format("YYYY年MM月DD日")}}之前，您都可以观看视频，提交作业和将作业发布到“晒作业”与大家分享哦～
                      </p>
                      <!-- 暂时没有哦 -->
                      <div
                        v-if="chanJieDetailUserclasshourList.total == 0"
                        class="gu_clear_guide"
                        style="margin-top:3rem !important;"
                      >
                        <img src="../../../static/img/null-My_discussion.png" alt />
                        <p class="fz12 mt-15 c9">暂时没有哦~</p>
                      </div>
                    </article>
                  </div>
                  <div
                    v-if="chanJieDetailData.canBuy"
                    class="WritingEvaluation_footFixed text-center flex"
                  >
                    <mt-button
                      class="cf lecturing"
                      v-if="chanJieDetailData.canGift"
                      @click="buyHtml('B')"
                    >{{chanJieDetailData.giftButtonText}}</mt-button>
                    <mt-button
                      class="cf signUp"
                      v-if="chanJieDetailData.canBuy"
                      @click="buyHtml('A')"
                    >
                      {{chanJieDetailData.buyButtonText}}
                      <time
                        class="dis_block fz12"
                        style="opacity: 0.5;"
                        v-if="this.downTimes != null"
                      >剩余{{downTimes}}</time>
                    </mt-button>
                  </div>
                  <!-- <div class="WritingEvaluation_footFixed text-center flex"
                                                v-if="chanJieDetailData.courseType =='1' && 
                                                    chanJieDetailData.canBuy && chanJieDetailData.canGift">
                                                <mt-button class="cf lecturing">{{chanJieDetailData.giftButtonText}}</mt-button>
                                                <mt-button class="cf signUp"  @click='buyHtml'>
                                                    {{chanJieDetailData.buyButtonText}}
                                                    <time class="dis_block" v-if='this.downTimes != null'>剩余{{downTimes}}</time>
                                                </mt-button>
                  </div>-->
                  <!-- <div class="WritingEvaluation_footFixed text-center flex"
                                                v-else-if="chanJieDetailData.courseType =='1' && 
                                                !(chanJieDetailData.canBuy) && chanJieDetailData.canGift"
                                                :style="{display:'none'}">
                                                <mt-button class="cf lecturing">{{chanJieDetailData.giftButtonText}}</mt-button>
                                                <mt-button class="cf signUp">{{chanJieDetailData.buyButtonText}}</mt-button>
                                            </div>
                                            <div class="WritingEvaluation_footFixed text-center flex"
                                                v-else-if=" chanJieDetailData.courseType =='1' && !(chanJieDetailData.canBuy)
                                                && !(chanJieDetailData.canGift)"  :style="{display:'none'}">
                                                <mt-button class="cf lecturing">
                                                    {{chanJieDetailData.giftButtonText}}</mt-button>
                                                <mt-button class="cf signUp">
                                                    {{chanJieDetailData.buyButtonText}}
                                                </mt-button>
                                            </div>
                                            <div class="WritingEvaluation_footFixed text-center flex"
                                                v-else-if="chanJieDetailData.courseType =='2' && chanJieDetailData.canGift && 
                                                    chanJieDetailData.canBuy">
                                                <mt-button class="cf lecturing">{{chanJieDetailData.giftButtonText}}</mt-button>
                                                <mt-button class="cf signUp"  @click='buyHtml'>{{chanJieDetailData.buyButtonText}}</mt-button>
                                            </div>
                                            <div class="WritingEvaluation_footFixed text-center flex"
                                                v-else-if="chanJieDetailData.courseType =='2' && !(chanJieDetailData.canGift)
                                                    && !(chanJieDetailData.canBuy)" :style="{display:'none'}">
                                                    
                                                <mt-button class="cf lecturing">{{chanJieDetailData.giftButtonText}}</mt-button>
                                                <mt-button class="cf signUp">{{chanJieDetailData.buyButtonText}}</mt-button>
                                            </div>
                                            <div class="WritingEvaluation_footFixed text-center flex"
                                                v-else-if="chanJieDetailData.courseType =='2' && chanJieDetailData.canGift
                                                    && !(chanJieDetailData.canBuy)"   :style="{display:'none'}">
                                                <mt-button class="cf lecturing">{{chanJieDetailData.giftButtonText}}</mt-button>
                                                <mt-button class="cf signUp">{{chanJieDetailData.buyButtonText}}</mt-button>
                  </div>-->
                </mt-tab-container-item>
                <!-- 晒作业 -->
                <mt-tab-container-item id="3">
                  <div
                    class="mobile_content"
                    @touchstart="leftRightStartThr"
                    @touchmove="leftRightMoveThr"
                  >
                    <div
                      class="My_ChairList-title mt-30 mb-20"
                      @click="goBaskHomeWork()"
                      v-if="chanJieDetailData.purchased&& !LastTimeFlag"
                    >
                      <img :src="userInfoImag" alt />
                      <a href="javascript:void(0);" slot="left">
                        <span class="fz15 c4a5">跟同学分享一下你的作业吧</span>
                      </a>
                    </div>
                    <article class="dis_flow_root mt-30">
                      <div>
                        <div
                          class="nav BaskHomework_btn mb-20"
                          v-if="chanJieDetailData.purchased&& !LastTimeFlag"
                        >
                          <mt-button
                            size="small"
                            v-for="(item,index) in arr"
                            :key="index"
                            @click.native.prevent="buttonActive(index)"
                            :class="defaultIndex == index ? 'active':''"
                          >{{item}}</mt-button>
                        </div>
                        <div
                          class="gu_clear_guide"
                          style="marginTop:3rem!important;"
                          v-if="!chanJieDetailData.purchased ||  LastTimeFlag"
                          :style="{'paddingBottom':chanJieDetailData.canBuy?'4rem':''}"
                        >
                          <img src="../../../static/img/null-My_discussion.png" alt />
                          <p class="fz12 mt-15 c9">报名后,可以浏览晒作业栏哦~</p>
                        </div>
                        <div
                          class="page-tab-container"
                          v-else-if="chanJieDetailHomeWorkSunList.total > 0 && !LastTimeFlag"
                        >
                          <mt-tab-container
                            class="page-tabbar-tab-container"
                            v-model="activeBaskHomework"
                          >
                            <mt-tab-container-item id="tab-BaskHomework1">
                              <ChanJieDetailHomeWorkSunList
                                key="1"
                                v-if="ValueTbale=='3'"
                                :data="chanJieDetailHomeWorkSunList"
                                @homeWorkSunParent="homeWorkSunParent"
                                :typeSun="typeSun"
                                :FiexTop="FiexTop"
                                :FiexTopAdd="FiexTopAdd"
                              />
                            </mt-tab-container-item>
                            <mt-tab-container-item id="tab-BaskHomework2">
                              <ChanJieDetailHomeWorkSunList
                                key="2"
                                :FiexTop="FiexTop"
                                :FiexTopAdd="FiexTopAdd"
                                v-if="ValueTbale=='3'"
                                :data="chanJieDetailHomeWorkSunList"
                                @homeWorkSunParent="homeWorkSunParent"
                                :typeSun="typeSun"
                              />
                            </mt-tab-container-item>
                          </mt-tab-container>
                        </div>
                        <!-- 暂时没有哦  -->
                        <div
                          class="gu_clear_guide"
                          v-else
                          style="marginTop:3rem!important;marginBottom:3rem!important;"
                          :style="{'paddingBottom':chanJieDetailData.canBuy?'4rem':''}"
                        >
                          <img src="../../../static/img/null-My_discussion.png" alt />
                          <p class="fz12 mt-15 c9">暂时没有哦~</p>
                        </div>
                      </div>
                    </article>
                  </div>
                  <div
                    v-if="chanJieDetailData.canBuy"
                    class="WritingEvaluation_footFixed text-center flex"
                  >
                    <mt-button
                      class="cf lecturing"
                      v-if="chanJieDetailData.canGift"
                      @click="buyHtml('B')"
                    >{{chanJieDetailData.giftButtonText}}</mt-button>
                    <mt-button
                      class="cf signUp"
                      v-if="chanJieDetailData.canBuy"
                      @click="buyHtml('A')"
                    >
                      {{chanJieDetailData.buyButtonText}}
                      <time
                        class="dis_block fz12"
                        style="opacity: 0.5;"
                        v-if="this.downTimes != null"
                      >剩余{{downTimes}}</time>
                    </mt-button>
                  </div>
                </mt-tab-container-item>
                <!-- 课程评价 -->
                <mt-tab-container-item id="4">
                  <div
                    class="mobile_content"
                    @touchstart="leftRightStartFour"
                    @touchmove="leftRightMoveFour"
                  >
                    <!--evaluation 全部评价 -->
                    <article
                      class="dis_flow_root mt-30 gu_courseComment"
                      v-if="chanJieDetailCourseCommentList.total > 0"
                    >
                      <ChanJieDetailCourseCommentList
                        v-if="ValueTbale=='4'"
                        :data="newObj"
                        :FiexTop="FiexTop"
                        :FiexTopAdd="FiexTopAdd"
                        :paddingFlag="
                                                chanJieDetailData.purchased&&JSON.stringify(chanJieDetailCourseCommentList.userCommentList)=='[]'
                                                ||chanJieDetailData.canBuy"
                      />
                      <div v-if="addFlag" class="gu_addBox">已经加载到底了</div>
                    </article>
                    <!-- v-else -->
                    <div
                      class="gu_clear_guide"
                      v-else
                      style="margin-top:3rem !important;"
                      :style="{'paddingBottom':chanJieDetailData.canBuy?'4rem':''}"
                    >
                      <img src="../../../static/img/null-My_discussion.png" alt />
                      <p class="fz12 mt-15 c9">暂时没有哦~</p>
                    </div>
                  </div>
                  <div
                    class="WritingEvaluation_footFixed text-center"
                    v-if="chanJieDetailData.purchased&&JSON.stringify(chanJieDetailCourseCommentList.userCommentList)=='[]'&& !LastTimeFlag"
                  >
                    <mt-button class="cf" @click="goChanJiewriteEvaluate">写留言</mt-button>
                  </div>
                  <!-- <div class="WritingEvaluation_footFixed text-center">
                                            <mt-button class="cf" @click='goChanJiewriteEvaluate'>写留言</mt-button>
                  </div>-->
                  <div
                    v-if="chanJieDetailData.canBuy"
                    class="WritingEvaluation_footFixed text-center flex"
                  >
                    <mt-button
                      class="cf lecturing"
                      v-if="chanJieDetailData.canGift"
                      @click="buyHtml('B')"
                    >{{chanJieDetailData.giftButtonText}}</mt-button>
                    <mt-button
                      class="cf signUp"
                      v-if="chanJieDetailData.canBuy"
                      @click="buyHtml('A')"
                    >
                      {{chanJieDetailData.buyButtonText}}
                      <time
                        class="dis_block fz12"
                        style="opacity: 0.5;"
                        v-if="this.downTimes != null"
                      >剩余{{downTimes}}</time>
                    </mt-button>
                  </div>
                </mt-tab-container-item>
              </mt-tab-container>
            </article>
          </div>
        </article>
      </div>
    </div>
    <mt-popup v-model="popupVisible" :modal="false" popup-transition="popup-fade" position="bottom">
      <div class="gu_beforeClass" style>
        <h3>开课前请了解</h3>
        <div class="showPord">
          <img src="../../../static/icon/X-2.png" @click="removeBuy1" alt />
        </div>
        <p
          class="gu_beforepclass"
          v-html="chanJieDetailData.understandBefore"
          :style="{
                            'letterSpacing':'2px',
                            'lineHeight':'20px'
                        }"
        >
          <!-- {{}} -->
          <!-- 这是我们写《孔子庙堂碑》的第一堂课。在我们学习次第中，到虞世南，也就来到了“减法”那一步。虞世南的字非常含蓄，有难得的静气。我们在褚遂良处丰富了线条的变化，便回身临写虞世南。在临摹中体会他的虚静气质，能够收敛一些写完褚遂良以后易有的妍媚，学会如何把字写得安静平正。 这是我们 写《孔子庙堂碑》的第一堂课。在我们学习次第中，到虞世南，也就来到了“减法”那一步。虞世南的字非常含蓄，有难得的静气。我们在褚遂良处丰富了线条的变化，便回身临写虞世南。在临摹中体会他的虚静气质，能够收敛一些写完褚遂良以后易有的妍媚，学会如何把字写得安静平正。
          这是我们写《孔子庙堂碑》的第一堂课。在我们学习次第中，到虞世南，也就来到… 虞世南的字非常含蓄，有难得的静气。我们在褚遂良处丰富了线条的变化，便回身临写虞世南。在临摹中体会他的虚静气质，能够收敛一些写完褚遂良以后易有的妍媚，学会如何把字写得安静平正。 这是我们写《孔子庙堂碑》的第一堂课。在我们学习次第中，到虞世南，也就来到了“减法”那一步。-->
        </p>
      </div>
    </mt-popup>
    <mt-popup
      v-model="popupVisible1"
      :modal="false"
      popup-transition="popup-fade"
      position="bottom"
    >
      <div class="showPord">
        <img src="../../../static/icon/X-2.png" @click="removeBuy" alt />
      </div>
      <h3>{{buyTypes=='true'?'赠课前请了解':'报名前请了解'}}</h3>
      <div class="gu_beforeClassBox" ref="gu_beforeClassBox">
        <div class="gu_beforeClass" style="padding-right:1.6rem;">
          <div class="beforeBox" v-if="chanJieDetailData.courseTypeName=='直播课'&&buyTypes=='true'">
            <p>
              <span>课程回放：</span>如果
              <b>Ta</b>需要补课或复习，请于每节直播课程结束后观看回放，回放有效期为
              <b>{{obj.coursePlaybackDays}}</b>天，即当堂直播课程结束后有
              <b>{{obj.coursePlaybackDays}}</b>天补课或复习，课程视频
              <b>不提供下载。</b>
            </p>
            <p>
              <span>关于退课：</span>如需退课，请
              <b>Ta</b>于
              <b>第一节直播课开始</b>前，在“我的订单”中提出退课申请，申请审核通过后学费将原路返回
              <b>您</b>的账户。直播课程开始后，将不再接受退课申请。
            </p>
            <p>
              <span>开具增值税普通发票（电子发票）：</span>如果需要发票，请在
              <b>您本人</b>的“我的订单”中提出发票申请，教室将于第一节直播课开始后开具电子发票。
            </p>
            <p class="chnageLastTimetishi">
              <b>Ta</b>可以在
              <b>{{moment(ChnageLastTime).format("YYYY年MM月DD日")}}</b>之前提交作业和将作业发布到“晒作业”与大家分享，以及下载学习资料。
            </p>
          </div>
          <div class="beforeBox" v-if="chanJieDetailData.courseTypeName=='直播课'&&buyTypes=='false'">
            <p>
              <span>课程回放：</span>如果您需要补课或复习，请于每节直播课程结束后观看回放，回放有效期为
              <b>{{obj.coursePlaybackDays}}</b>天，即当堂直播课程结束后有
              <b>{{obj.coursePlaybackDays}}</b>天补课或复习，课程视频
              <b>不提供下载。</b>
            </p>
            <p>
              <span>关于退课：</span>如需退课，请您于
              <b>第一节直播课开始</b>前，在“我的订单”中提出退课申请，申请审核通过后将全额退款。直播课程开始后，将不再接受退课申请。
            </p>
            <p>
              <span>开具增值税普通发票（电子发票）：</span>如果您需要发票，请在“我的订单”中提出发票申请，教室将于第一节直播课开始后开具电子发票。
            </p>
            <p class="chnageLastTimetishi">
              您可以在
              <b>{{moment(ChnageLastTime).format("YYYY年MM月DD日")}}</b>之前下载学习资料、提交作业和将作业发布到“晒作业”与大家分享。
            </p>
          </div>
          <div class="beforeBox" v-if="chanJieDetailData.courseTypeName=='录播课'&&buyTypes=='false'">
            <p v-if="!obj.studyValidiyEnable">
              您可以在
              <b>{{obj.studyValidityPeriod/365}}年内</b>无限次观看和复习此课程，提交作业和将作业发布到“晒作业”与大家分享，以及下载学习资料（课程视频
              <b>不提供下载。</b>）
            </p>
            <p v-if="obj.studyValidiyEnable">
              您可以
              <b>不限时无限次</b>观看和复习此课程，提交作业和将作业发布到“晒作业”与大家分享，以及下载学习资料（课程视频
              <b>不提供下载</b>）。
            </p>
            <p v-if="obj.studyValidiyEnable">
              您可以
              <b>不限时无限次</b>观看和复习此课程，提交作业和将作业发布到“晒作业”与大家分享，以及下载学习资料（课程视频
              <b>不提供下载</b>）
            </p>
            <p>
              <span>关于退课：</span>录播形式的虚拟内容服务，报名后，不支持退课，这个很重要，请注意哦。
            </p>
            <p>
              <span>开具增值税普通发票（电子发票）：</span>如果您需要发票，请在“我的订单”中提出发票申请，教室将为您开具电子发票。
            </p>
          </div>
          <div class="beforeBox" v-if="chanJieDetailData.courseTypeName=='录播课'&&buyTypes=='true'">
            <p v-if="!obj.studyValidiyEnable">
              <b>Ta</b>可以在
              <b>{{obj.studyValidityPeriod/365}}年内</b>无限次观看和复习此课程，提交作业和将作业发布到“晒作业”与大家分享，以及下载学习资料（课程视频
              <b>不提供下载</b>）。
            </p>
            <p v-if="obj.studyValidiyEnable">
              Ta可以
              <b>不限时无限次</b>无限次观看和复习此课程，提交作业和将作业发布到“晒作业”与大家分享，以及下载学习资料（课程视频
              <b>不提供下载</b>）。
            </p>
            <p>
              <span>关于退课：</span>录播形式的虚拟内容服务，报名后，不支持退课，这个很重要，请注意哦。
            </p>
            <p>
              <span>开具增值税普通发票（电子发票）：</span>如果您需要发票，请在“我的订单”中提出发票申请，教室将为您开具电子发票。
            </p>
          </div>
          <div
            class="classBox"
            style=" line-height: 1.5rem;"
            v-if="buyTypes=='true'"
          >在Ta拆开课程礼物之后，教室也将告诉Ta前往课程页面查看以上信息哦～</div>
          <div class="classBox" v-if="buyTypes=='false'">祝您在暄桐教室学习愉快～</div>
          <div class="remmberBox" @click="remmberFlagClick">
            <span :class="remmberFlag?'remmbers':'remmbersflag'"></span>
            <div class="remmberLeft">我已看过并同意</div>
            <span
              @click.stop="goServiceterms"
              class="c4a5 dis_in_block remmberRight"
            >{{allCourseBuyAgreementData.protocolName}}</span>
          </div>
          <!-- <label for="remmber" style="position:relative;display:flex;align-items: center;height:1.5rem;paddingBottom:1rem">
                            <input class="remmber" type="checkbox" name="remmber" id="remmber" ref='ipt'>
                            <span></span>
                            <div class="remmberLeft">我已看过并同意</div> 
                            <span @click = 'goServiceterms' style="font-size: .9rem;" class="c4a5 dis_in_block remmberRight">《{{allCourseBuyAgreementData.protocolName}}》</span>
          </label>-->
        </div>
      </div>
      <div class="footer">
        <span @click="removeBuy">不同意</span>
        <span v-if="this.DownIndex  > 0" style="background:#ccc">
          同意
          <i ref="iDown">({{this.DownIndex}}s)</i>
        </span>
        <span v-else @click="goisInfo(chanJieDetailData.courseId)">同意</span>
      </div>
    </mt-popup>
    <div v-if="popupVisible1||popupVisible" class="popupVisibleModel" @touchmove.prevent></div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Indicator, Popup } from "mint-ui";
import {
  downTime,
  addMore,
  getUserInfoCookie,
  setUserInfoCookie,
  getCookie
} from "../../public/index";
import chanjieintroduce from "../../component/chanJieDetail/chanjieintroduce";
import ChanJieDetailUserClassHourList from "../../component/chanJieDetail/chanJieDetailUserclasshourList";
import ChanJieDetailHomeWorkSunList from "../../component/chanJieDetail/chanJieDetailHomeWorkSunList";
import ChanJieDetailCourseCommentList from "../../component/chanJieDetail/chanJieDetailCourseCommentList";
import moment from "moment";
import Videos from "../../component/videoFrees";
import Bscroll from "better-scroll";
import { react } from "babel-types";
export default {
  name: "chanjiedetail",
  data() {
    return {
      ChanjieTable: "0",
      ValueTbale: null,
      activeBaskHomework: "tab-BaskHomework1",
      obj: {}, //处理数据里面json格式 处理学习有效期 学习回放时间等
      downTimes: "", //倒计时时间
      BuyDownTimes: 10, //记录报名倒计时时间
      timer: null, //定时器
      arr: ["最新", "最热"],
      defaultIndex: 0, //最新 最热的切换下标
      chanJieId: "", //用于存储单阶id
      count: 1, //评价加载更多 计数
      newArr: [], //用于拼接 评价数据
      newObj: {}, // 用于存储拼接好的值
      addFlag: false, //用于加载更多显示加载全部
      typeSun: "create_time", // 最新 最热的切换
      studyTime: "", //和课程截止时间作比较
      popupVisible: false, //控制报名前了结弹窗
      popupVisible1: false, //控制购买前了解弹窗
      top: "", // 记录导航距离顶部的位置
      backFlag: false, //控制导航条返回键
      pageX: "", //存储页面的X坐标值
      buyTypes: "false",
      isParseB: true,
      FiexTop: null,
      userInfoImag: null,
      goServicetermsFlag: false, //去看协议不销毁定时器
      remmberFlag: false,
      clickflag: true
    };
  },
  destroyed() {
    //console.log('55555')
    window.onscroll = null;
    if (this.goServicetermsFlag) {
    } else {
      this.getChangeInterval();
      this.getChangeDown(10);
    }
  },
  created() {
    this.$nextTick(() => {
      this.scrollBox = new Bscroll(this.$refs.gu_beforeClassBox, {
        //初始化better-scroll
        probeType: 3, //1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        click: true, //是否派发click事件
        scrollY: true
      });
    });
  },
  components: {
    ChanJieDetailUserClassHourList,
    chanjieintroduce,
    ChanJieDetailHomeWorkSunList,
    ChanJieDetailCourseCommentList,
    Videos
  },
  beforeRouteEnter(to, from, next) {
    if (
      from.path == "/index/indexclass" ||
      from.path == "/myorder" ||
      from.path == "/search" ||
      from.path == "/myapplyallcourse" ||
      from.path == "/xtmenulist2"
    ) {
      window.localStorage.setItem("indexclassUrlFlag", from.path);
    }
    if (from.path == "/perfectPersonalInformation") {
      next(vm => {
        vm.Twoisneed(vm.chanJieDetailData.courseId);
      });
    }
    if (from.path == "/serviceterms") {
      if (chanJieBackUrl) {
        window.localStorage.setItem("chanJieBackUrl", chanJieBackUrl);
      }
      next(vm => {
        // clearInterval(vm.timer)
        // //console.log(vm.buytype, 'buytype')
        // vm.BuyDownTime()
        vm.popupVisible1 = true;
        document.getElementById("app").style = "position:fixed;top:0";
        let chanjiePurchased = window.localStorage.getItem(
          "chanjiePurchased",
          false
        );
        if (chanjiePurchased) {
          vm.ChanjieTable = "2";
        } else {
          vm.ChanjieTable = "1";
        }
      });
    }
    let chanJieBackUrl = window.localStorage.getItem("chanJieBackUrl");
    if (from.path == "/chanjiedetailwriteevaluate") {
      if (chanJieBackUrl) {
        window.localStorage.setItem("chanJieBackUrl", chanJieBackUrl);
      }
      next(vm => {
        vm.isParseB = false;
        vm.ChanjieTable = "4";
      });
    } else if (
      from.path == "/chanjiedetaildiscuss" ||
      from.path == "/chanjiedetailbaskhomework" ||
      from.path == "/phonelogin" ||
      from.path == "/emaillogin" ||
      from.path == "/mychatmessage" ||
      from.path == "/myMessageAll" ||
      from.path == "/mymessageall"
    ) {
      if (chanJieBackUrl) {
        window.localStorage.setItem("chanJieBackUrl", chanJieBackUrl);
      }
      next(vm => {
        vm.isParseB = false;
        vm.ChanjieTable = "3";
      });
    } else if (
      from.path == "/chanjiedetailtasktreedetails" ||
      from.path == "/chanjiedetailwinreview"
    ) {
      if (chanJieBackUrl) {
        window.localStorage.setItem("chanJieBackUrl", chanJieBackUrl);
      }
      next(vm => {
        vm.ChanjieTable = "2";
      });
    } else if (from.path == "/") {
      if (chanJieBackUrl) {
        window.localStorage.setItem("chanJieBackUrl", chanJieBackUrl);
      }
      next(vm => {
        // vm.getChangeDown(10)
        // this.getChangeInterval()
        let chanjiePurchased = window.localStorage.getItem(
          "chanjiePurchased",
          false
        );
        if (chanjiePurchased) {
          vm.ChanjieTable = "2";
        } else {
          vm.ChanjieTable = "1";
        }
      });
    } else if (from.path == "/allCourseSubmitOrder") {
      next(vm => {
        vm.getChangeDown(10);
        vm.getChangeInterval();
        if (vm.chanJieDetailData.purchased) {
          vm.ChanjieTable = "2";
        } else {
          vm.ChanjieTable = "1";
        }
      });
    } else {
      window.localStorage.setItem("chanJieBackUrl", from.path);
      next(vm => {
        if (vm.chanJieDetailData.purchased) {
          vm.ChanjieTable = "2";
        } else {
          vm.ChanjieTable = "1";
        }
      });
    }
    next();
  },
  watch: {
    touchstartScroll() {
      this.$nextTick(() => {
        this.scrollBox = new Bscroll(this.$refs.gu_beforeClassBox, {
          //初始化better-scroll
          probeType: 3, //1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
          click: true, //是否派发click事件
          scrollY: true
        });
      });
    },
    DownIndex(newVal, oldVal) {
      if (newVal <= 0) {
        this.getChangeInterval();
      }
    },
    //报名协议
    popupVisible1(newVal, oldVal) {
      this.$refs.bigBox.classList.add("bigBoxactive");
      if (!newVal) {
        this.$refs.bigBox.classList.remove("bigBoxactive");
        this.getChangeInterval();
        this.getChangeDown(10);
      }
    },
    //开课请了解
    popupVisible(newVal, oldVal) {
      this.$refs.bigBox.classList.add("bigBoxactive");
      if (!newVal) {
        this.$refs.bigBox.classList.remove("bigBoxactive");
      }
    },
    async ChanjieTable(val, oldVal) {
      this.ValueTbale = val;
      let that = this;
      if (val == "2") {
        let data = {
          courseId: this.$route.query.id || this.chanJieId,
          token: ""
        };
        await this.getChanJieDetailUserclasshourAction(data);
        window.localStorage.setItem("SunActionList", JSON.stringify([]));
        await this.getChanJieDetailHomeWorkSunAction(
          this.disposedata2(this.typeSun)
        );
        this.$refs.bigBox.addEventListener("scroll", this.Scroll);
      } else if (val == "3") {
        if (this.chanJieDetailHomeWorkSunList.length <= 0) {
          await this.getChanJieDetailHomeWorkSunAction(
            this.disposedata2(this.typeSun)
          );
          window.localStorage.setItem(
            "SunActionList",
            JSON.stringify(this.chanJieDetailHomeWorkSunList)
          );
        }
      } else if (val == "4") {
        this.$refs.bigBox.addEventListener("scroll", this.Scroll);
        this.count = 1;
        this.newArr = [];
        this.addFlag = false;
        init(that);
        async function init(that) {
          await that.getChanJieDetailCourseCommentAction(
            that.disposedata1(that)
          );
          if (that.chanJieDetailCourseCommentList.courseCommentResponseVos) {
            that.newArr = addMore(
              that.chanJieDetailCourseCommentList,
              that.newArr
            );
            that.newObj = {
              ...that.newObj,
              size: that.chanJieDetailCourseCommentList.size,
              total: that.chanJieDetailCourseCommentList.total,
              courseCommentResponseVos: that.newArr
            };
          }
        }
      } else {
        this.$refs.bigBox.addEventListener("scroll", this.Scroll);
        let data = {
          courseId: this.chanJieId,
          courseType: 1
        };
        this.getChanJieDetailUserCourseIntroduceAction(data);
      }
    }
  },
  beforeDestroy() {
    // this.getChangeInterval()
    // this.getChangeDown(10)
    this.$refs.bigBox.removeEventListener("scroll", this.Scroll);
  },
  beforeRouteLeave(to, from, next) {
    if (
      to.path == "/chanjiedetaildiscuss" ||
      to.path == "/chanjiedetailbaskhomework"
    ) {
      var H =
        window.pageYOffset ||
        document.body.scrollTop ||
        document.body.scrollHeight;
      let scrollToNum = window.sessionStorage.setItem(
        "chanjiedetailscrollNum",
        H
      );
    } else {
      window.sessionStorage.setItem("chanjiedetailscrollNum", 0);
    }
    next();
  },
  async mounted() {
    if (!getUserInfoCookie() || getUserInfoCookie() == "undefined") {
    } else {
      this.$axios
        .post("/user/getuserinfo", {
          //修改getuserInfo
          token: ""
        })
        .then(res => {
          setUserInfoCookie(res.data.result);
          if (res.data.result) {
            this.userInfoImag = res.data.result.headUri;
          }
        });
    }
    this.$GifToast(false);
    this.buyTypes = window.localStorage.getItem("buyTypes");
    if (this.$route.query.id == undefined) {
      this.chanJieId = window.localStorage.getItem("chanJieId");
    } else {
      this.chanJieId = this.$route.query.id;
      window.localStorage.setItem("chanJieId", this.$route.query.id);
      window.localStorage.setItem("chanJieIdOder", this.$route.query.id);
    }
    await this.getChanJieDetailAction({
      courseId: this.chanJieId,
      token: ""
    });
    window.localStorage.setItem(
      "courseType",
      this.chanJieDetailData.courseType
    );
    window.localStorage.setItem(
      "courseTypeOder",
      this.chanJieDetailData.courseType
    );
    if (this.$refs.tab) {
      this.top = this.$refs.tab.offsetTop;
    }
    await this.parseObj();
    await this.downNowTime();
    // //console.log(this.chanJieDetailData, "asdasd dqwd ")
    window.localStorage.setItem(
      "chanjiePurchased",
      this.chanJieDetailData.purchased
    );
    // //console.log(this.BuyDownTime(this.chanJieDetailUserclasshourList.userClassHourResponseVos),'我回来了')
    let that = this;
    let chanjiedetailscrollNum = window.sessionStorage.getItem(
      "chanjiedetailscrollNum"
    );
    window.scrollTo(chanjiedetailscrollNum, chanjiedetailscrollNum);
    this.$nextTick(() => {
      setTimeout(() => {
        if (that.$refs.tab) {
          that.$refs.tabFexld.classList.remove("zhanweiactive");
          that.$refs.tab.classList.remove("active");
          this.FiexTop = that.$refs.tab.offsetTop;
          let Tops = that.$refs.tab.offsetTop;
          window.onscroll = function() {
            if (that.getScrollTop() >= Tops + 20) {
              // Before1_course
              that.$refs.tab.classList.add("active");
              that.$refs.tabFexld.classList.add("zhanweiactive");
              if (
                that.chanJieDetailData.purchased &&
                that.ChanjieTable == "2"
              ) {
                that.$refs.Beforecourse.classList.add("Before_courseActive");
              }
            } else {
              that.$refs.tabFexld.classList.remove("zhanweiactive");
              that.$refs.tab.classList.remove("active");
              if (
                that.chanJieDetailData.purchased &&
                that.ChanjieTable == "2"
              ) {
                that.$refs.Beforecourse.classList.remove("Before_courseActive");
              }
            }
          };
        }
        var H =
          window.pageYOffset ||
          document.body.scrollTop ||
          document.body.scrollHeight;
        if (
          H < chanjiedetailscrollNum - 20 ||
          H > chanjiedetailscrollNum + 20
        ) {
          window.scrollTo(chanjiedetailscrollNum, chanjiedetailscrollNum);
        }
      }, 100);
    });
    if (this.isParseB) {
      if (this.chanJieDetailData.purchased) {
        this.ChanjieTable = "2";
      } else {
        this.ChanjieTable = "1";
      }
    }
    window.localStorage.setItem(
      "courseDynamicElementTime",
      this.chanJieDetailData.courseDynamicElement
    );
    this.initStundentTime(
      JSON.parse(this.chanJieDetailData.courseDynamicElement)
    );
    //console.log(JSON.parse(this.chanJieDetailData.courseDynamicElement))
    // this.$axios.post('/utility/getUrl',{key:this.chairMoreListDetail.courseVideoUri}).then(res=>{
    //     // this.Rurl =  res.data.result
    //     //console.log(this.Rurl,'5555555555555')
    // //   this.videoObj =  this.data;
    //     // this.flag = true
    // })
    if (!this.chanJieDetailData.isView) {
      this.classBefore();
    }

    //console.log(this.chanJieDetailData.isView,'isViewisViewisViewisViewisView')
  },
  computed: {
    ...mapState({
      //存储是否赠课
      buytype: state => state.chanJieDetailStore.buytype,
      //倒计时
      DownIndex: state => state.chanJieDetailStore.DownIndex,
      //单阶详情数据
      chanJieDetailData: state => state.chanJieDetailStore.chanJieDetailData,
      //单阶介绍
      chanJieDetailUserCourseIntroduceImg: state =>
        state.chanJieDetailStore.chanJieDetailUserCourseIntroduceImg,
      //单阶任务树 课时大纲
      chanJieDetailUserclasshourList: state =>
        state.chanJieDetailStore.chanJieDetailUserclasshourList,
      //单阶晒作业
      chanJieDetailHomeWorkSunList: state =>
        state.chanJieDetailStore.chanJieDetailHomeWorkSunList,
      //单阶写评价
      chanJieDetailCourseCommentList: state =>
        state.chanJieDetailStore.chanJieDetailCourseCommentList,
      //购买提示数据
      allCourseBuyHintData: state =>
        state.allCourseDetailStore.allCourseBuyHintData,
      //购买协议数据
      allCourseBuyAgreementData: state =>
        state.allCourseDetailStore.allCourseBuyAgreementData,
      //单阶晒作业
      chanJieDetailHomeWorkAllSunApi: state =>
        state.chanJieDetailStore.chanJieDetailHomeWorkAllSunApi,

      ChnageLastTime: state => state.chanJieDetailStore.LastTime, //学习有效期

      LastTimeFlag: state => state.chanJieDetailStore.LastTimeFlag //学习有效期是否到了
    })
  },
  methods: {
    remmberFlagClick() {
      if (!this.clickflag) {
        return;
      }
      this.clickflag = false;
      this.remmberFlag = !this.remmberFlag;
      setTimeout(() => {
        this.clickflag = true;
      }, 300);
      //console.log(this.remmberFlag)
    },
    //导航吸附
    FiexTopAdd(type) {
      let that = this;
      if (type == "add") {
        that.$refs.tab.classList.add("active");
        that.$refs.tabFexld.classList.add("zhanweiactive");
        if (that.chanJieDetailData.purchased && that.ChanjieTable == "2") {
          that.$refs.Beforecourse.classList.add("Before_courseActive");
        }
      } else {
        that.$refs.tab.classList.remove("active");
        that.$refs.tabFexld.classList.remove("zhanweiactive");
        if (that.chanJieDetailData.purchased && that.ChanjieTable == "2") {
          that.$refs.Beforecourse.classList.remove("Before_courseActive");
        }
      }
    },
    ...mapActions({
      getChangebuytype: "chanJieDetailStore/getChangebuytype",
      //倒计时
      getChangeInterval: "chanJieDetailStore/getChangeInterval",
      getChangeDown: "chanJieDetailStore/getChangeDown",
      //用户个人信息
      getUserInfoAction: "phoneStore/getUserInfoAction",
      //单阶详情数据（用于订单展示）
      getChanJieDetailAction: "chanJieDetailStore/getChanJieDetailAction",
      //单阶介绍
      getChanJieDetailUserCourseIntroduceAction:
        "chanJieDetailStore/getChanJieDetailUserCourseIntroduceAction",
      //单阶任务树 课时大纲
      getChanJieDetailUserclasshourAction:
        "chanJieDetailStore/getChanJieDetailUserclasshourAction",
      //单阶晒作业
      getChanJieDetailHomeWorkSunAction:
        "chanJieDetailStore/getChanJieDetailHomeWorkSunAction",
      //单阶写评价
      getChanJieDetailCourseCommentAction:
        "chanJieDetailStore/getChanJieDetailCourseCommentAction",
      //购买前提示
      getAllCourseBuyHintAction:
        "allCourseDetailStore/getAllCourseBuyHintAction",
      //购买协议
      getAllCourseBuyAgreementAction:
        "allCourseDetailStore/getAllCourseBuyAgreementAction",
      //学习有效期
      getChnageLastTime: "chanJieDetailStore/getChnageLastTime",
      //单阶晒作业
      getChanJieDetailHomeWorkAllSunApi:
        "chanJieDetailStore/getChanJieDetailHomeWorkAllSunApi"
    }),
    touchstartScroll() {
      this.$nextTick(() => {
        this.scrollBox = new Bscroll(this.$refs.gu_beforeClassBox, {
          //初始化better-scroll
          probeType: 3, //1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
          click: true, //是否派发click事件
          scrollY: true
        });
      });
    },
    //购买单阶
    CanBuyOrder(id) {
      this.$router.push({
        path: "/allCourseSubmitOrder",
        query: {
          istype: 1, //全阶
          fullid: id, //id
          isTurnFull: false, //是否是转报全阶
          orderType: 1, //报名1   赠课4
          orderSNID: null //是否从订单页面进入
        }
      });
      document.getElementById("app").style = "position:static";
    },
    //赠送单阶
    CanGifOrder(id) {
      this.$router.push({
        path: "/allCourseSubmitOrder",
        query: {
          istype: 1, //全阶
          fullid: id, //id
          isTurnFull: false, //是否是转报全阶
          orderType: 4, //报名1   赠课4
          orderSNID: null //是否从订单页面进入
        }
      });
      document.getElementById("app").style = "position:static";
    },
    //开课前了解
    classBefore() {
      this.popupVisible = true;
      document.getElementById("app").style = "position:fixed;top:0";
    },
    removeBuy1() {
      this.popupVisible = false;
      document.getElementById("app").style = "position:static";
    },
    goBack() {
      this.getChangeInterval();
      // clearInterval(this.timer);
      this.getChangeDown(10);
      //   this.$router.push({
      //     path:'index/indexshouye',
      // })
      let chanJieBackUrl = window.localStorage.getItem("chanJieBackUrl");
      if (chanJieBackUrl) {
        this.$router.push({
          path: chanJieBackUrl
        });
        document.getElementById("app").style = "position:static";
      }
    },
    // 删除帖子和帖子点赞  刷新晒作业页面
    homeWorkSunParent() {
      this.getChanJieDetailHomeWorkSunAction(this.disposedata2(this.typeSun));
    },
    //处理成obj格式
    parseObj() {
      this.obj =
        this.chanJieDetailData &&
        JSON.parse(this.chanJieDetailData.courseDynamicElement);
      if (this.obj && this.obj.learnEndTime) {
        this.studyTime = new Date(this.obj.learnEndTime).getTime();
      }
    },
    //倒计时函数
    downNowTime() {
      if (this.obj.signDeadlineTime) {
        this.downTimes = downTime(this.obj.signDeadlineTime);
        let time = setInterval(() => {
          this.downTimes = downTime(this.obj.signDeadlineTime);
        }, 1000);
        if (this.downTimes == null) {
          clearInterval(time);
        }
      } else {
        this.downTimes = downTime("2019-4-17 20:00:00");
        let time = setInterval(() => {
          this.downTimes = downTime("2019-4-17 20:00:00");
        }, 1000);
        if (this.downTimes == null) {
          clearInterval(time);
        }
      }
    },
    //报名同意倒计时
    BuyDownTime() {
      this.getChangeDown(1);
    },
    //滚动加载更多
    async Scroll() {
      let that = this;
      let top = this.$refs.bigBox.scrollTop; //滚走高度
      let height =
        document.documentElement.offsetHeight || document.body.offsetHeight; //页面一屏高度
      if (this.ChanjieTable == 2 || this.ChanjieTable == 1) {
      }
      if (top > this.top) {
        that.$refs.tabFexld.classList.add("zhanweiactive");
        this.$refs.tab.classList.add("active");
        this.backFlag = true;
      } else if (top < this.top - 40) {
        that.$refs.tabFexld.classList.remove("zhanweiactive");
        this.$refs.tab.classList.remove("active");
        this.backFlag = false;
      }
    },
    //切换最新最热
    buttonActive(ind) {
      if (ind == "0") {
        this.typeSun = "create_time";
        this.defaultIndex = ind;
      } else {
        this.typeSun = "discussion_num";
        this.defaultIndex = ind;
      }
      this.getChanJieDetailHomeWorkSunAction(this.disposedata2(this.typeSun));
    },
    //处理公共数据1  评价列表
    disposedata1(that) {
      let data = {
        courseId: this.$route.query.id || that.chanJieId,
        courseType: 1,
        pageIndex: that.count,
        typeKey: 1,
        token: ""
      };
      return data;
    },
    //处理公共数据2  帖子列表（晒作业列表）
    disposedata2(type) {
      let data = {
        courseId: this.$route.query.id || this.chanJieId,
        pageIndex: 1,
        courseType: 1,
        sortType: type,
        token: ""
      };
      return data;
    },
    //去往写评价页面
    goChanJiewriteEvaluate() {
      this.$router.push({
        path: "/chanjiedetailwriteevaluate",
        query: {
          id: this.$route.query.id || this.chanJieId
        }
      });
      document.getElementById("app").style = "position:static";
    },
    //去往晒作业页面
    goBaskHomeWork() {
      this.$router.push({
        path: "/chanjiedetailbaskhomework",
        query: {
          id: this.$route.query.id || this.chanJieId
        }
      });
      document.getElementById("app").style = "position:static";
    },
    leftRightStartOne(e) {
      // this.pageX = e.changedTouches[0].clientX
    },
    leftRightStartTwo(e) {
      // this.pageX = e.changedTouches[0].clientX
    },
    leftRightStartThr(e) {
      // this.pageX = e.changedTouches[0].clientX
    },
    leftRightStartFour(e) {
      // this.pageX = e.changedTouches[0].clientX
    },
    leftRightMoveOne(e) {
      // if (this.pageX - e.changedTouches[0].clientX > 300) {
      //     this.ChanjieTable = '2'
      // }
    },
    leftRightMoveTwo(e) {
      // if (this.pageX - e.changedTouches[0].clientX > 300) {
      //     this.ChanjieTable = '3'
      // } else if (e.changedTouches[0].clientX - this.pageX > 300) {
      //     this.ChanjieTable = '1'
      // }
    },
    leftRightMoveThr(e) {
      // if (this.pageX - e.changedTouches[0].clientX > 300) {
      //     this.ChanjieTable = '4'
      // } else if (e.changedTouches[0].clientX - this.pageX > 300) {
      //     this.ChanjieTable = '2'
      // }
    },
    leftRightMoveFour(e) {
      // if (e.changedTouches[0].clientX - this.pageX > 300) {
      //     this.ChanjieTable = '3'
      // }
    },
    //购买前提示内容
    async buyHtml(type) {
      if (!getUserInfoCookie() || getCookie() == "undefined") {
        this.$ModelToast(true);
        return;
      }
      if (type == "A") {
        this.getChangebuytype(false);
        window.localStorage.setItem("buyTypes", "false");
        this.buyTypes = "false";
      } else {
        this.getChangebuytype(true);
        window.localStorage.setItem("buyTypes", "true");
        this.buyTypes = "true";
      }
      await this.getAllCourseBuyHintAction({});
      await this.getAllCourseBuyAgreementAction({
        courseId: this.chanJieId,
        courseType: 2
      });
      this.popupVisible1 = true;
      this.remmberFlag = false;
      document.getElementById("app").style = "position:fixed;top:0";
      this.touchstartScroll();
      //console.log(this.BuyDownTimes, '????????????')
      if (this.DownIndex > 0) {
        this.BuyDownTime();
      } else {
        this.getChangeInterval();
      }
    },
    //取消报名
    removeBuy() {
      //console.log("---111----")
      this.popupVisible1 = false;
      this.remmberFlag = false;
      document.getElementById("app").style = "position:static";
      this.getChangeInterval();
      this.getChangeDown(10);
      // this.BuyDownTimes = 10;
    },
    goNext() {
      if (!this.remmberFlag) {
        this.$Toast({
          message: "请先同意报名协议",
          position: "crntep"
        });
      } else {
      }
    },
    //去往完善信息
    goisInfo(id) {
      // //console.log(this.buytype)
      if (!this.remmberFlag) {
        this.$Toast({
          message: "请先同意报名协议",
          position: "crntep"
        });
      } else {
        if (!this.buytype) {
          this.$axios
            .post("/user/needcompleteuserinfo", {
              type: 1,
              token: ""
            })
            .then(res => {
              if (res.data.result) {
                let allCourseSubmitOrderObjs = {
                  istype: 1, //全阶
                  fullid: id, //id
                  isTurnFull: false, //是否是转报全阶
                  orderType: 1, //报名1   赠课4
                  orderSNID: null //是否从订单页面进入
                };
                //console.log(allCourseSubmitOrderObjs,"21123*----")
                window.localStorage.setItem(
                  "allCourseSubmitOrderIDs",
                  JSON.stringify(allCourseSubmitOrderObjs)
                );
                this.$router.push({
                  path: "/perfectPersonalInformation",
                  query: {
                    type: 3
                  }
                });
                document.getElementById("app").style = "position:static";
              } else {
                this.CanBuyOrder(id);
              }
            });
        } else {
          this.CanGifOrder(id);
        }
      }
    },
    //二次确认完善信息
    Twoisneed(id) {
      this.chanJieId = window.localStorage.getItem("chanJieId");
      clearInterval(this.timer);
      //console.log(this.$route.query.type,'怎么回事')

      if (this.$route.query.type == "perfectPersonalInformationOnly") {
        //console.log('怎么回事')
        return;
      }
      this.$axios
        .post("/user/needcompleteuserinfo", {
          type: 1,
          token: ""
        })
        .then(res => {
          if (res.data.result) {
            this.getAllCourseBuyHintAction({});
            this.getAllCourseBuyAgreementAction({
              courseId: this.chanJieId,
              courseType: 2
            });
            this.popupVisible1 = true;
            this.remmberFlag = false;
            document.getElementById("app").style = "position:fixed;top:0";
            this.touchstartScroll();
            //console.log(this.BuyDownTimes, '????????')
            if (this.DownIndex > 0) {
              this.BuyDownTime();
            } else {
              this.getChangeInterval();
            }
          } else {
            if (this.$route.query.type) {
              this.getAllCourseBuyHintAction({});
              this.getAllCourseBuyAgreementAction({
                courseId: this.chanJieId,
                courseType: 2
              });
              this.popupVisible1 = true;
              this.remmberFlag = false;
              document.getElementById("app").style = "position:fixed;top:0";
              this.touchstartScroll();
              //console.log(this.BuyDownTimes, '????????')
              if (this.DownIndex > 0) {
                this.BuyDownTime();
              } else {
                this.getChangeInterval();
              }
            } else {
              //console.log('我是完成')
              this.CanBuyOrder(id);
            }
          }
        });
    },
    //去往用户协议
    goServiceterms() {
      this.goServicetermsFlag = true;
      clearInterval(this.timer);
      this.$router.push({
        path: "/serviceterms",
        query: {
          type: "danJie"
        }
      });
      document.getElementById("app").style = "position:static";
    },
    goBacks() {
      let url = window.localStorage.getItem("indexclassUrlFlag");
      if (url !== "null") {
        this.$router.push({
          path: url
        });
        window.localStorage.setItem("indexclassUrlFlag", "null");
        document.getElementById("app").style = "position:static";
      } else {
        this.$router.push({
          path: "index/indexshouye"
        });
        document.getElementById("app").style = "position:static";
      }
    },
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
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop;
      return scrollTop;
    },
    moment,
    //处理学习有效期
    initStundentTime(obj) {
      if (obj.learnEndTime) {
        //直播  取learnEndTime

        let time = obj.learnEndTime;
        time = moment(time).format("YYYY-MM-DD HH:mm:ss");
        console.log(time, "我是直播学习有效期");
        this.getChnageLastTime(time);
      } else {
        //录播  取studyValidityPeriod 天数  从第二天开始算的
        let n = Number(obj.studyValidityPeriod) + 1;

        let time = moment(obj.finishTime)
          .add("d", n)
          .format("YYYY-MM-DD HH:mm:ss");

        //console.log(time,'我是录播学习有效期')
        this.getChnageLastTime(time);
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.remmberBox {
  display: flex;
  padding-bottom: 1rem;
}
.remmbersflag {
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  border: 1px solid rgba(196, 165, 127, 1);
}
.remmbers {
  display: flex;
  width: 0.8rem;
  height: 0.8rem;
  border: 1px solid rgba(196, 165, 127, 1);
  &::after {
    display: inline-block;
    width: 100%;
    height: 100%;
    content: "" !important;
    background: url("../../../static/img/duihao.png") no-repeat;
    overflow: hidden;
    background-size: 100%;
  }
}
.remmberRight {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 0.9rem;
}
.zhanweiactive {
  height: 2.92rem;
}
.popupVisibleModel {
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
}
.remmberLeft {
  padding-left: 0.5rem;
  // padding-top: .1rem;
  color: #555;
  display: inline-block;
  font-size: 0.9rem;
  flex-shrink: 0;
}
.chnageLastTimetishi {
  color: #999;
  //   padding: .3rem 0;
  font-size: 0.875rem;
}
.beforeBox {
  p {
    color: #999;
    line-height: 1.2rem;
    span {
      color: #000;
    }
    b {
      color: #097276;
      opacity: 0.7;
    }
  }
}
.gu_beforeBoxClass {
  // max-height: 17rem!important;
  // overflow-y: auto;
}
.gu_beforepclass {
  width: 100%;
  height: 15rem;
  overflow-y: auto;
}
.frreq {
  position: relative;
  .fr {
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -1rem;
  }
}
.gu_apply.gu_apply_chanjie {
  width: 20rem !important;
  margin: 1.9375rem 1.875rem;
}
.bigBoxactive {
  overflow: auto;
}
.remmber[type="checkbox"]:checked + span:after {
  font-size: 0.9rem !important;
  left: -0rem;
}
.remmber[type="checkbox"]:checked + span:after {
  font-size: 0.9rem !important;
}
#chanJieDetailBox {
  display: flex;
  flex-direction: column;
  .nav-title {
    width: 100%; // height: 50px;
  }
  .Chanjie.mt-40 {
    flex: 1; // overflow: auto;
    // -webkit-overflow-scrolling : touch;
  }
}
.mtLei40 {
  margin-top: 2.5rem;
}
.Chanjie-title {
  img {
    display: block;
  }
}
.Chanjie-content {
  padding: 0;
  overflow: hidden;
  .mint-tab-container {
    padding: 0 1.875rem 0 0;
  }
  .mobile_content {
    padding-left: 1.6875rem;
  }
  .Chanjie-body {
    padding: 0 1.875rem;
  }
  .gu_chanjieBox {
    box-sizing: border-box;
    padding: 0 1.5rem;
  }
  .page-tab-container {
    .page-tabbar-tab-container {
      padding: 0 !important;
    }
  }
}
.ChanjieTitle {
  // margin-bottom: .875rem !important;
  .fz18 {
    font-family: "FZXIYSJ";
    font-weight: 500;
  }
}
.fz15.c30 {
  margin-bottom: 0.3rem;
  color: #333;
}
.recorded {
  display: block;
  width: 2.27rem;
  height: 1.2rem;
  border-radius: 0.1875rem;
  font-weight: 300;
  padding: 0 0.1875rem !important;
  margin-right: 0.3125rem;
  text-align: center;
  line-height: 1.2rem;
  font-size: 0.7rem;
  float: left;
}
section {
  .c097.fz18 {
    font-weight: 600;
    margin-right: 0.6875rem;
  }
  .fz15 {
    margin-right: 0.68rem;
    color: #333;
  }
}
.mt-40 {
  margin-top: 0 !important;
}
.ChanjieTable .mint-navbar .mint-tab-item {
  margin: 0;
}
.mint-navbar .mint-tab-item.is-selected {
  border: 0;
  &::after {
    display: inline-block;
    content: "";
    width: 60%;
    height: 0.125rem;
    background: #c4a57f;
    border-radius: 0.06rem;
  }
}
.mint-tab-item {
  padding-bottom: 0 !important;
}
.mobile_content {
  .mt-30 {
    // margin-top: 0.93rem;
  }
}
.mobile_content article:last-child {
  margin-bottom: 0.93rem !important;
}
.BaskHomework_btn button {
  background: #fff;
  border: 1px solid #c4a57f;
  color: #c4a57f;
  &.active {
    background: #c4a57f;
    border: none;
    color: #fff !important;
  }
}
/*赠课给好友*/
.lecturing {
  width: -webkit-fill-available;
  /* width: 50%; */
  background: #fff;
  border-radius: 0px;
  color: #c4a57f !important;
  height: 100%;
}
/* 单阶-报名 */
.signUp {
  /* width: 50%; */
  width: -webkit-fill-available;
  background: #097276;
  border-radius: 0px;
  /* color: #C4A57F !important; */
  height: 100%;
}
.signUp time {
  margin-top: 4px;
}
.gu_chanjieBox {
  width: 100%;
  height: auto;
  background: #fff;
  &.active {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 100;
    padding: 0 2.25rem;
    .mint-navbar .mint-tab-item {
      padding: 0.8rem 0;
    }
  }
  .button {
    position: fixed;
    top: -0.09rem;
    left: -0.15rem;
  }
}
.gu_addBox {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: skyblue;
}
.Before_course {
  left: 0rem;
  top: 30rem;
  z-index: 20;
  .gu_c4a5_fz15 {
    margin-right: 0.2125rem;
    img {
      transform: translateY(0.1rem);
      width: 0.93rem;
      height: 0.93rem;
    }
  }
}
.Before_courseActive {
  top: 30rem !important;
}
.After_course {
  margin-top: 1rem !important;
  padding: 0 2rem;
  padding-bottom: 2rem;
  font-size: 0.8rem;
  line-height: 1.1rem; // margin-left: 1rem !important;
}
.mint-popup {
  // -webkit-overflow-scrolling: touch;
  width: 100%;
  height: 25rem;
  // padding-top: 5rem;
  overflow: hidden; // position:relative;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  .gu_beforeClass > p {
    overflow: auto; // position:absolute;
    top: 3.75rem;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 0.25rem 1.25rem;
  }
  h3 {
    flex-shrink: 0;
    text-align: center;
    margin-bottom: 1rem;
    font-weight: 400;
    font-size: 1.125rem;
    margin: 0;
    position: relative;
    width: 100%;
    top: 0;
    left: 0;
    padding-top: 1.875rem;
    padding-bottom: 1.575rem;
  }
  p {
    padding-top: 0.7rem;
    font-weight: 400;
    color: #999;
    font-size: 0.9375rem;
    line-height: 1.5rem;
    &:nth-child(1) {
      padding-top: 0;
    }
  }
  .showPord {
    width: 2rem;
    height: 2rem;
    position: absolute;
    right: 0.5rem;
    top: 0.8rem;
    z-index: 999;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .classBox {
    color: #c4a57f;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .footer {
    flex-shrink: 0;
    width: 100%;
    height: 50px;
    position: relative;
    left: 0;
    bottom: 0;
    display: flex;
    span {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      &:nth-child(1) {
        background: #fff;
        color: #c4a57f;
        box-shadow: 0 0 0.5rem 0 #e7e7e7;
      }
      &:nth-child(2) {
        background: #c4a57f;
        color: #fff;
        i {
          font-style: normal;
        }
      }
    }
  }
  .gu_beforeClassBox {
    flex: 1;
    overflow: hidden;
  }
}
.v-modal {
  background: none;
}
.gu_beforeClass {
  padding: 0 2rem;
}
.mr-10 {
  float: right;
}
.My_ChairList-title.mt-30.mb-20 {
  background: #f5f5f5;
  margin-bottom: 1.525rem;
  padding: 1rem 0;
  border-radius: 0.375rem;
  img {
    margin-left: 0.93rem;
    margin-right: 0.68rem;
  }
  span {
    color: #ccc !important;
  }
}
.nav.BaskHomework_btn.mb-20 {
  margin-bottom: 0.75rem;
}
.gu_courseComment {
  margin-top: 1.625rem;
}
</style>


