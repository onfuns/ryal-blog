export type TreeNode<TData = any> = Record<string, any> &
  TData & {
    id?: number
    pid?: number | null
    children?: TreeNode<TData>[]
  }

export type ArrayToTreeOptions = {
  idKey?: string
  parentIdKey?: string
  childKey?: string
}

export const arrayToTree = <TData = any>(
  items: TreeNode<TData>[],
  options?: ArrayToTreeOptions,
): TreeNode<TData>[] => {
  const { idKey = 'id', parentIdKey = 'pid', childKey = 'children' } = options || {}
  const map = new Map<number, TreeNode<TData>>()
  const roots: TreeNode<TData>[] = []

  items.forEach(item => {
    map.set(item[idKey], { ...item, [childKey]: [] })
  })

  items.forEach(item => {
    const currentNode = map.get(item[idKey])
    if (!item[parentIdKey]) {
      roots.push(currentNode!)
    } else {
      const parentNode = map.get(item[parentIdKey])
      if (parentNode) {
        parentNode.children!.push(currentNode!)
      }
    }
  })

  return roots
}
