import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import indexStore from './index/indexStore'
import indexClass from './index/indexClass'
import searchStore from './search/searchStore'
import peopleWriteStore from './peopleWrite/peopleWriteStore'
import thingWriteStore from './thingWrite/thingWriteStore'
import classRoomTeacherStore from './classRoomTeacher/classRoomTeacherStore'
import bookShopMoreStore from './bookShopMore/bookShopMoreStore'
import myHomeWorkStore from './myHomeWork/myHomeWorkStore'
import myOrderStore from './myOrder/myOrderStore'
import myCollectionClassesStore from './myCollectionClasses/myCollectionClassesStore'
import MyBaskHomeworkStore from './My_BaskHomework/MyBaskHomeworkStore'
import phoneStore from './login/phoneStore'
import emailStore from './login/emailStore'
import chairListMoreStore from './chairListMore/chairListMoreStore'
import chanJieDetailStore from './chanJieDetail/chanJieDetailStore'
import chanJieDetailTaskTreeDetailStore from './chanJieDetail/chanJieDetailTaskTreeDetailStore'
import chanJieDetailDiscussStore from './chanJieDetail/chanJieDetailDiscussStore'
import chanJieDetailBaskHomeWorkStore from './chanJieDetail/chanJieDetailBaskHomeWorkStore'
import chanJieDetailWriteEvaluateStore from './chanJieDetail/chanJieDetailWriteEvaluateStore'
import chanJieTaskTreeDetailSubmitWorkStore from './chanJieDetail/chanJieTaskTreeDetailSubmitWorkStore'
import chanJieDetailMySubmitTypeWorkStore from './chanJieDetail/chanJieDetailMySubmitTypeWorkStore'
import chanJieTypeWorkDetailStore from './chanJieDetail/chanJieTypeWorkDetailStore'
import classMateMoreStore from './classMateWork/classMateWorkStore'
import allCourseDetailStore from './allCourseDetail/allCourseDetailStore'
import personalInformationStore from './personalInformation/personalInformationStore'
import securityPhoneStore from './security_settings/phoneStore'
import securityEmailStore from './security_settings/emailStore'
import indexGiveLessonsStore from './index/indexGiveLessonsStore'
export default new Vuex.Store({
    modules:{
        indexStore,
        indexClass,
        indexGiveLessonsStore,
        searchStore,
        peopleWriteStore,
        thingWriteStore,
        classRoomTeacherStore,
        bookShopMoreStore,
        myHomeWorkStore,
        myOrderStore,
        myCollectionClassesStore,
        MyBaskHomeworkStore,
        phoneStore,
        emailStore,
        chairListMoreStore,
        chanJieDetailStore,
        chanJieDetailTaskTreeDetailStore,
        chanJieDetailDiscussStore,
        chanJieDetailBaskHomeWorkStore,
        chanJieDetailWriteEvaluateStore,
        chanJieTaskTreeDetailSubmitWorkStore,
        chanJieDetailMySubmitTypeWorkStore,
        classMateMoreStore,
        allCourseDetailStore,
        personalInformationStore,
        securityPhoneStore,
        securityEmailStore,
        chanJieTypeWorkDetailStore
    }
})