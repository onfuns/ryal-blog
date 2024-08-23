export type TreeNode<TData = any> = Record<string, any> & TData

export type ArrayToTreeOptions = {
  idKey?: string
  parentIdKey?: string
  childKey?: string
}

export const arrayToTree = <TData = any>(
  items: TreeNode<TData>[],
  options?: ArrayToTreeOptions,
): [] => {
  const { idKey = 'id', parentIdKey = 'pid', childKey = 'children' } = options || {}
  const map = new Map<number, Record<string, any>>()
  const roots: any = []

  items.forEach(item => {
    map.set(item[idKey], { ...item, [childKey]: null })
  })

  items.forEach(item => {
    const currentNode = map.get(item[idKey])
    if (!item[parentIdKey]) {
      roots.push(currentNode)
    } else {
      const parentNode = map.get(item[parentIdKey])
      if (parentNode) {
        if (!parentNode[childKey]) {
          parentNode[childKey] = [] as any[]
        }
        parentNode[childKey]!.push(currentNode!)
      }
    }
  })
  return roots
}
