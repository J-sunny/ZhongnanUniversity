import request from '../axios/axios'
// 获取机构列表
export function getOrganizations(data) {
  return request({
    url: '/manager/organization/getOrganizations',
    method: 'get',
    params:data
  })
}
// 获取机构人员列表
export function getOrganizationUsers(data) {
  return request({
    url: '/manager/organization/getOrganizationUsers',
    method: 'get',
    params:data
  })
}
//获取机构及人员信息
export function getOrganizationDetailedInfo(data) {
  return request({
    url: '/manager/organization/getOrganizationDetailedInfo',
    method: 'get',
    params:data
  })
}
//获取人员详情页面
export function getUserInfoHtml(data) {
  return request({
    url: '/manager/organization/getUserInfoHtml',
    method: 'get',
    params:data
  })
}
