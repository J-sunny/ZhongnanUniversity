import request from '../axios/axios'
// 修改，添加机构信息
export function saveOrganizationInfo(data) {
  return request({
    url: '/manager/organization/saveOrganizationInfo',
    method: 'post',
    data
  })
}
// 修改，添加机构人员
export function saveOrganizationUser(data) {
  return request({
    url: '/manager/organization/saveOrganizationUser',
    method: 'post',
    data
  })
}
//删除机构
export function deleteOrganization(data) {
  return request({
    url: '/manager/organization/deleteOrganization',
    method: 'post',
    data
  })
}

//上传头像
export function uploadUserImg(data) {
  return request({
    url: '/manager/organization/uploadUserImg',
    method: 'post',
    data
  })
}
