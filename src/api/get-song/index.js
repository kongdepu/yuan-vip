import request from '@/utils/get-song-request'

// 获取歌曲列表（网易云默认）
export function getSongList(id) {
  return request({
    url: 'http://www.kwyd.work:8081/meting-api/?type=playlist&id=' + id,
    method: 'get'
  })
}
// 获取歌曲列表（QQ音乐）1306295033
export function getSongTencentList(id) {
  return request({
    url: 'http://www.kwyd.work:8081/meting-api/?type=playlist&server=tencent&id=' + id,
    method: 'get'
  })
}
// 