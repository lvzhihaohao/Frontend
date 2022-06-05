import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/index/index'
import IndexShouye from '@/components/index/indexShouye'//首页
import IndexClass from '@/components/index/indexClass'//上课
import IndexShop from '@/components/index/indexShop'//商店
import IndexWode from '@/components/index/indexWode'//我的
import XTCustomer from '@/components/index/XTCustomer'//我的
import ErrorPage from '@/components/index/error'//报错页面
import ImageError from '@/components/index/imageError'//报错页面
import systemError from '@/components/systemError/systemError'//维护页面


import ExperimentVideo1 from '@/components/index/ExperimentVideo1'//我的

import Search from '@/components/search/search'//首页搜索
import ShopSearch from '@/components/search/shopSearch'//商城搜索
import XtmenuList1 from '@/components/XT_menuList1/XT_menuList1'//赠课给好友
import XtmenuList2 from '@/components/XT_menuList2/XT_menuList2'//报名
import Classroomteacher from '@/components/Classroom_teacher/Classroom_teacher'//教室与老师
import Classmatework from '@/components/classmatework/classmateworkwork'//同学作业
import Peoplewrite from '@/components/People_write/People_write'//写字的人
import Thingwrite from '@/components/Thing_write/Thing_write'//写字的事
import ChairList from '@/components/ChairListMore/ChairList'//更多免费课程
import ChairDetails from '@/components/ChairListMore/ChairDetails'//免费课程详情

import ChanJieDetail from '@/components/chanjieDetail/chanJieDetail'//单阶详情
import AllCourseDetail from '@/components/allcoursedetail/allCourseDetail'//全阶详情
import AllCourseSubmitOrder from '@/components/allcoursedetail/allCourseSubmitOrder'//全阶支付订单
//单阶晒作业
import ChanJieDetailBaskHomeWork from '@/components/chanjieDetail/chanjiedetailbaskhomework/chanJieDetailBaskHomeWork'
//单阶帖子详情 和 单阶帖子讨论
import ChanJieDetailDiscuss from '@/components/chanjieDetail/chanjiedetaildiscuss/chanJieDetailDiscuss'
//单阶全部回复列表
import ChanJieDetailDiscussAll from '@/components/chanjieDetail/chanjiedetaildiscussall/chanJieDetailDiscussAll'
//单阶任务树详情
import ChanJieDetailTaskTreeDetails from '@/components/chanjieDetail/chanjiedetailtasktreedetails/chanJieDetailTaskTreeDetails'
import couse from '@/components/chanjieDetail/chanjiedetailtasktreedetails/couse'
import couseback from '@/components/chanjieDetail/chanjiedetailtasktreedetails/couseback'

//单阶学习回顾
import ChanJieDetailWinReview from '@/components/chanjieDetail/chanjiedetailwinreview/chanJieDetailWinReview'
//单阶写评价
import ChanJieDetailWriteEvaluate from '@/components/chanjieDetail/chanJieDetailWriteEvaluate/chanJieDetailWriteEvaluate'
//单阶提交作业
import ChanJieTaskTreeDetailSubmitWork from '@/components/chanjieDetail/chanjietasktreedetailsubmitwork/chanJieTaskTreeDetailSubmitWork'
//单阶我的作业（提交过的）
import ChanJieDetailMySubmiTypeWork from '@/components/chanjieDetail/chanjiedetailmysubmitypework/chanJieDetailMySubmitTypeWork'
import TypeWorkDetail from '../components/chanjieDetail/typeWorkDetail/typeWorkDetail'//单阶作业详情
import MyApplyAllCourse from '@/components/myApplyAllCourse/myApplyAllCourse'//我报名的全部课程

