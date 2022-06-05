<template>
    <div  >
        <i class="iconEmoji" @touchmove.prevent  @click.stop="onVisible" style="z-index:99999999;position:realtive" ><img src="../../../static/img/emoji.png" alt=""></i>
            <ul class="emoji-list"   v-bind:class="{ emojiShow: visible }"    >
                  <li v-for="(item,index) in Data" :key="index" @click.stop="click(item)">
                      <img :src="item.url" v-if="index<=99"/>
                  </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            visible: false,
            Data:[]
        }
    },
    props:{
        onAppendEmoji:{
            type:null
        },
        ChangeOpenFlag:{
            type:null
        },
        Quto:{
            type:null
        }
    },
    mounted(){
      
        this.Data = require("../../../static/emoji.json");
    },
    methods:{
        alert(){
            // alert('弹出')
        },
        onVisible() { 
            this.visible = !this.visible;
            this.Quto()
            //  setTimeout(function(){
            //      window.scrollTo(0,0);
            // },200);
           //console.log(this.visible,'触发') 
        },
        onVisibleFlag() {
            this.visible = false
        },
        click(item){
            this.onAppendEmoji(item.value)
        }
    }
}
</script>

<style lang="scss">
i.iconEmoji {
  font-size: 1.5625rem;
  margin-left: 0.75rem;
  color: #999;
  width: 2rem;
  height: 2rem;
  // display: inline-block;
  display: flex;
  padding:.5rem 0;
  position: relative;
  img{
    width: 2rem;
    height: 2rem;
  }
}
ul.emoji-list::before,
ul.emoji-list::after {
  content: "";
  display: block;
  clear: both;
}   
ul.emoji-list {
  width: 100%;
  overflow: auto;
  transition: all 0.2s;
  height: 0;
  box-shadow: 0px 0px 1px 0px rgba(231, 231, 231, 0.72);

  -webkit-overflow-scrolling : touch;
//   overflow: scroll;
  //   display: none;
}
ul.emoji-list.emojiShow {
        // width: 325px;
  height: 15rem;
  padding-left: .4rem;
}
ul.emoji-list * {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
ul.emoji-list li {
  font-size: 2.25rem;
  float: left;
  display: inline-block;
  // padding: 0.125rem;
  padding: 0.2rem;
//   margin: 0.25rem;
  line-height: 2.25rem;
  border-bottom:none!important;
  margin-top:0!important;
}
img.emoji {
  cursor: pointer;
  height: 1.875rem;
  width: 1.875rem;
  margin: 0 0.05em 0 0.1em;
  vertical-align: -0.1em;
}
ul.emoji-list>li>img {
  width: 1.875rem!important;
  height: 1.875rem!important;
  margin-right:0!important;
}
</style>