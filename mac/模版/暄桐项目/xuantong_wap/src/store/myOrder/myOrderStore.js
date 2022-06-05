import {myOrderApi} from '../../api/myOrder'
import {userclasshourTime,formData} from '../../public/index'
let state={ 
    myOrderList:[],
    tabid:-1,
    pageIndex:1,
}
let mutations={
    //切换数据
    getMyOrderMutations (state, payload) {
        if(payload != null){
            state.myOrderList=payload && payload.orderResponseVos;
            state.myOrderList && state.myOrderList.map(item=>{
                
                // item.createTime = userclasshourTime(item.orderTime,'myorder')
                item.createTime=formData(item.orderTime,"utc","add",false)
                if(item.courseIdList[0].courseName=='全阶课程_从书法之美到生活之美'){
                    item.type =1
                    item.courseIdList[0].coursePrice = '16800'  
                    item.courseIdList[0].coursePictureThumbUri = require("../../../static/mobile_img/OrderList0.jpg");
                }
                if(item.courseIdList[0].courseName=='第一阶_篆隶筑基课程'){
                    item.type =1
                    item.courseIdList[0].coursePrice = '3280' 
                    item.courseIdList[0].coursePictureThumbUri = require("../../../static/mobile_img/OrderList1.jpg");
                }
                if(item.courseIdList[0].courseName=='第二阶_楷书精进课程'){
                    item.type =1
                    item.courseIdList[0].coursePrice = '6560'
                    item.courseIdList[0].coursePictureThumbUri = require("../../../static/mobile_img/OrderList2.jpg");
                }
                if(item.courseIdList[0].courseName=='第三阶_小楷写经课程'){
                    item.type =1
                    item.courseIdList[0].coursePrice = '3280'
                    item.courseIdList[0].coursePictureThumbUri = require("../../../static/mobile_img/OrderList3.jpg");
                }
                if(item.courseIdList[0].courseName=='第四阶_自在行草课程'){
                    item.type =1
                    item.courseIdList[0].coursePrice = '6560'
                    item.courseIdList[0].coursePictureThumbUri = require("../../../static/mobile_img/OrderList4.jpg");
                }
            })
        }
    },
    //状态id
    changetabid(state,id){
        state.tabid = id
    },
    ChangePage(state){
        state.pageIndex++
        //console.log(state.pageIndex)
    },
    ChangeZero(state){
        state.pageIndex=1
    }
}
let actions={
  async getMyOrderAction ({commit}, payload) {
    let data =await myOrderApi(payload)
    commit('getMyOrderMutations',data)
  },
  getchangetabid({commit},payload){
    commit('changetabid',payload)
    //   //console.log(payload,'payload')
  },
  ChangeGetPage({commit},payload){
    commit('ChangePage',payload)
  },
  ChangeGetZero({commit},payload){
    commit('ChangeZero',payload)
  }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}