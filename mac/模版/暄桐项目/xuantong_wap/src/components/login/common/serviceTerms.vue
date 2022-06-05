<template>
    
    <div id='app' >
        <div v-if="this.$route.query.type=='danJie'" >
             <article class="nav-title" v-if="!this.$flag" style="position:fixed;width:100%">
            <mt-header title="用户报名协议" >
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
            </article>
            <img src="../../../../static/img/back.png" class='gu_nav_title_img_top'  style="z-index:9999;position:fixed;"
            v-if='this.$flag' @click='goBack'>
            <div class='content app-push-p' style="padding-top:4rem" v-html="allCourseBuyAgreementData.protocolContent">

            </div>
        </div>
        <div v-else>
          <article class="nav-title" v-if="!this.$flag"  style="position:fixed;width:100%">
            <mt-header title="用户注册协议">
                <a href="javascript:void(0);" slot="left" @click='goBack'>
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
        </article>
        <img src="../../../../static/img/back.png"  style="z-index:9999;position:fixed;" class='gu_nav_title_img_top'
            v-if='this.$flag' @click='goBack'>
        <div class='content' style="padding-top:4rem">
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                <span style="box-sizing: border-box; margin: 0px; font-weight: bolder;color: black;">暄桐教室在线课程学习平台——用户注册协议</span>
            </p>
            <p>
                <br/>
                <br/>
                <br/>
            </p>
            <p class="fz14" style="font-weight: bolder;">总则</p>
            <br/>
            <p class="class-serive-lv-one">(1) 欢迎使用暄桐教室在线课程学习平台（以下简称“暄桐教室”，平台首页为 https://www.xuantong.cn），该学习平台的所有权和运营权归暄桐文化（北京）有限公司所有。</p>
            <br/>
            <p class="class-serive-lv-one">
                (2) 为了保障您（以下也称“用户”）的权益，请在使用暄桐教室提供的服务之前以及注册账号时，详细阅读此注册协议（以下简称“本协议”）所有内容，确认您已完全理解和接受本协议，需点击“ 我已看过并同意《用户注册协议》”，成功注册后，则用户与本平台之间自动形成协议关系，用户应当受本协议及所有规则的约束，以及用户在使用特殊的服务或产品时，应当同意接受相关协议后方能使用。如果您未满18周岁，请在法定监护人的陪同下阅读本协议，并在法定监护人的指导下使用本平台。 
            </p>
            <br/>
            <p class="class-serive-lv-one">
               (3) 本协议内容包括协议正文及将来可能发布的各类规则。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。除另行明确声明外，您使用暄桐教室提供的服务均受本协议约束。如您对本协议有任何疑问，请立即停止使用暄桐教室提供的服务及注册平台用户，并可向平台客服咨询。未同意本协议内容的用户，无法在暄桐教室发布任何内容，仅能使用浏览功能。
            </p>
            <br/>
            <p class="fz14" style="font-weight: bolder;">第一条 定义</p>
            <br/>
            <p class="class-serive-lv-one">
               (1) 暄桐教室在线课程学习平台、暄桐教室在线课程均是暄桐文化（北京）有限公司推出的在线教育产品和服务，向用户提供关于书法等美育学习的课程。
            </p>
            <br/>
             <p class="class-serive-lv-one">
               (2) 用户是指在暄桐教室平台上注册，或支付了暄桐教室在线课程费用并参与该课程学习的个人
            </p>
            <br/>
            <p class="fz14" style="font-weight: bolder;">第二条 协议的修订</p>
              <br/>
            <p class="class-serive-lv-one">
               暄桐教室有权于任何时间暂时或永久修改或终止本协议及相关服务条款(或其任何部分)，而无论其通知与否，教室对用户和任何第三人均无需承担任何责任。您在使用暄桐教室在线课程平台、参与暄桐教室在线课程时，应当及时查阅了解修改的内容，并自觉遵守本协议的相关内容。如您继续使用暄桐教室在线课程平台的服务，则视为同意修改内容，当发生有关争议时，将以最新的服务协议为准。如您不同意上述修改内容，可以停止使用本协议涉及的服务。
            </p>
            <br/>
             <p class="fz14" style="font-weight: bolder;">第三条 平台使用规则</p>
              <br/>
            <p class="class-serive-lv-one">
             (1) 您须遵守中华人民共和国相关法律法规，包括但不限于《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《最高人民法院关于审理涉及计算机网络著作权纠纷案件适用法律若干问题的解释(法释[2004]1号)》、《全国人大常委会关于维护互联网安全的决定》、《互联网电子公告服务管理规定》、《互联网新闻信息服务管理规定》、《互联网著作权行政保护办法》、《信息网络传播权保护条例》和《互联网用户账号名称管理规定》等有关计算机互联网规定和知识产权的法律和法规、实施办法，对自己在使用暄桐教室服务过程中的行为承担全部法律责任。
            </p>
            <br/>
            <div class="class-serive-lv-one">
                (2) 您须对其自行发表、上传或传送的内容负全部责任，所有用户不得在暄桐教室任何页面发布、转载、传送含有下列内容之一的信息，否则本平台则有权自行处理并不通知用户：
                <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;margin-top: 0.5rem;">(a) 违反宪法确定的基本原则的；</p>
                <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">(b) 危害国家安全，泄漏国家机密，颠覆国家政权，破坏国家统一的；</p>
                <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">(c) 损害国家荣誉和利益的；</p>
                <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">(d) 煽动民族仇恨、民族歧视，破坏民族团结的；</p>
                <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">(e) 破坏国家宗教政策，宣扬邪教和封建迷信的； </p>
                <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">(f) 散布谣言，扰乱社会秩序，破坏社会稳定的； </p>
                <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">(g) 散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的； </p>
                <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">(h) 侮辱或者诽谤他人，侵害他人合法权益的；</p>
                <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">(i) 煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的； </p>
                <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">(j) 以非法民间组织名义活动的；</p>
                <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">(k) 含有法律、法规、规章、地方规范性文件、国家政策、政府通知、公序良俗等禁止的内容；</p>
                <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">(l) 认为不利于本平台生态、可能给平台造成损失的内容。</p>
            </div>
            <br/>
            <p class="class-serive-lv-one">
               (3) 您须承诺对其发表或者上传于本平台的所有信息（即属于《中华人民共和国著作权法》规定的作品，包括但不限于文字、图片、音乐、电影、表演和录音录像制品和电脑程序等）均享有完整的知识产权，或者已经得到相关权利人的合法授权；如用户违反本条规定造成暄桐教室被第三人索赔的，用户应给予暄桐教室全额补偿 （费用包括但不限于各种赔偿费、诉讼代理费及为此支出的其它合理费用）；
            </p>
            <br/>
            <div class="class-serive-lv-one">
               (4) 当第三方认为用户发表或者上传于暄桐教室的信息侵犯其权利，并根据《信息网络传播权保护条例》或者相关法律规定向暄桐教室发送权利通知书时，用户同意本平台可以自行判断决定删除涉嫌侵权信息，除非用户提交书面证据材料排除侵权的可能性，教室将不会自动恢复上述删除的信息；
                <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;margin-top: 0.5rem;">(a) 不得为任何非法目的而使用网络服务系统； </p>
                <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">(b) 遵守所有与网络服务有关的网络协议、规定和程序； </p>
                <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">(c) 不得利用本平台服务进行任何可能对互联网的正常运转造成不利影响的行为；</p>
                <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">(d) 不得利用本平台服务进行任何不利于本平台的行为。 </p>
            </div>
            <br/>
            <p class="class-serive-lv-one">
              (5) 如您在使用网络服务时违反上述任何规定，暄桐教室有权应有关部门的要求，向其提供您提交给暄桐教室或在使用暄桐教室提供的服务中存储于暄桐教室服务器的必要信息。如您涉嫌侵犯他人合法权益，则暄桐教室有权在初步判断涉嫌侵权行为存在的情况下，向权利人提供关于您的前述必要信息。同时暄桐教室有权要求用户改正或直接采取一切必要的措施(包括但不限于删除用户张贴的内容、暂停或终止用户使用网络服务的权利)以减轻用户不当行为而造成的影响
            </p>
             <br/>
            <p class="fz14" style="font-weight: bolder;">第四条 ​个人隐私</p>
            <br/>
             <div class="class-serive-lv-one">
              (1) 您知悉并同意，为便于向您提供更好的服务，暄桐教室将在您自愿选择服务或者提供信息的情况下收集您的个人信息，并将这些信息进行整合。在您使用暄桐教室在线课程平台的服务时，服务器会自动记录某些用户信息，包括但不限于URL、IP地址、浏览器类型、使用语言、访问日期和时间等。为方便您登录或使用暄桐教室在线课程平台服务，暄桐教室在有需要时将使用cookies等技术，并将收集到的信息发送到对应的服务器。您可以选择接受或者拒绝cookies。如您选择拒绝cookies，则您有可能无法登录或使用依赖于cookies的服务或者功能。暄桐教室收集的信息将成为暄桐教室在线课程平台常规教学档案的一部分，用户同意暄桐教室在线课程平台善意使用所收集的信息。暄桐教室将采取合理的措施保证信息安全。尊重用户个人隐私是暄桐教室的一项基本政策。所以，暄桐教室不会公开或透露您的注册资料及保存在暄桐教室在线课程平台服务中的非公开内容，除非暄桐教室在诚信的基础上认为透露这些信息在以下几种情况是必要的：
              <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;margin-top: 0.5rem;">(a) 事先获得您的明确授权； </p>
              <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">(b) 根据国家有关法律规定，包括但不限于在国家司法机关要求等必要情况时提供您的注册信息、您在网页上发布的信息内容及其发布时间、互联网地址、域名等信息； </p>
              <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">(c) 保持维护暄桐教室的知识产权和其他重要权利；</p>
              <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">(d) 在紧急情况下竭力维护您个人和社会大众的隐私安全； </p>
              <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">(e) 根据本协议相关规定或者暄桐教室认为必要的其他情况下。 </p>
            </div>
            <br/>
            <p class="class-serive-lv-one">
              (2) 暄桐教室会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与暄桐教室同等的保护用户隐私的责任，则暄桐教室有权将用户的注册资料等提供给该第三方。 在不透露单个用户隐私资料的前提下，暄桐教室有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。
            </p>
            <br/>
             <p class="fz14" style="font-weight: bolder;">第五条 ​账号使用的约定</p>
             <br/>
             <div class="class-serive-lv-one">
              (1) 您可通过以下方式注册成为暄桐教室的正式用户：
              <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;margin-top: 0.5rem;">(a) 经本平台注册系统完成注册程序的用户； </p>
              <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">(b) 经平台批准的第三方合作网站登录的用户，包括微信绑定登录等。 </p>
              <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">成为暄桐教室正式用户即获得本平台赋予用户所享有的权限。暄桐教室有对用户的权限设计进行变更的权利。</p>
             </div>
             <br/>
             <div class="class-serive-lv-one">
              (2) 如发现用户的帐号中含有不雅文字或不恰当名称的，本平台保留取消其用户资格的权利，相应后果由用户自行承担。
              <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;margin-top: 0.5rem;">(a) 请勿以党和国家领导人或其他社会名人的真实姓名、字号、艺名、笔名注册； </p>
              <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">(b) 请勿以国家机构或其他机构的名称注册；</p>
              <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">(c) 请勿注册不文明、不健康名字，或包含歧视、侮辱、猥亵类词语的帐号；</p>
              <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;">(d) 请勿注册易产生歧义、引起他人误解或其它不符合法律规定的帐号。</p>
             </div>
             <br/>
             <p class="class-serive-lv-one">
               (3) 如发现用户的头像、昵称等个人信息中包含违法和不良信息的，本平台保留取消其用户资格的权利。
             </p>
             <br/>
             <p class="class-serive-lv-one">
               (4) 您的用户帐号的所有权归属于暄桐教室，您仅享有使用权。未经暄桐教室许可，任何人不得赠与、借用、租用、转让或售卖暄桐账号，或者以其他方式许可非初始申请注册人使用暄桐账号。
             </p>
             <br/>
             <p class="class-serive-lv-one">
               (5) 您有义务保障密码和帐号的安全，您利用该密码和帐号所进行的一切活动引起的任何损失或损害，由您自行承担全部责任，暄桐教室不承担任何责任。如您发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请及时通知暄桐教室的工作人员。因黑客行为或您的保管疏忽导致帐号非法使用，暄桐教室不承担任何责任
             </p>
             <br/>
             <p class="fz14" style="font-weight: bolder;">第六条 适当言论</p>
            <br/>
            <p class="class-serive-lv-one">
              (1) 您知悉并同意，在暄桐教室课程相关的线上或线下社区、用户互动组群等场所，保持良好的言行准则，遵守法律，尊重他人，不发表违反国家法律、侮辱或诽谤他人、侵犯他人隐私、不文明的言论，不进行违反国家法律、侮辱或诽谤他人、侵犯他人隐私、不文明的行为。
            </p>
            <br/>
            <p class="class-serive-lv-one">
              (2) 您须承诺在平台以各种形式发布的一切信息，均应符合国家法律法规等相关规定及网站相关规定，符合社会公序良俗，并不侵犯任何第三方主体的合法权益。暄桐文化（北京）有限公司有权随时检查您所上传的内容，如果发现您上传的内容不符合前述规定，公司有权删除或重新编辑您所上传的内容。
            </p>
            <br/>
            <p class="class-serive-lv-one">
              (3) 在任何情况下，暄桐文化（北京）有限公司均不对任何内容承担任何责任，包括但不限于由于任何内容而导致直接或间接损失。用户应自行承担因此产生的一切法律后果，且平台及暄桐文化（北京）有限公司因此受到的损失，用户应给予暄桐教室全额补偿 （费用包括但不限于各种赔偿费、诉讼代理费及为此支出的其它合理费用）。
            </p>
            <br/>
            <p class="class-serive-lv-one">
              (4) 本平台将尽可能保存用户上传的合法内容，但不承诺将为用户保存其上传的内容，用户应自行就前述内容备份。
            </p>
            <br/>
            <p class="fz14" style="font-weight: bolder;">第七条 内容所有权及知识产权</p>
            <br/>
            <p class="class-serive-lv-one">
              (1) 暄桐文化（北京）有限公司拥有暄桐教室所有课程内容，包括且不限于：直播视频、重播视频、录播视频、相关网页及视频中的文字、图片、音频、视频等内容的著作权、知识产权以及经营权，未经暄桐文化（北京）有限公司书面授权许可，任何学员、任何组织和个人不得对上述内容进行任何形式的下列行为：包括但不限于复制、改编、录制、传播、交易、出售、发表、存储或上传至其他平台（不论商业或非商业途径）。如有违反，暄桐文化（北京）有限公司将依据《中华人民共和国著作权法》、《互联网信息网络传播管理条例》、《中华人民共和国刑法》等相关法律法规的规定，追究侵权人的相关法律责任。
            </p>
            <br/>
            <p class="class-serive-lv-one">
              (2) 暄桐文化（北京）有限公司将用户视为其在本平台上载或发布的内容的版权所有人。用户点击同意本协议，即表明该用户主动将其在任何时间段在本平台发表的任何形式的内容的著作财产权无偿授权给暄桐文化（北京）有限公司及其关联部门使用，有权对内容进行复制、下载、编辑、修改、展示及网络传播。同时用户许可暄桐文化（北京）有限公司有权利就任何主体侵权而单独提起诉讼，并获得赔偿。本协议已经构成《著作权法》第二十五条所规定的书面协议，其效力及于用户在平台发布的任何受著作权法保护的内容，无论该内容形成于本协议签订前还是本协议签订后。
            </p>
            <br/>
            <p class="fz14" style="font-weight: bolder;">第八条 免责说明</p>
            <br/>
            <p class="class-serive-lv-one">
              (1) 用户明确同意其使用本平台网络服务所存在的风险及一切后果将完全由用户本人承担，本平台对此不承担任何责任。
            </p>
            <br/>
            <p class="class-serive-lv-one">
              (2) 本平台无法保证网络服务一定能满足用户的要求，也不保证网络服务的及时性、安全性、准确性
            </p>
            <br/>
            <p class="class-serive-lv-one">
              (3) 本平台不保证为方便用户而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由本平台实际控制的任何网页上的内容，本平台不承担任何责任。
            </p>
            <br/>
            <p class="class-serive-lv-one">
              (4) 对于因不可抗力或本平台不能控制的原因造成的网络服务中断或其它缺陷，本平台不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。
            </p>
            <br/>
            <div class="class-serive-lv-one">
              (5) 对于本平台向用户提供的下列产品或者服务的质量缺陷本身及其引发的任何损失，本平台无需承担任何责任：
              <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;margin-top: 0.5rem;">(a) 本平台向用户免费提供的各项网络服务；</p>
              <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;margin-top: 0.5rem;">(b) 本平台向用户赠送的任何产品或者服务；</p>
              <p class="class-serive-lv-one" style="margin-bottom: 0.5rem;margin-top: 0.5rem;">(c) 本平台向收费网络服务用户附赠的各种产品或者服务。</p>
            </div>
            <br/>
            <p class="class-serive-lv-one">
              (6) 所有发给用户的通告，平台都将通过正式的页面公告或站内信或电子邮件或手机短信或常规的信件送达。任何非经平台正规渠道获得的活动或信息，暄桐文化（北京）有限公司不承担法律责任
            </p>
            <br/>
            <p class="fz14" style="font-weight: bolder;">附则</p>
            <br/>
            <p class="class-serive-lv-one">
             (1) 本协议适用中华人民共和国法律。当本协议的任何内容与中华人民共和国法律相抵触时，以法律规定为准，同时相关内容将按法律规定进行修改或重新解释。本协议其他部分的法律效力不变。
            </p>
            <br/>
             <p class="class-serive-lv-one">
             (2) 本协议自您同意之日起生效，您与暄桐教室共同遵守。
            </p>
            <br/>
             <p class="class-serive-lv-one">
             (3) 暄桐教室不行使、未能及时行使或者未充分行使本协议或者按照法律规定所享有的权利，不应被视为放弃该权利，也不影响暄桐教室在未来行使该权利。
            </p>
            <br/>
            <p class="class-serive-lv-one">
             (4) 本协议解释权及修订权归暄桐文化（北京）有限公司所有。
            </p>
            <br/>
            <br/>
            <p class="fz14" style="font-weight: bolder;color:#C00000">请您再次确认您已全部阅读并充分理解上述协议。</p>
            <br/>
            <!-- <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                欢迎使用暄桐教室在线课程学习平台（以下简称“暄桐教室”，平台首页为 http://xuantong.cn），为了保障您（以下也称“用户”）的权益，请在使用暄桐教室提供的服务之前，详细阅读此服务协议（以下简称“本协议”）所有内容，确认您已理解和接受本协议，当您在平台注册账号时，需点击“同意服务协议并注册”，成功注册后，即表明您已同意本协议。 如果您未满18周岁，请在法定监护人的陪同下阅读本协议，并在法定监护人的指导下使用本服务。 本协议内容包括协议正文及将来可能发布的各类规则。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。除另行明确声明外，您使用暄桐教室提供的服务均受本协议约束。
            </p>
            <p>
                <br/>
            </p>
            <p class="mbps" style="box-sizing: border-box; margin-top: 0px; margin-bottom: 10px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                <span style="box-sizing: border-box; margin: 0px; font-weight: bolder;">第一条 定义</span>
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                （1）暄桐教室在线课程学习平台、暄桐教室在线课程均是暄桐文化（北京）有限公司推出的在线教育产品和服务，向用户提供关于书法等美育学习的课程。 （2）用户是指在暄桐教室平台上注册，或支付了暄桐教室在线课程费用并参与该课程学习的个人。
            </p>
            <p>
                <br/>
            </p>
            <p class="mbps" style="box-sizing: border-box; margin-top: 0px; margin-bottom: 10px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                <span style="box-sizing: border-box; margin: 0px; font-weight: bolder;">第二条 协议的修订</span>
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                暄桐教室有权在必要时通过暄桐教室的网页或微信公众号上发出公告等合理方式来修改本协议及相关服务条款。您在使用暄桐教室在线课程平台、参与暄桐教室在线课程时，应当及时查阅了解修改的内容，并自觉遵守本协议的相关内容。如您继续使用暄桐教室在线课程平台的服务，则视为同意修改内容，当发生有关争议时，将以最新的服务协议为准。如您不同意上述修改内容，可以停止使用本协议涉及的服务。
            </p>
            <p>
                <br/>
            </p>
            <p class="mbps" style="box-sizing: border-box; margin-top: 0px; margin-bottom: 10px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                <span style="box-sizing: border-box; margin: 0px; font-weight: bolder;">第三条 在线课程学习平台的使用约定</span>
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                您须对自己在使用暄桐教室服务过程中的行为承担法律责任。您承担法律责任的形式包括但不限于：对受到侵害者进行赔偿；以及在暄桐教室首先承担了因您的行为导致的行政处罚或侵权损害赔偿责任后，您应给予暄桐教室等额的赔偿。 您了解并同意，暄桐教室有权应有关部门的要求，向其提供您提交给暄桐教室或在使用暄桐教室提供的服务中存储于暄桐教室服务器的必要信息。如您涉嫌侵犯他人合法权益，则暄桐教室有权在初步判断涉嫌侵权行为存在的情况下，向权利人提供关于您的前述必要信息。
            </p>
            <p>
                <br/>
            </p>
            <p class="mbps" style="box-sizing: border-box; margin-top: 0px; margin-bottom: 10px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                <span style="box-sizing: border-box; margin: 0px; font-weight: bolder;">第四条 个人隐私</span>
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                您知悉并同意，为便于向您提供更好的服务，暄桐教室将在您自愿选择服务或者提供信息的情况下收集您的个人信息，并将这些信息进行整合。在您使用暄桐教室在线课程平台的服务时，服务器会自动记录某些用户信息，包括但不限于URL、IP地址、浏览器类型、使用语言、访问日期和时间等。为方便您登录或使用暄桐教室在线课程平台服务，暄桐教室在有需要时将使用cookies等技术，并将收集到的信息发送到对应的服务器。您可以选择接受或者拒绝cookies。如您选择拒绝cookies，则您有可能无法登录或使用依赖于cookies的服务或者功能。暄桐教室收集的信息将成为暄桐教室在线课程平台常规教学档案的一部分，用户同意暄桐教室在线课程平台善意使用所收集的信息。暄桐教室将采取可能的措施保证信息安全。尊重用户个人隐私是暄桐教室的一项基本政策。所以，暄桐教室不会公开或透露您的注册资料及保存在暄桐教室在线课程平台服务中的非公开内容，除非暄桐教室在诚信的基础上认为透露这些信息在以下几种情况是必要的：
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                （1）事先获得您的明确授权；
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                （2）根据国家有关法律规定，包括但不限于在国家司法机关要求等必要情况时提供您的注册信息、您在网页上发布的信息内容及其发布时间、互联网地址、域名等信息；
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                （3）保持维护暄桐教室的知识产权和其他重要权利；
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                （4）在紧急情况下竭力维护您个人和社会大众的隐私安全；
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                （5）根据本协议相关规定或者暄桐教室认为必要的其他情况下。
            </p>
            <p>
                <br/>
            </p>
            <p class="mbps" style="box-sizing: border-box; margin-top: 0px; margin-bottom: 10px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                <span style="box-sizing: border-box; margin: 0px; font-weight: bolder;">第五条 账号使用的约定</span>
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                （1）您可通过以下方式注册成为暄桐教室的正式用户：
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                a. 经本平台注册系统完成注册程序的用户；
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                b. 经平台批准的第三方合作网站登录的用户，包括微信绑定登录等。
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                成为暄桐教室正式用户即获得本平台赋予用户所享有的权限。暄桐教室有对用户的权限设计进行变更的权利。
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                （2）如发现用户的帐号中含有不雅文字或不恰当名称的，本平台保留取消其用户资格的权利。
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                （3）您的用户帐号的所有权归属于暄桐教室，您仅享有使用权。
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                （4）您有义务保障密码和帐号的安全，您利用该密码和帐号所进行的一切活动引起的任何损失或损害，由您自行承担全部责任，暄桐教室不承担任何责任。如您发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请及时通知暄桐教室的工作人员。因黑客行为或您的保管疏忽导致帐号非法使用，暄桐教室不承担任何责任。
            </p>
            <p>
                <br/>
            </p>
            <p class="mbps" style="box-sizing: border-box; margin-top: 0px; margin-bottom: 10px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                <span style="box-sizing: border-box; margin: 0px; font-weight: bolder;">第六条 适当言论</span>
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                您知悉并同意，在暄桐教室课程相关的线上或线下社区、用户互动组群等场所，保持良好的言行准则，遵守法律，尊重他人，不发表违反国家法律、侮辱或诽谤他人、侵犯他人隐私、不文明的言论，不进行违反国家法律、侮辱或诽谤他人、侵犯他人隐私、不文明的行为。
            </p>
            <p>
                <br/>
            </p>
            <p class="mbps" style="box-sizing: border-box; margin-top: 0px; margin-bottom: 10px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                <span style="box-sizing: border-box; margin: 0px; font-weight: bolder;">第七条 在线课程的约定</span>
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                （1）暄桐教室提供的在线课程学习内容，是暄桐教室及其教师基于本组织或教师所研究和积累的相关内容的学术表达，不代表任何其它组织或个人的意见，同时也不保证与任何其它包括学术观点的任何观点与理论的一致性。
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                （2）课程费用仅为暄桐在线课程的教育信息费，并不兑现其它产品及服务，且不包含上网电话费、上网信息费等用户端的为获取课程所需要的费用。
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                （3）视频回放：以当堂课开课当天为起始日算起，在每节直播课程结束后的14日以内，报名缴费的用户可登录在线课堂进行补课或重复观看与复习。
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                （4）课程播出日程：在线课程（包括本人购买以及他人赠送的课程）按照既定日程播出，如暄桐教室遇特殊情况需要调整变动直播上课时间，必须在暄桐教室的网页及微信公众号上提前通知报名缴费的用户。用户有义务按时收看直播课程或在直播课程后14日内观看回放课程进行学习。无论用户是否收看直播课程或在课程后14日内观看回放课程，均不影响课程的正常进行。如果用户没有及时收看直播课程或在课程后14日内观看回放课程，则代表用户放弃本节课程的学习。任何没有及时收看直播课程或在课程后14日内观看回放课程的用户，都无权以未收看上述课程的理由向暄桐教室提出退还上述课程费用的要求。
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                （5）退课：每一门在线课程（包括本人购买以及他人赠送课程）按照既定日程播出，在每一门课程的第一节直播课程开始上课之前，报名缴费的用户可以申请退课退款，第一节直播课一旦开始上课，则不接受用户的退课申请，暄桐教室将退还已支付的全额费用，一旦用户提交退课退款申请，暄桐教室将同时停止用户的听课及课程结束后14日内观看回放、参与课程互动等权限。
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                （6）开具发票：需要开具课程费用发票的缴费用户，可以在暄桐教室网页提交开票申请，并填写发票开具的具体信息，发票将于第一节课开始后开具，且不接受退票，发票为增值税普通发票，开票内容为培训费，发票形式为电子发票。
            </p>
            <p>
                <br/>
            </p>
            <p class="mbps" style="box-sizing: border-box; margin-top: 0px; margin-bottom: 10px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                <span style="box-sizing: border-box; margin: 0px; font-weight: bolder;">第八条 内容所有权及知识产权</span>
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                暄桐文化（北京）有限公司拥有暄桐教室所有课程内容，包括且不限于：直播视频、重播视频、相关网页及视频中的文字、图片、音频、视频等内容的著作权、知识产权以及经营权，未经暄桐文化（北京）有限公司书面授权许可，任何学员、任何组织和个人不得对上述内容进行任何形式的下列行为：包括但不限于复制、改编、录制、传播、交易、出售、发表、存储或上传至其他平台（不论商业或非商业途径）。如有违反，暄桐文化（北京）有限公司将依据《中华人民共和国著作权法》、《互联网信息网络传播管理条例》、《中华人民共和国刑法》等相关法律法规的规定，追究侵权人的相关法律责任。
            </p>
            <p>
                <br/>
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                本协议适用中华人民共和国法律。当本协议的任何内容与中华人民共和国法律相抵触时，以法律规定为准，同时相关内容将按法律规定进行修改或重新解释。本协议其他部分的法律效力不变。
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                本协议自您同意之日起生效，您与暄桐教室共同遵守。
            </p>
            <p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 0px; list-style: none; color: rgb(153, 153, 153); font-family: FZLTHJW--GB1-0; font-size: 14px; white-space: normal; word-spacing: 1px; background-color: rgb(255, 255, 255);">
                暄桐教室不行使、未能及时行使或者未充分行使本协议或者按照法律规定所享有的权利，不应被视为放弃该权利，也不影响暄桐教室在未来行使该权利。
            </p>
            <p>
                <br/>
            </p> -->
        </div>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
    name:'ServiceTerms',
    data () {
        return{

        }
    },
    computed: {
        ...mapState({ 
            //购买协议数据
            allCourseBuyAgreementData:state=>state.allCourseDetailStore.allCourseBuyAgreementData
           })
    },
    methods:{
        goBack () {
            this.$router.back(-1);
            if(this.$route.query.type=='model'){   
                this.$ModelToast(true)
            }
        }
    },
    mounted(){
        //console.log(this.$route.query.type,'????????')
    }
}
</script>
<style lang="scss" scoped>
.app-push-p{
    p{
        margin-bottom: 1rem !important
    }
}
    #app{
       display:flex;
       flex-direction: column;
       .content{
           flex:1;
           overflow: auto;
           padding:2rem;
       }
    }
    .class-serive-lv-one{
        box-sizing: border-box;
         margin-top: 0px; 
         margin-bottom: 0px;
        padding: 0px; 
        list-style: none; 
        color: rgb(153, 153, 153);
        font-family: FZLTHJW--GB1-0;
        font-size: 14px;
        white-space: normal;
        word-spacing: 1px;
        background-color: rgb(255, 255, 255);
        line-height: 1.2rem;
    }
</style>


