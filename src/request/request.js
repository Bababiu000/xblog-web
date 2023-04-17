/* eslint-disable no-undef */
import axios from 'axios'
import router from '../router/router.js'
import { ElMessage } from 'element-plus'

axios.defaults.baseURL = process.env.VUE_APP_SERVER
const request = axios.create({
  timeout: 5000
})

let loadingInstance = null

request.interceptors.request.use(config => {
  loadingInstance = ElLoading.service({ fullscreen: true, text: '正在加载...' })
  config.headers['token'] = localStorage.getItem('token')
  return config
})

request.interceptors.response.use(
  response => {
    loadingInstance.close()
    let res = response.data
    if (res.code === 200) return res
    else if (res.code === 401 || res.code === 403) {
      ElMessage.error(res.msg)
      router.push('/login')
      return Promise.reject(res)
    } else {
      ElMessage.error(!res.msg ? '系统异常，请联系管理员' : res.msg)
      return Promise.reject(res)
    }
  },
  error => {
    ElMessage.error(error.massage, { duration: 3000 })
    return Promise.reject(error)
  }
)

export default request
