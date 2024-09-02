export const isServer = typeof window === 'undefined'

export const findByValue = (
  array: any[] | undefined,
  key: string,
  value: string | number,
  { childKey = 'children' } = {},
) => {
  let obj: any
  if (!array || !array?.length) return null

  array.some(function iter(item) {
    if (item[key] === value) {
      obj = item
      return true
    }
    return Array.isArray(item[childKey]) && item[childKey].some(iter)
  })
  return obj
}
