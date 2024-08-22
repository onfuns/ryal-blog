import { isNumberString } from 'class-validator'

// array to tree
export const arrayToTree = (data: any[], { parentkey = 'pid', rootParentValue = 0 } = {}) => {
  const tree = data.filter(parent => {
    const children = data.filter(child => parent.id === child[parentkey])
    parent.children = children.length > 0 ? children : null
    return parent[parentkey] === rootParentValue
  })
  return tree
}

// tree to array
export const toFlatArray = (tree, parentId = null) => {
  return tree.reduce((t, prev) => {
    const child = prev.children
    return [
      ...t,
      parentId ? { ...prev, parentId } : prev,
      ...(child && child.length ? toFlatArray(child, prev.id) : []),
    ]
  }, [])
}

// is dev environment
export const __DEV__ = process.env.NODE_ENV !== 'production'

// is object
export const isObject = data => Object.is(Object.prototype.toString.call(data), '[object Object]')

// to number
export const transformToNumber = (value: unknown): number | unknown => {
  return isNumberString(value) ? Number(value) : value
}
