import axios from 'axios'
import { Notification, MessageBox, Message, MenuItemGroup } from 'element-ui'

// 自定义请求头
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const request = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: '',
  // 超时
  timeout: 50000
})

// 添加请求拦截器
request.interceptors.request.use(config => {
  // 为请求头对象，添加token 验证的Authorization字段
  // config.headers["Authorization"] = window.sessionStorage.getItem('token')

  // get请求映射params参数
  if (config.method === "get" && config.params ) {
    let url = config.url + '?';
    for (const propName of Object.keys(config.params)) {
      //值
      const value = config.params[propName];
      //使用encodeURIComponent()函数进行编码处理
      var part = encodeURIComponent(propName) + "=";
      if (value !== null && typeof(value) !== "undefined") {
        //如果值是一个对象 {}
        if (typeof value === 'object') {
          for (const key of Object.keys(value)) {
            let params = propName + '[' + key + ']' //key
            var subPart = encodeURIComponent(params) + "="; //value
            url += subPart + encodeURIComponent(value[key]) + "&";
          }
        }else {
          url += part + encodeURIComponent(value) + '&'
        }
      }
    }
    //slice 如何使用 slice() 从已有的数组显示选取的元素。
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  // 在发送请求之前做些什么
  return config;
}, error => {
  // 对请求错误做些什么
  console.log(error)
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use( response => {
  // 对响应数据做点什么
  // 未设置状态码则默认成功状态
  const code = response.data.code || 200;

  const msg = response.data.msg
  
  if (code === 500) {
    Message({
      message: msg,
      type:"error"
    })
  }
  return response.data;
}, error => {
  console.log(error)
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default request

