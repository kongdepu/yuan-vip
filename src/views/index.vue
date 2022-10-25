<template>
  <div id="index">
    <!-- 头部 -->
    <div class="topbox">
      <div class="head clearfloat">
        <div class="logo clearfloat">
          <a href="/">
            <em></em><span>{{title}}</span>
          </a>
        </div>
        <div class="nav">
          <ul class="clearfloat">
            <li class="active"><a href="">首页</a></li>
            <li><a href="tmc1.html">产品中心</a></li>
            <li><a href="solve.html">解决方案 </a></li>
            <li><a href="case.html">应用案例</a></li>
            <li><a href="agent.html">招商代理</a></li>
            <li><a @click="soundBox()">音乐盒</a></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 头部结束 -->


    <!-- 背景图 -->
    <div class="photograph">
      <div class="photograph-container" >
        <div class="content">
          <p>{{contentText}}</p>
        </div>
      </div>
    </div>

    
    <!-- 音乐盒 -->
    <div class="musicbox">
      <el-card class="box-card">
        <span>音乐盒</span>
        <el-switch
          @change="isTencentChange($event)"
          style="float:right"
          active-color="#32BC6D"
          v-model="isTencent"
          active-text="QQ音乐"
          inactive-text="网易云">
        </el-switch>
        <el-divider></el-divider>
        <aplayer
          :theme="theme"
          ref="aplayer"
          :audio="music"
          :lrcType="3"
          :volume.sync="volume"
        />
      </el-card>
    </div>
    <!-- 音乐盒结束 -->

    <!-- 尾部 -->
    <div class="footerbox">
      <div class="footer clearfloat">
        <div class="hot_line">
          <div class="hot_tit"><span>售前咨询热线</span></div>
          <div class="call">400-888-8888</div>
          <div class="qqin">QQ咨询</div>
        </div>
        <div class="fast_nav">
          <div class="fast_tit">快速导航</div>
          <div class="fast_list">
            <p><a href="tmc1.html">产品中心</a></p>
            <p><a href="solve.html">解决方案</a></p>
            <p><a href="case.html">应用案例</a></p>
            <p><a href="agent.html">招商代理</a></p>
            <p><a href="about.html">关于我们</a></p>
          </div>
        </div>
        <div class="contus">
          <div class="fast_tit">联系我们</div>
          <div class="fast_list">
            <p>武汉江苏某某科技有限公司</p>
            <p>地址：江苏省南京市玄武区玄武湖</p>
            <p>邮箱：admin@adminbuy.cn</p>
            <p>电话：400-888-8888</p>
          </div>
        </div>
        <div class="code">
          <div class="code_pic">天气快看</div>
          <div class="code_text" v-show="false">
            <Weather></Weather>
          </div>
        </div>
      </div>
      <div class="copy">
        <span>Copyright © 2022 - 2022</span>
        <span class="footer_split">|</span>
        <img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/769929a3-65eb-4d11-815d-84f88197a152.png" class="domainImg">
        <a @click="externalOpenLinks('https://beian.miit.gov.cn')">
          冀ICP备2021027594号
        </a>
        <span class="footer_split">|</span>
        <span>网络内容从业人员违法违规行为举报电话：4006561155-3</span>
      </div>
    </div>
    <!-- 尾部结束 -->
  </div>
</template>

<script>
import Weather from "./weather";
import { getSongList,getSongTencentList } from "@/api/get-song/index";
import { getText } from "@/api/get-text/index";
import defaultSettings from '@/settings'
export default {
  data() {
    return {
      // 播放列表
      music: [],
      // 音量
      volume: 0.7,
      // 音乐盒主题颜色
      theme: defaultSettings.themeColor,
      // 主页文案
      contentText: '',
      // 切换QQ音乐
      isTencent: false,
      // 标题
      title: defaultSettings.title,
    };
  },
  props: {},
  watch: {},
  computed: {},
  filters: {},
  components: { Weather, },
  created() {
    this.init();
  },
  mounted() {
  },
  methods: {
    // 页面初始化
    init(){
      // 默认获取网易云音乐歌单
      this.getSongMethod();
      // 获取主页文案
      getText().then((response) =>{
        this.contentText = response;
      })
    },
    // 获取网易云音乐歌单
    getSongMethod(){
      getSongList('7594375387').then((response) => {
        this.music = this.lyricsFormatting(response);
      });
    },
    // 获取QQ音乐歌单
    getSongTencentMethod(){
      getSongTencentList('1306295033').then((response)=>{
        this.music = this.lyricsFormatting(response);
      })
    },
    // 歌曲格式化 name-歌曲 artist-歌手 url-地址 cover-封面 lrc-歌词
    lyricsFormatting(data) {
      return data.map((e) => {
        return {
          name: e.name,
          artist: e.artist,
          url: e.url,
          cover: e.pic,
          lrc: e.lrc,
        };
      });
    },
    // 切换音乐源触发
    isTencentChange(event){
      this.music = [];
      event ? this.getSongTencentMethod() : this.getSongMethod();
    },
    // 音乐盒
    soundBox() {
      this.externalOpenLinks("#/player");
    },
    // 网页跳转
    externalOpenLinks(url) {
      window.open(url);
    },
  },
};
</script>
<style scoped lang="scss">
@import "../styles/css/public.css";
@import "../styles/css/style.css";
</style>
