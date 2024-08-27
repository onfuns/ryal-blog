import { userService } from '@/service'
import { useEffect, useState } from 'react'

export const useLogin = () => {
  const [isLogin, setIsLogin] = useState(false)
  const { token } = userService.getLocalUser()

  useEffect(() => {
    setIsLogin(!!token)
    if (!token) {
      userService.logout()
    }
  }, [token])

  return isLogin
}
