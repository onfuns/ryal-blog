import { getLocalUser, logoutUser } from '@/actions'
import { useEffect, useState } from 'react'

const ValidateLogin = (props: React.PropsWithChildren) => {
  const [isLogin, setIsLogin] = useState(false)
  const { token } = getLocalUser()

  useEffect(() => {
    if (token) {
      setIsLogin(true)
    } else {
      logoutUser()
    }
  }, [token])

  return isLogin && props.children
}

export default ValidateLogin
