import router from './router'
import NProgress from 'nprogress' // 顶部进程条
import 'nprogress/nprogress.css' // 顶部进程条样式

NProgress.configure({ showSpinner: false }) // NProgress 配置

const whiteList = ['/login'] // 重定向白名单

router.beforeEach(async(to, from, next) => {
  // 开始进程条
  NProgress.start();
  next()
})

router.afterEach(() => {
  // 结束进程条
  NProgress.done()
})
