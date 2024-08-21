export type ArrayToTreeNode = Record<string, any> & {
  id?: number
  pid?: number | null
  children?: ArrayToTreeNode[]
}

export type ArrayToTreeOptions = {
  idKey?: string
  parentIdKey?: string
  childKey?: string
}

export const arrayToTree = (
  items: ArrayToTreeNode[],
  options?: ArrayToTreeOptions,
): ArrayToTreeNode[] => {
  const { idKey = 'id', parentIdKey = 'pid', childKey = 'children' } = options || {}
  const map = new Map<number, ArrayToTreeNode>()
  const roots: ArrayToTreeNode[] = []

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
