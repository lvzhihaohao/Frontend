<template>
	<div class="">
		<!-- <div id="zhezao_leijc" class="zhezao_lei" :data-scrollToNum="scrollToNum">
        	<div id="video" style="width: 100%; height:11.25rem;max-width: 100%"></div>
		</div> -->
	</div>
</template> 

<script>
//  import '../../../ckplayers/ckplayer/ckplayer.js'
// export default {
//     data(){
//         return{
// 			dpplayer:null,
// 			scrollToNum:0,
//         }
// 	},
// 	props: {
//       data: {
//         type: null
//       },
//       url: {
//         type: null
//       },
//       index: {
//         type: null
//       }
//     },
//     mounted() {
//         var videoObject = {
// 				container: '#video', //容器的ID或className
//                 variable: 'player', //播放函数名称
//                 mobileCkControls:true,//是否在移动端（包括ios）环境中显示控制栏
//                 mobileAutoFull:false,//在移动端播放后是否按系统设置的全屏播放
//                 h5container:'#videocontainer',//h5环境中使用自定义播放器ID
// 				autoplay: false,//是否自动播放
// 				poster: this.data.courseThumPictureUri, //封面图片
// 				preview: { //预览图片
// 					file: ['material/mydream_en1800_1010_01.png', 'material/mydream_en1800_1010_02.png'],
// 					scale: 2
// 				},
// 				video:[
// 			        [this.url.url, 'video/mp4', '标清', 0],
// 			        [this.url.lowUrl, 'video/mp4', '流畅', 0],
// 			        [this.url.highUrl, 'video/mp4', '高清', 0],
// 			    ]
// 			};
//         var player = new ckplayer(videoObject);
// 		this.dpplayer = player
// 		if(this.$route.name=="indexshouye"){
// 			var H = window.pageYOffset || document.body.scrollTop || document.body.scrollHeight;
// 			this.scrollToNum=H		
// 		}
//     },
//     methods:{
//     }
// }
</script>

<style lang ='scss' scoped>
	/* .zhezao_leiactive{
		position: fixed;
		top:0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background: red;
		z-index: 99999;
	}
	.zhezao_leiactive>#video{
		width: 100%;
		height: 100%!important;
	} */
</style>
