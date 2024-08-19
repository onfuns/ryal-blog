import LTT from 'list-to-tree'
export { default as api } from './api'
export { default as cache } from './cache'

export const toTree = (data: any[], options = {}) => {
  const ltt = new LTT(data, {
    key_id: 'id',
    key_parent: 'pid',
    key_child: 'children',
    ...options,
  })
  return ltt.GetTree() || []
}

export interface ClassType<T> extends Function {
  new (...args: any[]): T
}

export const mixinClass = <T, K>(A: ClassType<T>, B: ClassType<K>): T & K => {
  return Object.defineProperties(
    Object.create(A.prototype),
    Object.getOwnPropertyDescriptors(B.prototype),
  )
}
