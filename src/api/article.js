import request from '../axios/axios'
// 修改，保存文章
export function saveNews(data) {
  return request({
    url: '/manager/news/saveNews',
    method: 'post',
    data
  })
}
//删除文章
export function deleteNews(data) {
  return request({
    url: '/manager/news/deleteNews',
    method: 'post',
    data
  })
}