import MyHomeWork from '@/components/My_homework/My_homework' //我的作业
import MyOrder from '@/components/My_order/My_order'//我的订单
import OrderPaySuccess from '../components/My_order/orderPaySuccess'//订单支付成功
import orderPaySuccessTwo from '../components/My_order/orderPaySuccessTwo'//订单支付成功
import MyCollectionClasses from '@/components/My_CollectionClasses/My_CollectionClasses'//我得收藏课程
import MyBaskHomework from '@/components/My_BaskHomework/My_BaskHomework'//我晒出的作业
import MyMessageAll from '@/components/My_message/myMessageAll'//我的全部消息
import MyChatMessage from '@/components/My_message/myChatMessage/myChatMessage'//我的同事聊天消息
import MySystemMessage from '@/components/My_message/mySystemMessage/mySystemMessage'//我的系统消息
import MyClassTellMessage from '../components/My_message/myClassTellMessage/myClassTellMessage'//我的教室通知
import myInvoiceApplication from '@/components/My_order/myInvoiceApplication'//发票申请
import PersonalInformation from '../components/personalInformation/personalInformation'//个人信息
import PerfectPersonalInformation from '../components/personalInformation/perfectPersonalInformation' //完善个人信息
import CropImage from '../component/cropImage'//头像截取

import PhoneLogin from '@/components/login/phone/phoneLogin'//手机登录
import PhoneCaptchaLogin from '@/components/login/phone/phoneCaptchaLogin'//手机验证码登录
import PhoneRegisterOne from '@/components/login/phone/phoneRegisterOne'//手机注册页面1
import PhoneRegisterTwo from '@/components/login/phone/phoneRegisterTwo'//手机注册页面2
import PhoneForgetPasswordOne from '@/components/login/phone/phoneForgetPasswordOne'//手机找回密码页面1
import PhoneForgetPasswordTwo from '@/components/login/phone/phoneForgetPasswordTwo'//手机找回密码页面2

import EmailLogin from '@/components/login/email/emailLogin'//邮箱登录
import EmailRegisterOne from '@/components/login/email/emailRegisterOne'//邮箱注册页面1
import EmailRegisterTwo from '@/components/login/email/emailRegisterTwo'//邮箱注册页面1
import EmailForgetPasswordOne from '@/components/login/email/emailForgetPasswordOne'//邮箱注册页面1
import EmailForgetPasswordTwo from '@/components/login/email/emailForgetPasswordTwo'//邮箱注册页面1

import WeiXinEmpowers from '../components/login/weixin/weiXinEmpowers' //微信授权页面
import WeixinBound from  '../components/login/weixin/weixinBound'//微信绑定
import WeixinInformation from '../components/login/weixin/weixinInformation' //微信填写信息

import WXPlogin from '../components/login/WXloginNew/WXPlogin' //微信绑定手机  
import WXElogin from '../components/login/WXloginNew/WXElogin' //微信绑定邮箱
import Pnext from '../components/login/WXloginNew/Pnext' //微信填写信息 


import SecuritySettings from '../components/security_settings/securitySettings'//安全设置
import BangWX from '../components/security_settings/BangWX'//安全设置

import ChangePassword from '../components/security_settings/changePassword'//修改密码
import AlreadyBoundPhone from '../components/security_settings/alreadyBoundPhone'//已经绑定手机号
import AlreadyBoundEmail from '../components/security_settings/alreadyBoundEmail'//已经绑定邮箱
import ChangePhone from '../components/security_settings/changePhone'//修改手机
import ChangeEmail from '../components/security_settings/changeEmail'//邮箱修改
import PhoneBoundSecurity from '../components/security_settings/phoneBoundSecurity'//手机绑定
import EmailBoundSecurity from '../components/security_settings/emailBoundSecurity'//邮箱绑定
import PhoneValidateOne from '../components/security_settings/phoneValidateOne'//手机验证1
import PhoneValidateTwo from '../components/security_settings/phoneValidateTwo'//手机验证2
import EmailValidateOne from '../components/security_settings/emailValidateOne'//邮箱验证1
import EmailValidateTwo from '../components/security_settings/emailValidateTwo'//邮箱验证2

