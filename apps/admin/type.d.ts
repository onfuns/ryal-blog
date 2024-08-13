type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args) => any ? never : K
}[keyof T]

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>

type IDetailModalProps = {
  /** 触发节点 dom */
  trigger?: any
  /** 关闭事件 */
  onClose?: () => void
  /** 成功回调 */
  onSuccess?: (args?: any) => void
  /** 详情信息 */
  detail?: Record<string, any>
}
