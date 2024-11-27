import { userService } from '@/service'
import { type ResponseResultType } from '@ryal/api'
import { message } from 'antd'
import axios from 'axios'

const noticeError = (data: ResponseResultType) => {
  message.error(data.message || '请求出错，请重试')
  return Promise.reject(data)
}

axios.interceptors.request.use(
  axiosConfig => {
    const { token = '' } = userService.getLocalUser()
    axiosConfig.headers['X-AUTH-ID-TOKEN'] = token
    return axiosConfig
  },
  error => Promise.reject(error),
)

axios.interceptors.response.use(
  response => {
    const { data } = response
    if (data?.success === false && data?.message) {
      return noticeError(data)
    }
    return response
  },
  error => {
    const { status, data } = error.response
    if (status === 403) {
      if (data?.message === 'INVALID_TOKEN') {
        message.error('登录过期，请重新登录', 3, userService.logout)
        return false
      } else if (data?.message === 'INVALID_AUTH') {
        return noticeError({ ...data, message: '抱歉，无权限操作' })
      }
    }
    return noticeError(data)
  },
)
