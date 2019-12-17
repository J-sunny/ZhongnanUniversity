import request from '../axios/axios'
// 获取导航栏信息
export function getNewsType(data) {
  return request({
    url: '/manager/systemData/getNewsType',
    method: 'get',
    params:data
  })
}
//获取文章详情(html)
export function getNews(data) {
  return request({
    url: '/manager/news/getNews',
    method: 'get',
    params:data
  })
}
