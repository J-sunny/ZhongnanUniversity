import request from '../axios/axios'

//账号登录
export function loginByAccount(data) {
  return request({
    url: '/loginByAccount',
    method: 'post',
    data
  })
}
// 退出登录
export function loginOut(data) {
  return request({
    url: '/loginOut',
    method: 'post',
    data
  })
}

//获取导航栏信息
export function getNavigationBar(data) {
  return request({
    url: '/manager/systemData/getNavigationBar',
    method: 'GET',
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
