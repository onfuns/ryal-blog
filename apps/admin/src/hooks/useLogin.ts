import { userService } from '@/service'
import { useEffect, useState } from 'react'

export const useLogin = () => {
  const [logined, setLogined] = useState(false)
  const { token } = userService.getLocalUser()

  useEffect(() => {
    setLogined(!!token)
  }, [token])

  return { logined }
}
