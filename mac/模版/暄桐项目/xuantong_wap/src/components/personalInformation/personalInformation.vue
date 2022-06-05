<template>
    <div id='app' ref='app'>
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="个人信息设置">
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <img src="../../../static/img/back.png"   class='gu_nav_title_img_top'
            v-if='this.$flag' @click='goBack'>
        <PersonalInformation ref='information' :types='types'/>
    </div>
</template>
<script>
import PersonalInformation from '../../component/personalInformation'
export default {
    name:'personalinformation',
    data () {
        return {
            types:'wode'
        }
    },
    components:{
        PersonalInformation
    },
    methods:{
        goBack(){
            this.$router.push({
                path:'/index/indexwode',
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    #app{
        width:100%;
        height:100%;
        display:flex;
        flex-direction: column;
        .content{
            flex:1;
            overflow: auto;
        }
    }
</style>


