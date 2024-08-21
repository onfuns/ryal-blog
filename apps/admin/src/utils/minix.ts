export interface ClassType<T> extends Function {
  new (...args: any[]): T
}

export const mixinClass = <T, K>(A: ClassType<T>, B: ClassType<K>): T & K => {
  return Object.defineProperties(
    Object.create(A.prototype),
    Object.getOwnPropertyDescriptors(B.prototype),
  )
}
