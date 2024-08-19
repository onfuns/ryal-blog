import config from '@/config'
import { LOCAL_USER_KEY } from '@/constants'
import { cache } from '@/utils'

export class UserLocalService {
  saveLocalUser(data: any) {
    cache.set(LOCAL_USER_KEY, data)
  }

  getLocalUser(): { userName: string; token: string } {
    return cache.get(LOCAL_USER_KEY) || {}
  }
  removeLocalUser() {
    return cache.remove(LOCAL_USER_KEY)
  }

  logout() {
    this.removeLocalUser()
    window.location.href = `${config.routeBasename}/login`
  }
}
