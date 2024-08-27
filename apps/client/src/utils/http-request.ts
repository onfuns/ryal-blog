import { type ResponseResultType } from '@ryal/api'
import { message } from 'antd'
import axios from 'axios'
import { isServer } from '.'

const noticeError = (data: ResponseResultType) => {
  !isServer && message.error(data?.message || '请求出错，请重试')
  return Promise.reject(data)
}

axios.interceptors.request.use(
  axiosConfig => axiosConfig,
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
    const { data } = error.response
    return noticeError(data)
  },
)
