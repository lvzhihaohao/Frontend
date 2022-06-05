<template>
    <div v-if="visible" class="app-Lv-GifBacks">
         <img src="../../../static/img/816.gif" alt="">
    </div>
    <!-- <div v-if="visible" @touchmove.prevent>
        <mt-popup v-model="popupVisible_Pleaselogin" position=""
         class=" app-Lv-GifBacks" modal=false
         >
            
        </mt-popup>
    </div> -->
</template>

<script>
import router from '../../router/index'
export default {
    data() {
        return {
            popupVisible_Pleaselogin: false,
            visible:false, 
        }
    },
}
</script>
<style lang="scss">
.app-Lv-GifBacks{
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: .1);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 20;
        img{
            // position: absolute;
            // top: 30%;
            width: 3rem;
            height: 3rem;
            // height: 13.5859375rem;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -1.5rem;
            margin-left: -1.5rem;
        }
    }


</style>
