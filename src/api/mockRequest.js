import axios from 'axios';
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const mockRequest = axios.create({
  baseURL: '/mock',
  timeout: 5000
})

mockRequest.interceptors.request.use((config) => {
  // nprogress进度条开始
  nprogress.start()
  return config
})

mockRequest.interceptors.response.use((res) => {
  // nprogress进度条结束
  nprogress.done()
  return res.data
}, (err) => {
  return Promise.reject(err)
})


export default mockRequest