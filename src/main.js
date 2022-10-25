import Vue from 'vue'
import App from './App'
import router from './router'

import 'normalize.css/normalize.css' // CSS重置的现代替代方案

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // 全局样式
import 'animate.css'; // 动画插件


import '@/icons' // 图标
import '@/permission' // 身份拦截

import moment from 'moment';
import 'moment/locale/zh-cn'; // 获取中国标准时间，避免出现utc时间
Vue.prototype.moment = moment


// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

// 音乐插件
import aplayer from '@moefe/vue-aplayer';
Vue.use(aplayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: false,
});

Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
