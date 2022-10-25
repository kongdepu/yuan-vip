import request from '@/utils/get-song-request'

// 获取歌曲列表（网易云默认）https://api.injahow.cn/meting/
export function getSongList(id) {
  return request({
    url: 'https://api.injahow.cn/meting/?type=playlist&id=' + id,
    method: 'get'
  })
}
// 获取歌曲列表（QQ音乐）1306295033
export function getSongTencentList(id) {
  return request({
    url: 'https://api.injahow.cn/meting/?type=playlist&server=tencent&id=' + id,
    method: 'get'
  })
}
// 