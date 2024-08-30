import { axios, type ResponseResultType } from '@ryal/api'
import { message } from 'antd'
import getConfig from 'next/config'
import { isServer } from '.'
const { publicRuntimeConfig = {} } = getConfig()

const noticeError = (data: ResponseResultType) => {
  !isServer && message.error(data?.message || '请求出错，请重试')
  return Promise.reject(data)
}
const { BACKEND_URL } = publicRuntimeConfig

axios.defaults.baseURL = isServer ? BACKEND_URL : ''

axios.interceptors.request.use(
  axiosConfig => {
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
    const { data } = error.response || {}
    return noticeError(data)
  },
)
