export class Cache {
  get(key: string) {
    const value = localStorage.getItem(key)
    try {
      return value ? JSON.parse(value) : null
    } catch (error) {
      return value
    }
  }
  set(key: string, value: any) {
    localStorage.setItem(key, this.isObject(value) ? JSON.stringify(value) : value)
  }
  remove(key: string) {
    localStorage.removeItem(key)
  }
  isObject(value: any) {
    return value instanceof Object
  }
}

export default new Cache()
