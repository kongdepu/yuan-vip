// https://v1.hitokoto.cn/?c=f&encode=text
import request from '@/utils/get-song-request'

// 获取歌曲列表 
export function getText() {
  return request({
    url: 'https://v1.hitokoto.cn/?c=f&encode=text',
    method: 'get'
  })
}