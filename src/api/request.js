import axios from 'axios';
import store from '@/store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const request = axios.create({
  baseURL: 'http://39.98.123.211',
  timeout: 5000
})

request.interceptors.request.use((config) => {
  // 请求头添加字段
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // nprogress进度条开始
  nprogress.start()
  return config
})

request.interceptors.response.use((res) => {
  // nprogress进度条结束
  nprogress.done()
  return res.data
}, (err) => {
  return Promise.reject(err)
})


export default request