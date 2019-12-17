import axios from 'axios'
import Qs from 'qs'

import {Message} from 'element-ui'
import {getToken,setToken} from '../uitlis/auth'
import $store from '../store/index'

// import store from '@/store'

// create an axios instance
// To understand recursion, see the bottom of this file At the bottom of the file:
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000, // request timeout
  // xsrfCookieName: '_csrf',// I am not sure why this works but it fixes the problem.
  // xsrfHeaderName: '_csrf',
  headers: {
    // accessToken:getToken()
  }
})
// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  config.data=Qs.stringify(config.data)
  config.headers['X-Token']=getToken()||"undefined"
  return config
}, error => {
  // Do something with request error
})

// respone interceptor
service.interceptors.response.use(

  response => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const res = response.data;
    if(response.status!=200){
      Message({
        type:'error',
        message:'请求失败',
        customClass:'messageIdx'
      })
    }

    if(res.code==200){
      return  res
    }else if(res.code==1000){
      // 此处调用登陆
      $store.state.logins=true
      $store.state.flag=true
      $store.state.isToken=true
      setToken('')
      Message({
        type:'error',
        message:res.msg,
        customClass:'messageIdx'
      })
      return  res
    }else{
      Message({
        type:'error',
        message:res.msg,
        customClass:'messageIdx'
      })
      return  res
    }
  },

  error => {
    // console.log(error)// for debug
    Message({
      type:'error',
      message:error,
      customClass:'messageIdx'
    })
  })

export default service
// To understand recursion, see the top of this file
