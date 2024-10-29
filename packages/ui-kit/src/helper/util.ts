/** 判断是否空值 */
export const isEmpty = (value: any) => {
  return (
    value === undefined ||
    value === null ||
    Number.isNaN(value) ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value === '')
  )
}
