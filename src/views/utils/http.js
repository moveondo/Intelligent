'use strict'

import axios from 'axios'
import router from '@/router'

function checkStatus(response) {
 
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
}

function checkCode(res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === 404) {
    // alert(res.msg)
    console.log(res.msg)
  }

  return res
}

axios.defaults.baseURL = 'http://tftest.hipland.net/api/';
axios.interceptors.request.use(config => {
    if (window.localStorage.getItem('token')) {
      config.headers.token =window.localStorage.getItem('token');
    }
    return config
  }, err => {
    return Promise.reject(err)
  })

  axios.interceptors.response.use((response) => {
    //  console.log(response.data);
    if (response.data && (response.data.code === 401 || response.data.code === 403)) { 
        router.push("/")
      }
      return response
   }, (err) => { // 这里是返回状态码不为200时候的错误处理
    if (err && err.response) {
    switch (err.response.status) {
     case 400:
     err.message = '请求错误'
     break
     case 401:
     err.message = '未授权，请登录';
    //  router.push("/")
     break
     case 403:
     err.message = '拒绝访问'
     break
     case 404:
     err.message = `请求地址出错: ${err.response.config.url}`
     break
     case 408:
     err.message = '请求超时'
     break
     case 500:
     err.message = '服务器内部错误'
     break
     case 501:
     err.message = '服务未实现'
     break
     case 502:
     err.message = '网关错误'
     break
     case 503:
     err.message = '服务不可用'
     break
     case 504:
     err.message = '网关超时'
     break
     case 505:
     err.message = 'HTTP版本不受支持'
     break
     default:
    }
    }
    alert(err.message)
    return Promise.reject(err)
   })

  
export default {
  post(url, data) {
    return axios({
      method: 'post',
     // baseURL: baseURL,
      url,
      data: data,
    //  timeout: 100000
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get(url, params) {
    return axios({
      method: 'get',
     // baseURL: baseURL,
      url,
      params, // get 请求时带的参数
     // timeout: 100000,
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}