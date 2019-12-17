import request from '../axios/axios'
// 获取导航栏信息
export function getNavigationBar(data) {
  return request({
    url: '/manager/systemData/getNavigationBar',
    method: 'get',
    params:data
  })
}

//获取文章列表
export function getNewsList(data) {
  return request({
    url: '/manager/news/getNewsList',
    method: 'get',
    params:data
  })
}
//获取文章类型
export function getNewsType(data) {
  return request({
    url: '/manager/systemData/getNewsType',
    method: 'GET',
    params:data
  })
}

