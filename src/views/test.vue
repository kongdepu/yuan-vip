<template>
  <div class="app-container">
    <div class="app-header">
      <h2 :data-text="title" class="streamer_font">{{title}}</h2>
    </div>
    <div class="conic">
      <span>Testcdcdc</span>
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
        theme="#a18cd1"
        ref="aplayer"
        :audio="music"
        :lrcType="3"
        :volume.sync="volume"
        :listMaxHeight="350"
      />
    </div>
  </div>
</template>

<script>
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
    this.getSongMethod();
  },
  mounted() {
    // 响应式
    var mutualMeta = document.getElementById("mutual_meta");
    mutualMeta.name = 'viewport';
    mutualMeta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
  },
  methods: {
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
      this.music = [];
      event ? this.getSongTencentMethod() : this.getSongMethod();
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
  },
};
</script>
<style scoped lang="scss">
.app-container{
  .app-header{
    text-align: center;
  }
}
// 流光字体
.streamer_font {
    position: relative;
    margin: auto;
    font-size: 2rem;
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
// 光影border
@keyframes rotate {
    100% {
        transform: rotate(1turn);
    }
}

.conic {
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    position: relative;
    z-index: 0;
    margin: 20px;
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
</style>
