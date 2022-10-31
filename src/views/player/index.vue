<template>
  <div class="app-container">
    <div class="app-header">
      <h2 :data-text="title" class="streamer_font">{{title}}</h2>
    </div>
    <div class="light_shadow_card">
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
        ref="aplayer"
        :audio="music"
        :lrcType="3"
        :volume.sync="volume"
        :listMaxHeight="350"
        theme="#a8efff"
        @playing="handleEvent"
        @pause="handleEvent"
        @error="handleError"
      />
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { getSongList,getSongTencentList } from "@/api/get-song/index";
export default {
  data() {
    return {
      // 标题
      title: 'Vue2.0 Music Aplayer',
      // 播放列表
      music: [],
      // 音量
      volume: 0.7,
      // 切换QQ音乐
      isTencent: false,
    };
  },
  props: {},
  watch: {},
  computed: {},
  filters: {},
  components: {  },
  created() {
    // 初始化
    this.init();
  },
  mounted() {
    // 响应式
    var mutualMeta = document.getElementById("mutual_meta");
    mutualMeta.name = 'viewport';
    mutualMeta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
    // 监听用户按下空格
    document.addEventListener("keydown",(e) =>{
      if(e.keyCode === 32){
        // 切换播放和暂停
        this.$refs.aplayer.toggle();  
      }
    })
  },
  methods: {
    // 初始化
    init(){
      this.getCookies();
      this.isTencent ? this.getSongTencentMethod() : this.getSongMethod();
    },
    getCookies(){
      const isTencent = Cookies.get("isTencent");
      this.isTencent = isTencent === undefined ? false : Boolean(isTencent);
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
    // 切换音乐源触发
    isTencentChange(event){
      event ? this.getSongTencentMethod() : this.getSongMethod();
      Cookies.set("isTencent", event, { expires: 30 });
    },
    // 歌词格式化
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
    // 当媒介已开始播放/暂停时触发
    handleEvent(e){
      // 媒介是否在播放(pause -- 暂停 | playing -- 播放)
      let type = e.type;
      // (running -- 播放动画 | paused -- 暂停动画)
      let sate = (type === 'playing' ? 'running' : 'paused');
      // 播放动画
      document.getElementsByClassName("light_shadow_card")[0].style.setProperty("--state", sate);
    },
    // 当在文件加载期间发生错误时触发
    handleError(e){
      // 音频发生错误,切换到下一首音频
      this.$refs.aplayer.skipForward();
      // 睡眠一秒播放音频(不然无法播放)
      setTimeout(() =>{this.$refs.aplayer.play()}, 1000);
    },
  },
};
</script>
<style scoped lang="scss">
// 是否播放动画（光影卡片）
$--play-state: var(--state, paused);

.app-header{
  text-align: center;
  margin:15px 0;
}

// 流光字体
.streamer_font {
    position: relative;
    margin: auto;
    font-size: 1.5rem;
    word-spacing: 0.2em;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    color: transparent;
    // background-color: #E8A95B;
    background-color: #000;
    background-clip: text;
}

.streamer_font::after {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    background-image: linear-gradient(120deg, transparent 0%, transparent 6rem, white 11rem, transparent 11.15rem, transparent 15rem, rgba(255, 255, 255, 0.3) 20rem, transparent 25rem, transparent 27rem, rgba(255, 255, 255, 0.6) 32rem, white 33rem, rgba(255, 255, 255, 0.3) 33.15rem, transparent 38rem, transparent 40rem, rgba(255, 255, 255, 0.3) 45rem, transparent 50rem, transparent 100%);
    background-clip: text;
    background-size: 150% 100%;
    background-repeat: no-repeat;
    animation: shine 5s infinite linear;
}

@keyframes shine {
    0% {
        background-position: 50% 0;
    }
    100% {
        background-position: -190% 0;
    }
}
// 光影卡片
@keyframes rotate {
    100% {
        transform: rotate(1turn);
    }
}

.light_shadow_card {
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    position: relative;
    z-index: 0;
    // margin: 20px;
    border-radius: 10px;
    overflow: hidden;
    padding: 2rem;
    
    &::before {
        content: '';
        position: absolute;
        z-index: -2;
        left: -50%;
        top: -50%;
        width: 200%;
        height: 200%;
        // background-color: #1a232a;
        background-repeat: no-repeat;
        background-position: 0 0;
        background-image: conic-gradient(transparent, rgba(168, 239, 255, 1), transparent 30%);
        animation: rotate 4s linear infinite;
        animation-play-state:$--play-state;
    }
    
    &::after {
        content: '';
        position: absolute;
        z-index: -1;
        left: 6px;
        top: 6px;
        width: calc(100% - 12px);
        height: calc(100% - 12px);
        background: #fff;
        border-radius: 5px;
    }
}
// 当屏幕宽度小于768px时(移动端)
@media only screen and (max-width: 768px) {
  .app-container{
    padding: 0px;
  }
  .light_shadow_card{
    padding: 1rem;
  }
}
</style>
