import Toast from '@/component/GifList/loading'
import { axios } from "./utils"
import Vue from 'vue'
const loading ={}
loading.install = function () {
    const ToastConstructor = Vue.extend(Toast)
    const instance = new ToastConstructor();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)
    Vue.prototype.$loading = (flag) => {
             instance.visible = flag
             instance.popupVisible_Pleaselogin =flag
    }
}

export default loading