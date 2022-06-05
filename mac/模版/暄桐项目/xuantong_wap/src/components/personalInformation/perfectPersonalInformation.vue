<template>
    <div id='app' ref='app'>
        <article class="nav-title" v-if='!this.$flag'>
            <mt-header title="完善个人信息">
                <a href="javascript:void(0);" slot="left" @click='goBacks'>
                    <mt-button icon="back"></mt-button>
                </a>
                <a href="javascript:void(0);" slot="right" @click='sure' style="color:#C4A57F">
                    <mt-button>确认</mt-button>
                </a>
            </mt-header>
        </article>
        <img src="../../../static/img/back.png" class='gu_nav_title_img_top' v-if='this.$flag' @click='goBacks'>
        <a href="javascript:void(0);"  v-if='this.$flag' @click='sure' style="float:right">
            <mt-button style="color:#C4A57F;">确认</mt-button>
        </a>
        <PersonalInformation ref='information' />
    </div>
</template>
<script>
    import PersonalInformation from '../../component/personalInformation'
    export default {
        name: 'perfectPersonalinformation',
        data() {
            return {
            }
        },
        components: {
            PersonalInformation
        },
        methods: {
            sure() {
                this.$axios
                    .post("/user/needcompleteuserinfo", {
                        type: 1,
                        token: ""
                    }).then(res => {
                        if (res.data.result) {
                            //console.log(res.data.result, "---------")
                            this.$Toast('还没有填完哦~')
                            return false
                        } else {
                            // this.$router.push({
                            //         path:'/allCourseDetail',
                            //         query:{id:this.$route.query.couseid}
                            // })
                            // //console.log(this.$route.query.couseid,'type')
                            // if(this.$route.query.type){
                            // }
                            this.$Toast('更改成功')
                            // this.$router.back(-1)
                            this.$refs.information.goBack();
                        }
                    });
            },
            goBacks() {
              
                if(this.$route.query.type==4){
                    this.$router.push({
                        path:'/chanjiedetail',
                        query:{type:'perfectPersonalInformationOnly'}
                    })
                }else if(this.$route.query.type==3){
                    this.$router.push({
                        path:'/chanjiedetail',
                        query:{type:'perfectPersonalInformation'}
                    })
                }else if(this.$route.query.type==2){
                    this.$router.push({
                        path:'/allcoursedetail',
                        query:{type:'perfectPersonalInformation'}
                    })
                }else{
                     this.$router.push({
                        path:'/index/indexwode',
                    })
                }
              
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>


