type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args) => any ? never : K
}[keyof T]

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>

type IDetailModalProps<DataType = any> = {
  /** 触发节点 dom */
  trigger?: React.ReactElement
  /** 取消事件 */
  onCancel?: (args?: any) => void
  /** 成功回调 */
  onSuccess?: (args?: any) => void
  /** 详情信息 */
  detail?: Record<string, any> & DataType
}

/** 拿出数组对象 */
type ArrayType<T extends any[] | undefined> = T extends Array<infer R> ? R : never
type NonNullable<T> = T extends null | undefined ? never : T
type PickArrayItem<T extends any[] | undefined> = ArrayType<NonNullable<T>>
