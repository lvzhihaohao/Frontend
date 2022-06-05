import Toast from '../component/model'
import Vue from 'vue'
const ModelToast ={}
ModelToast.install = function () {
    const ToastConstructor = Vue.extend(Toast)
    const instance = new ToastConstructor();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)
    Vue.prototype.$ModelToast = (flag) => {
        instance.visible = flag
        instance.popupVisible_Pleaselogin =flag
    }
}

export default ModelToast