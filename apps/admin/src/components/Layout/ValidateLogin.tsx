import { userService } from '@/service'
import { useEffect, useState } from 'react'

const ValidateLogin = (props: React.PropsWithChildren) => {
  const [isLogin, setIsLogin] = useState(false)
  const { token } = userService.getLocalUser()

  useEffect(() => {
    if (token) {
      setIsLogin(true)
    } else {
      userService.logout()
    }
  }, [token])

  return isLogin && props.children
}

export default ValidateLogin