import Boundlogin from '@/components/login/common/boundLogin'//绑定弹窗
import ServiceTerms from '../components/login/common/serviceTerms' //用户服务条款

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index',  // /systemError 维护   /index 正常
    },
    {
      path:'/index',
      component:Index,
      children:[
          {
            path: '',
            redirect: '/index/indexshouye'
          }
          ,{
            path: '/index/Error',
            name: 'ErrorPage',
            component: ErrorPage,
            meta:{title: '错误'}
          }
          ,{
            path: '/index/indexshouye',
            name: 'indexshouye',
            component: IndexShouye,
            meta:{title: '暄桐教室'}
          },{
            path: '/index/indexclass',
            name: 'indexclass',
            component: IndexClass,
            meta:{title: '上课'}
          },{
            path: '/index/indexshop',
            name: 'indexshop',
            component: IndexShop,
            meta:{title: '暄桐文房'}
          },{
            path: '/index/indexwode',
            name: 'indexwode',
            component: IndexWode,
            meta:{title: '我的'}
          },{
            path:'/XTCustomer',
            name:'XTCustomer',
            component: XTCustomer,
            meta:{title: '暄桐客服'}
          }
          ,{
            path: '/index/ExperimentVideo1',
            name: 'ExperimentVideo1',
            component: ExperimentVideo1,
            meta:{title: '视频'}
          }
          
      ]
    },{
      path: '/imageError',
      name: 'imageError',
      component: ImageError,
      meta:{title: '图片上传失败'}
    },{
      path: '/systemError',
      name: 'systemError',
      component: systemError,
      meta:{title: '系统维护'}
    }
    ,{
      path: '/search',
      name: 'search',
      component: Search,
      meta:{title: '搜索'}
    },{
      path: '/shopsearch',
      name: 'shopsearch',
      component: ShopSearch,
      meta:{title: '商品搜索'}
    },{
      path: '/xtmenulist1',
      name: 'xtmenulist1',
      component: XtmenuList1,
      meta:{title: '赠课给好友'}
    },{
      path: '/xtmenulist2',
      name: 'xtmenulist2',
      component: XtmenuList2,
      meta:{title: '全部课程'}
    },{
      path: '/classroomteacher',
      name: 'classroomteacher',
      component: Classroomteacher,
      meta:{title: '教室与老师'}
    },{
      path: '/classmatework',
      name: 'classmatework',
      component: Classmatework,
      meta:{title: '同学作业分享'}
    },{
      path: '/peoplewrite/:id',
      name: 'peoplewrite',
      component: Peoplewrite,
      meta:{title: '写字的人'}
    },{
      path: '/thingwrite/:id',
      name: 'thingwrite',
      component: Thingwrite,
      meta:{title: '写字的事'}
    },{
      path: '/myhomework',
      name: 'myhomework',
      component: MyHomeWork,
      meta:{title: '我的作业'}
    },{
      path: '/myorder',
      name: 'myorder',
      component: MyOrder,
      meta:{title: '我的订单'}
    },{
      path: '/orderPaySuccessTwo',
      name: 'orderPaySuccessTwo',
      component: orderPaySuccessTwo,
      meta:{title: '再次确认'}
    }
    ,{
      path: '/orderpaysuccess',
      name: 'orderpaysuccess',
      component: OrderPaySuccess,
      meta:{title: '支付成功'}
    },{
      path: '/mycollectionclasses',
      name: 'mycollectionclasses',
      component: MyCollectionClasses,
      meta:{title: '我的收藏'}
    },{
      path: '/mybaskhomework',
      name: 'mybaskhomework',
      component: MyBaskHomework,
      meta:{title: '我晒出的作业'}
    },{
      path: '/myinvoiceapplication',
      name: 'myinvoiceapplication',
      component: myInvoiceApplication,
      meta:{title: '申请发票'}
    },{
      path: '/myclasstellmessage',
      name: 'myclasstellmessage',
      component: MyClassTellMessage,
      meta:{title: '教室通知'}
    },{
      path: '/phonelogin',
      name: 'phonelogin',
      component: PhoneLogin,
      meta:{title: '手机登录'}
    },{
      path: '/phonecaptchalogin',
      name: 'phonecaptchalogin',
      component: PhoneCaptchaLogin,
      meta:{title: '验证码登录'}
    },{
      path: '/phoneregisterone',
      name: 'phoneregisterone',
      component: PhoneRegisterOne,
      meta:{title: '手机注册'}
    },{
      path: '/phoneregistertwo',
      name: 'phoneregistertwo',
      component: PhoneRegisterTwo,
      meta:{title: '注册信息'}
    },{
      path: '/phoneforgetpasswordone',
      name: 'phoneforgetpasswordone',
      component: PhoneForgetPasswordOne,
      meta:{title: '找回密码'}
    },{
      path: '/phoneforgetpasswordtwo',
      name: 'phoneforgetpasswordtwo',
      component: PhoneForgetPasswordTwo,
      meta:{title: '找回密码'}
    },{
      path: '/emailLogin',
      name: 'emailLogin',
      component: EmailLogin,
      meta:{title: '邮箱登录'}
    },{
      path: '/emailregisterone',
      name: 'emailregisterone',
      component: EmailRegisterOne,
      meta:{title: '邮箱注册'}
    },{
      path: '/emailregistertwo',
      name: 'emailregistertwo',
      component: EmailRegisterTwo,
      meta:{title: '注册信息'}
    },{
      path: '/emailforgetpasswordone',
      name: 'emailforgetpasswordone',
      component: EmailForgetPasswordOne,
      meta:{title: '找回密码'}
    },{
      path: '/emailforgetpasswordtwo',
      name: 'emailforgetpasswordtwo',
      component: EmailForgetPasswordTwo,
      meta:{title: '找回密码'}
    },{
      path: '/chairlist',
      name: 'chairlist',
      component: ChairList,
      meta:{title: '视频分享'}
    },{
      path: '/chairdetails',
      name: 'chairdetails',
      component: ChairDetails,
      meta:{title: '视频详情'}
    },{
      path: '/chanjiedetail',
      name: 'chanjiedetail',
      component: ChanJieDetail,
      meta:{title: '课程详情'}
    },{
      path: '/allcoursedetail',
      name: 'allcoursedetail',
      component: AllCourseDetail,
      meta:{title: '课程详情'}
    },{
      path: '/allcoursesubmitorder',
      name: 'allcoursesubmitorder',
      component: AllCourseSubmitOrder,
      meta:{title: '支付'}
    },{
      path: '/chanjiedetailbaskhomework',
      name: 'chanjiedetailbaskhomework',
      component: ChanJieDetailBaskHomeWork,
      meta:{title: '晒作业'}
    },{
      path: '/chanjiedetaildiscuss',
      name: 'chanjiedetaildiscuss',
      component: ChanJieDetailDiscuss,
      meta:{title: '讨论'}
    },{
      path: '/chanjiedetaildiscussall',
      name: 'chanjiedetaildiscussall',
      component: ChanJieDetailDiscussAll,
      meta:{title: '全部回复'}
    },{
      path: '/chanjiedetailtasktreedetails',
      name: 'chanjiedetailtasktreedetails',
      component: ChanJieDetailTaskTreeDetails,
      meta:{title: '课程任务详情'}
    },{
      path:'/couse',
      name: 'couse',
      component: couse,
      meta:{title: '直播'}
    },
    {
      path:'/couseback',
      name: 'couseback',
      component: couseback,
      meta:{title: '直播回放'}
    }
    ,{
      path: '/chanjiedetailwinreview',
      name: 'chanjiedetailwinreview',
      component: ChanJieDetailWinReview,
      meta:{title: '学习回顾'}
    },{
      path: '/chanjiedetailwriteevaluate',
      name: 'chanjiedetailwriteevaluate',
      component: ChanJieDetailWriteEvaluate,
      meta:{title: '我想对教室说...'}
    },{
      path: '/chanjietasktreedetailsubmitwork',
      name: 'chanjietasktreedetailsubmitwork',
      component: ChanJieTaskTreeDetailSubmitWork,
      meta:{title: '交作业'}
    },{
      path: '/chanjiedetailmysubmitypework',
      name: 'chanjiedetailmysubmitypework',
      component: ChanJieDetailMySubmiTypeWork,
      meta:{title: '已提交的作业'}
    },{
      path: '/typeworkdetail',
      name: 'typeworkdetail',
      component: TypeWorkDetail,
      meta:{title: '作业任务'}
    },{
      path: '/myapplyallcourse',
      name: 'myapplyallcourse',
      component: MyApplyAllCourse,
      meta:{title: '我报名的全部课程'}
    },{
      path: '/mymessageall',
      name: 'mymessageall',
      component: MyMessageAll,
      meta:{title: '站内信'}
    },{
      path: '/mychatmessage',
      name: 'mychatmessage',
      component: MyChatMessage,
      meta:{title: '聊天'}
    },{
      path: '/mysystemmessage',
      name: 'mysystemmessage',
      component: MySystemMessage,
      meta:{title: '系统消息'}
    },{
      path: '/boundlogin',
      name: 'boundlogin',
      component: Boundlogin,
      meta:{title: '绑定登录'}
    },{
      path: '/serviceterms',
      name: 'serviceterms',
      component: ServiceTerms,
      meta:{title: '用户服务协议'}
    },{
      path: '/personalinformation',
      name: 'personalinformation',
      component: PersonalInformation,
      meta:{title: '个人信息设置'}
    },{
      path:'/cropImage',
      name:'cropImage',
      component:CropImage,
      meta:{title:'截取'}
    },{
      path: '/perfectpersonalinformation',
      name: 'perfectpersonalinformation',
      component: PerfectPersonalInformation,
      meta:{title: '完善个人信息'}
    },{
      path: '/weixinempowers',
      name: 'weixinempowers',
      component: WeiXinEmpowers,
      meta:{title: '微信授权'}
    },{
      path: '/weixinbound',
      name: 'weixinbound',
      component: WeixinBound,
      meta:{title: '微信绑定'}
    },{
      path: '/weixininformation',
      name: 'weixininformation',
      component: WeixinInformation,
      meta:{title: '填写信息'}
    },{
      path: '/WXPlogin',
      name: 'WXPlogin',
      component: WXPlogin,
      meta:{title: '微信绑定'}
    }, 
    {
      path: '/WXElogin',
      name: 'WXElogin',
      component: WXElogin,
      meta:{title: '微信绑定'}
    },
    {
      path: '/Pnext',
      name: 'Pnext',
      component: Pnext,
      meta:{title: '微信绑定'}
    }
    ,{
      path: '/securitysettings',
      name: 'securitysettings',
      component: SecuritySettings,
      meta:{title: '安全设置'}
    },
      {
      path: '/BangWX',
      name: 'BangWX',
      component: BangWX,
      meta:{title: '微信绑定'}
    }
    ,{
      path: '/phoneboundsecurity',
      name: 'phoneboundsecurity',
      component: PhoneBoundSecurity,
      meta:{title: '手机绑定'}
    },{
      path: '/emailboundsecurity',
      name: 'emailboundsecurity',
      component: EmailBoundSecurity,
      meta:{title: '邮箱绑定'}
    },{
      path: '/changepassword',
      name: 'changepassword',
      component: ChangePassword,
      meta:{title: '更改密码'}
    },{
      path: '/changephone',
      name: 'changephone',
      component: ChangePhone,
      meta:{title: '更改手机'}
    },{
      path: '/changeemail',
      name: 'changeemail',
      component: ChangeEmail,
      meta:{title: '更改邮箱'}
    },{
      path: '/alreadyboundphone',
      name: 'alreadyboundphone',
      component: AlreadyBoundPhone,
      meta:{title: '手机绑定'}
    },{
      path: '/alreadyboundemail',
      name: 'alreadyboundemail',
      component: AlreadyBoundEmail,
      meta:{title: '邮箱绑定'}
    },{
      path: '/phonevalidateone',
      name: 'phonevalidateone',
      component: PhoneValidateOne,
      meta:{title: '手机验证'}
    },{
      path: '/phonevalidatetwo',
      name: 'phonevalidatetwo',
      component: PhoneValidateTwo,
      meta:{title: '验证信息'}
    },{
      path: '/emailvalidateone',
      name: 'emailvalidateone',
      component: EmailValidateOne,
      meta:{title: '邮箱验证'}
    },{
      path: '/emailvalidatetwo',
      name: 'emailvalidatetwo',
      component: EmailValidateTwo,
      meta:{title: '验证信息'}
    }
  ]
})
