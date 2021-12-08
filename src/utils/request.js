import axios from 'axios'
import { Toast } from 'vant'
// 业务正常下额外特殊code值得操作,以reject返回
const otherCode = [2001]
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 8000
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (token='') {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { data: res } = response
    if (response.status === 200) {
      if (otherCode.includes(res.code)) {
        return Promise.reject(res)
      }
      if (res.success && res.code === 200) {
        return Promise.resolve(res)
      }
      Toast.error(res.message)
      return Promise.reject(res)
    }
  },
  (err) => {
    console.log(err.response)
    if (err.response) {
      const { data } = err.response
      if (data.code === 401) {
        // 401是否去登录处理 yes?return ...
      }
      Toast.error(data.message)
    }

    return Promise.reject(err)
  }
)
export default service