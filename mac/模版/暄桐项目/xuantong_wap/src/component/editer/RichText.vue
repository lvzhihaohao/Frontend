<template>
        <div class="App-Input-Fixed" :class="{'AppInputFixedwx':iosflag}" ref="AppInput" >
            <EmojiS :onAppendEmoji="onAppendEmoji"  :ChangeOpenFlag="ChangeOpenFlag" :Quto="Quto"  ref="onAppendEmoji"/>
            <div class="App-Input-content"  @click="payAlipayNone"> 
            <textarea type="text" name id="input" @click="clickInput" ref="input" :placeholder="replayText" v-model="input"  @focus.stop="focus" @blur="blur" />
                <mt-button class="App-Input-button"  @click="textSend">{{sendText}}</mt-button>
            </div>
        </div>
</template>
<script>
// import emoji from "@/component/editer/emoji";
import EmojiS from "@/component/editer/EmojiS";
import cookie from 'js-cookie';
export default {
    data(){
        return{
            input:'',  //文本域内容
            str:'',    //输出字段
            rangeData: { text: "", start: 0, end: 0 },
            n:0,
            OpenFlag:false,  //是否是表情出来后再获取焦点
            CeHight:0,//记录高度
            ADd:true, 
            iosflag:false
        }
    },
    components: {
    //   emoji,
      EmojiS
    },
    props:{
        ChangeFlag:{
            type:null
        },
        sendText:{
            type:null
        },
        //返回评论内容
        InitReply:{
            type:null
        },
        //提示文本
        replayText:{
            type:null
        },
    },
    watch:{
        //加载更多flag
        replayText(newValue, oldValue){
            //console.log(newValue,'newValuenewValuenewValuenewValuenewValuenewValue')
            // this.DisShowFlag = false
            // //console.log(this.data.courseCommentResponseVos,'我是data我改变了')
        }
    },
    mounted(){
        var u = navigator.userAgent;
        if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
            //判断是否是安卓苹果
        }else{
            //判断是否是苹果里的微信
            if(this.$flag){
                this.iosflag=true;
            }
        }
    //    if(this.$flag) {
    //               this.ADd =false
    //     }
         var tx = document.getElementById("input");
        if(this.ChangeFlag){
            // this.$nextTick(()=>{

            //     setTimeout(() => {
                
            //              tx.focus()
            //             tx.scrollIntoView(true)
            //             tx.blur()
            //             this.ADd = true
            //     }, 200)
            //  })
        }
    },
    methods:{
        //不可滑动
        payAlipayNone(){

        },
    //浏览器中第一次点表情
      async  Quto(){ 
           //console.log(this.ADd,'怎么不触发了')
          if(this.ADd){
             
                this.ADd =false
                var tx = document.getElementById("input");
                tx.focus()
                this.n=0
                this.rangeData={ text: "", start: 0, end: 0 }
                await this.HideEmoil()
                setTimeout(()=>{
                    tx.blur()
                    this.$refs.onAppendEmoji.onVisible()
                    this.OpenFlag= true
                },200)
          }else{
              this.OpenFlag= true
          }
        },
        //获取焦点
        clickInput(e){
            // //console.log(e.target,'eeeeeeeeee')
            // setTimeout(()=>{
            //     e.target.scrollIntoView(true)
            //  },100)
        },
        async focus(e){
            this.ADd =false
            var tx = document.getElementById("input");
            tx.focus()
            this.n=0
            this.rangeData={ text: "", start: 0, end: 0 }
            await this.HideEmoil()
        },
        //隐藏表情  滚动条位置和之前一样
        HideEmoil(){
                this.$refs.onAppendEmoji.onVisibleFlag()
               if(this.$flag) {
                   this.WXEmoji()
                   this.OpenFlag= false
               }else{
                   this.SafialEmoji()
                   this.OpenFlag= false
               }
                
        },
        //滑动脱离焦点
        blurs(){
             this.$refs.onAppendEmoji.onVisibleFlag()
             var tx = document.getElementById("input");
             tx.blur()
        },
         blurss(){
            //  this.$refs.onAppendEmoji.onVisibleFlag()
             var tx = document.getElementById("input");
             
             tx.blur()
        },
        //脱离焦点 
        blur(){
            this.$nextTick(() => {
                setTimeout(() => {
                  window.scrollTo(0,0);
                
                
                }, 200)
              });
             this.OpenFlag= false
        },
        //记录光标位置	
        function (textarea) {
            this.n=1
                    var rangeData = { text: "", start: 0, end: 0 };//光标位置
                    if (textarea.setSelectionRange) { // W3C 记录光标位置	
                        // textarea.focus();
                        rangeData.start = textarea.selectionStart;
                        rangeData.end = textarea.selectionEnd;
                        // //console.log(rangeData,"11位置")
                        rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end) : "";
                    } else if (document.selection) { // IE
                        // textarea.focus();
                        var i,
                        oS = document.selection.createRange(),
                                // Don't: oR = textarea.createTextRange()
                        oR = document.body.createTextRange();
                        oR.moveToElementText(textarea);
                        rangeData.text = oS.text;
                        rangeData.bookmark = oS.getBookmark();
                        // object.moveStart(sUnit [, iCount]) 
                        // Return Value: Integer that returns the number of units moved.
                        for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart("character", -1) !== 0; i++) {
                            // Why? You can alert(textarea.value.length)
                            if (textarea.value.charAt(i) == '\r') {
                                i++;
                            }
                        }
                        rangeData.start = i;
                        rangeData.end = rangeData.text.length + rangeData.start;
                    }
                    return rangeData;
        },
        //插入表情
        add (textarea, rangeData, text) {
                    var oValue, nValue, oR, sR, nStart, nEnd, st;
                    // this.set(textarea, rangeData);//设置光标位置
                    // return
                    if (textarea.setSelectionRange) { // W3C
                        oValue = textarea.value;
                        nValue = oValue.substring(0, rangeData.start) + text + oValue.substring(rangeData.end);
                        this.rangeData.start= rangeData.start+Number(text.length)
                        this.rangeData.end= rangeData.end+Number(text.length)
                        nStart = nEnd = rangeData.start + text.length;
                        st = textarea.scrollTop;
                        textarea.value = nValue;
                        this.input = textarea.value
                        // Fixbug:
                        // After textarea.values = nValue, scrollTop value to 0
                        if (textarea.scrollTop != st) {
                            textarea.scrollTop = st;
                        }
                        // textarea.setSelectionRange(nStart, nEnd);
                    } else if (textarea.createTextRange) { // IE
                        sR = document.selection.createRange();
                        sR.text = text;
                        sR.setEndPoint('StartToEnd', sR);
                        sR.select();
                    }
                },
        //插入表情
        onAppendEmoji(text) {
                this.OpenFlag= true
                var tx = document.getElementById("input");
                if(this.n==0){
                         var pos = this.function(tx);//获取光标位置  和选中
                        this.add(tx, pos,text)
                }else{
                        this.add(tx, this.rangeData,text)
                }    
                tx.scrollTop = tx.scrollHeight;   
        },
        //发送
        textSend(){
             const emoji = require("../../../static/emoji.json");
             let str = this.input
                emoji.forEach((item,index) => {
                    if(index<=99){
                        let val = item.value//
                        let reg1=/[\[\]]/g//匹配中文点正则
                        val=val.replace(reg1,"")
                        let reg=new RegExp("\\["+val+"\\]",'g') ; 
                        // //console.log(val,reg)
                        str = str.replace(reg,()=>{return `<img style="width:1.25rem;height:1.25rem" src='${item.url}'/>`})
                        //  //console.log(str)
                    }
                });
                this.str=str
                if(this.input == ''){
                    this.$Toast('内容不能为空')
                    return
                }else{ 
                    this.InitReply(`<p>${this.str}</p>`,this.input.length)
                    this.input = ''
                    this.$refs.onAppendEmoji.onVisibleFlag()
                   
                }
                //console.log(this.input.length,'我是str')
      },
    ChangeOpenFlag(){ 
          this.OpenFlag = true
      },
      getClientHeight(){
            var clientHeight=0;
            if(document.body.clientHeight&&document.documentElement.clientHeight)
            {
                var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
            }
            else
            {
                var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
            }
            return clientHeight;
      },
      //微信抬起  //微信下晒作业和站内信和视频
      WXEmoji(){
          var tx = document.getElementById("input");
          if(this.OpenFlag){
                this.$nextTick(() => { 
                        setTimeout(() => {
                             document.body.scrollTop = document.body.scrollHeight
                            tx.scrollIntoView(true)
                        }, 500)
                    });
          }else{
              this.$nextTick(() => { 
                        setTimeout(() => {
                                tx.scrollIntoView(true)
                        },500)
                    });
          }
        //   this.ChangeFlag()
          this.$emit('ChangeFlag',false)
      },
      //浏览器下晒作业和站内信抬起
      SafialEmoji(){
          var tx = document.getElementById("input");
          if(this.OpenFlag){
                   this.$nextTick(() => { 
                        setTimeout(() => {
                            window.scrollTo(0,this.CeHight );
                            
                        }, 100)
                    });
               }else{
                   this.$nextTick(() => { 
                        setTimeout(() => {
                             let  H111= this.getClientHeight() - window.innerHeight 
                             this.CeHight  = H111
                             tx.scrollIntoView(true)
                             //console.log(this.CeHight,'this.CeHightthis.CeHight')
                             // window.scrollTo(this.CeHight,this.CeHight );
                        }, 200)
                    });
               }
        },
    }
}
</script>

<style lang="scss" scoped>
.AppInputFixedwx{
    position: absolute !important;
}
.App-Input-Fixed{
    position: fixed;
    bottom: 0px;
    z-index: 11;
    box-shadow: 0px 0px 8px 0px rgba(231, 231, 231, 0.72);
    width: 100%;
    left: 0px;
    background: #fff;
    // height:3.0625rem;
    line-height: 3.0625rem;
    display: flex;
    justify-content: space-between;
    -webkit-box-pack: justify;
    .App-Input-content{ 
        width: auto;
        height: 3.0625rem;
        text-align: right;
        font-family: "FZLTHJW--GB1-0";
        position: absolute;
        top: 0;
        right: 0;
        left:3.125rem;
        padding: 0;
        bottom: 0px;
        textarea{
            position: absolute;
            left: 0;
            width: 14rem;
            top: 0.9rem;
            outline: none;
            border: none;
            height:1.8rem;
            overflow: auto;
            -webkit-overflow-scrolling : touch;
        }
    }
    .App-Input-button{
            width: 5.625rem;
            border-radius: 0px;
            color: #fff;
            height: 3.0625rem;
            background: #c4a57f;
    }
}
</style>
