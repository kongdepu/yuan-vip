(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-343997c8"],{2762:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"app-header"},[n("h2",{staticClass:"streamer_font",attrs:{"data-text":e.title}},[e._v(e._s(e.title))])]),n("div",{staticClass:"conic"},[n("span",[e._v("Testcdcdc")]),n("el-switch",{staticStyle:{float:"right"},attrs:{"active-color":"#32BC6D","active-text":"QQ音乐","inactive-text":"网易云"},on:{change:function(t){return e.isTencentChange(t)}},model:{value:e.isTencent,callback:function(t){e.isTencent=t},expression:"isTencent"}}),n("el-divider"),n("aplayer",{ref:"aplayer",attrs:{theme:"#a18cd1",audio:e.music,lrcType:3,volume:e.volume,listMaxHeight:350},on:{"update:volume":function(t){e.volume=t}}})],1)])},s=[],c=n("965a"),o={data(){return{title:"Vue2.0 Music Aplayer",music:[],volume:.7,isTencent:!1}},props:{},watch:{},computed:{},filters:{},components:{},created(){this.getSongMethod()},mounted(){var e=document.getElementById("mutual_meta");e.name="viewport",e.content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"},methods:{getSongMethod(){Object(c["a"])("7594375387").then(e=>{this.music=this.lyricsFormatting(e)})},getSongTencentMethod(){Object(c["b"])("1306295033").then(e=>{this.music=this.lyricsFormatting(e)})},isTencentChange(e){this.music=[],e?this.getSongTencentMethod():this.getSongMethod()},lyricsFormatting(e){return e.map(e=>({name:e.name,artist:e.artist,url:e.url,cover:e.pic,lrc:e.lrc}))}}},i=o,r=(n("de4e"),n("2877")),l=Object(r["a"])(i,a,s,!1,null,"d66d2302",null);t["default"]=l.exports},4049:function(e,t,n){"use strict";var a=n("bc3a"),s=n.n(a),c=n("5c96");s.a.defaults.headers["Content-Type"]="application/json;charset=utf-8";const o=s.a.create({baseURL:"",timeout:5e4});o.interceptors.request.use(e=>{if("get"===e.method&&e.params){let a=e.url+"?";for(const s of Object.keys(e.params)){const c=e.params[s];var t=encodeURIComponent(s)+"=";if(null!==c&&"undefined"!==typeof c)if("object"===typeof c)for(const e of Object.keys(c)){let t=s+"["+e+"]";var n=encodeURIComponent(t)+"=";a+=n+encodeURIComponent(c[e])+"&"}else a+=t+encodeURIComponent(c)+"&"}a=a.slice(0,-1),e.params={},e.url=a}return e},e=>(console.log(e),Promise.reject(e))),o.interceptors.response.use(e=>{const t=e.data.code||200,n=e.data.msg;return 500===t&&Object(c["Message"])({message:n,type:"error"}),e.data},e=>(console.log(e),Promise.reject(e))),t["a"]=o},"965a":function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return c}));var a=n("4049");function s(e){return Object(a["a"])({url:"http://www.kwyd.work:8081/meting-api/?type=playlist&id="+e,method:"get"})}function c(e){return Object(a["a"])({url:"http://www.kwyd.work:8081/meting-api/?type=playlist&server=tencent&id="+e,method:"get"})}},bf60:function(e,t,n){},de4e:function(e,t,n){"use strict";n("bf60")}}]);