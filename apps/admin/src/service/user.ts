import config from '@/config'
import { LOCAL_USER_KEY } from '@/constants'
import { Cache } from '@/utils'
import { User } from '@ryal/api'

export class UserMinixService extends User {
  saveLocalUser(data: any) {
    Cache.set(LOCAL_USER_KEY, data)
  }

  getLocalUser(): { userName: string; token: string } {
    return Cache.get(LOCAL_USER_KEY) || {}
  }
  removeLocalUser() {
    return Cache.remove(LOCAL_USER_KEY)
  }

  logout() {
    this.removeLocalUser()
    window.location.href = `${config.routeBasename}/login`
  }
}
