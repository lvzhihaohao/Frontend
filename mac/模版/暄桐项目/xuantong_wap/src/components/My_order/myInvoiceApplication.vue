<template>
  <div>
    <article class="nav-title" v-if="!this.$flag">
      <mt-header title="申请发票" right="555">
        <a href="javascript:void(0);" slot="left" @click="goBack">
          <mt-button icon="back"></mt-button>
        </a>
        <!-- <mt-button  slot="right" style="color:#C4A57F" @click="submit">提交</mt-button> -->
      </mt-header>
    </article>
    <img src="../../../static/img/back.png" class="gu_nav_title_img_top" v-if="this.$flag" @click="goBack">
    <!--  发票申请 -->
    <div class="invoice_apply pl-28 pr-28 pt-30">
      <p class="fz12 c4a5" v-if="this.$route.query.type===1" style="margin-bottom: 1.1rem;">本课程是直播课，发票将在第一节课开课后陆续开具哦</p>
      <ul class="Personal_Center Personal_CenterLei">
        <li>
          <mt-cell title="发票类型">
            <span>{{invoiceList.invoiceTypeName}}</span>
          </mt-cell>
        </li>
        <li>
          <mt-cell title="发票性质">
            <span>{{invoiceList.invoiceCharacterName}}</span>
          </mt-cell>
        </li>
        <li>
          <mt-cell title="发票内容">
            <span>培训费</span>
          </mt-cell>
        </li>
        <li>
          <mt-cell title="开票金额">
            <span>{{invoiceList.invoicePrice}}元</span>
          </mt-cell>
        </li>
        <li class="invoiceInput" style="padding-bottom: 1rem;">
          <mt-field style="" label="邮箱" placeholder="请输入您的邮箱地址" type="email" v-model="email" @blur.native.capture="emailBlur" @input="emailInput"></mt-field>
          <div class='emailError' ref='email'></div>
        </li>
      </ul>
      <div class="invoice_radius">
        <!-- <mt-radio
                            align="right"
                            :value.sync="value"
                            @change="option"
                            :optionss="['企业', '个人']">
            </mt-radio>-->
        <!-- <mt-checklist
                        align="right"              
                        v-model="valueList"
                        :options="options">
            </mt-checklist>-->
        <mt-radio align="right" v-model="kindValue" :options="options"></mt-radio>
      </div>
      <div class="invoice_textarea" style="padding:1.25rem 0 3.25rem;marginBottom:3rem">
        <p class="fz15 c30 mb-20">发票抬头</p>
        <div class="textareaBox"><textarea name id v-model="rise"></textarea></div>
        <p class="fz15 c30 mb-20" v-if="kindValue==='valueF'">
          纳税人识别号
          <span class="c9">（企业纳税人识别号为必填）</span>
        </p>
        <div class="textareaBox" v-if="kindValue==='valueF'"><textarea name id v-model="Taxpayer"></textarea></div>
      </div>
    </div>
    <div @click="submit" class="WritingEvaluation_footFixed text-center" v-if="(this.Taxpayer!==''&&this.rise!==''&&this.kindValue&&TaxpayerFlag&&emailFlag)||(kindValue==='valueA'&&this.rise!==''&&emailFlag)">
      <mt-button class="cf">确认</mt-button>
    </div>
    <div class="WritingEvaluation_footFixed text-center" style="background:#ccc !important" v-else>
      <mt-button class="cf">确认</mt-button>
    </div>
  </div>
</template>
<script>
  import {
    checkTaxId
  } from '@/public/index'
  import {
    emailVerification
  } from '@/public/index'
  export default {
    name: "myinvoiceapplication",
    data() {
      return {
        Taxpayer: "", //纳税人识别号
        rise: "", //发票抬头
        invoiceList: [], //表单内容发
        TaxpayerFlag: false, //税号正则验证
        // valueLists:false,
        email: null,
        emailFlag:false,
        invoiceClickFlag:false,//防抖
        options: [
          //暂留没用
          {
            label: "企业",
            value: "valueF",
            //   disabled: true
          },
          {
            label: "个人",
            value: "valueA"
          }
        ],
        kindValue: "valueF", //类型
      };
    },
    watch: {
      Taxpayer(newVal, oldVal) {
        this.TaxpayerFlag = checkTaxId(newVal)
        //console.log(this.TaxpayerFlag)
      }
    },
    methods: {
      emailBlur() {
       this.emailFlag = emailVerification(this.email, this.$refs.email)
        // emailVerification('', this.$refs.email)
      },
      emailInput() {
        if (this.$refs.email.innerHTML != '') {
          this.$refs.email.innerHTML = '',
            this.$refs.email.style.borderTop = 'none'
        }
      },
      goBack() {
        this.$router.back(-1);
      },
      //提交
      submit() {
        //   //console.log('DSADASDAS',this.kindValue);
        if(this.invoiceClickFlag){// 判断防抖
          return;
        }
        this.invoiceClickFlag = true;// 防抖打开
        let types;
        if (this.kindValue == "valueF") {
          types = 1
        } else {
          types = 2
        }
        //console.log(types)
        this.$axios
          .post("/order/invoice", {
            token: "",
            orderId: this.$route.query.id, //发票id
            type: types, //发票类型 个人是2
            headName: this.rise, //发票抬头
            invoiceSn: this.Taxpayer, //纳税人识别号
            targetEmail:this.email//邮箱号
          }).then(res => {
            this.$Toast({
              message: "正在开票",
              position: "top",
              duration: 5000
            })
            this.invoiceClickFlag = false;// 防抖关闭
            this.$router.back(-1);
          })
      }
    },
    //获取表单内容
    mounted() {
      this.$axios
        .post("/order/invoiceTemplate", {
          orderId: this.$route.query.id,
          token: ""
        })
        .then(res => {
          this.invoiceList = res.data.result;
        });
    }
  };
</script>
<style lang="scss">
  // .invoice_radius{
  //     .mint-radiolist{
  //         background: red !important;
  //     }
  //     .mint-radio-core{
  //             background-color: #C4A57F !important;
  //              border-color: #ccc !important;
  //     }
  // }
  .fz12.c4a5.pl-12.pr-12 {
    margin: 2rem 0;
  }
  .Personal_Center {
    // padding: 0 .75rem;
  }
</style>


