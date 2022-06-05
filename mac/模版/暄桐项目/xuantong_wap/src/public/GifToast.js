import Toast from '@/component/GifList/GifModel'
import { getUserInfoCookie, getCookie,formData } from "@/public/index";
import { axios } from "./utils"
import Vue from 'vue'
const GifToast ={}
GifToast.install = function () {
    const ToastConstructor = Vue.extend(Toast)
    const instance = new ToastConstructor();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)
    Vue.prototype.$GifToast = (flag) => {
        let UserFlag = !getUserInfoCookie() || getUserInfoCookie() == "undefined"
        if(UserFlag){return}
        axios.post("/course/giftcourselist", {token:''}).then(res=>{
            if(res.data.result){

            if(res.data.result.length==0){

            }else{
                 instance.visible = flag
                 instance.popupVisible_Pleaselogin =flag
            }
        }

        })
        
    }
}

export default GifToast