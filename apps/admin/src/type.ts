import { type ITriggerModalProps } from '@ryal/ui-kit'

/** 添加/编辑弹窗属性 begin */
export type IDetailModalProps<DataType = any> = {
  trigger?: ITriggerModalProps['trigger']
  /** 取消事件 */
  onCancel?: (args?: any) => void
  /** 成功回调 */
  onSuccess?: (args?: any) => void
  /** 详情信息 */
  detail?: Record<string, any> & DataType
}
/** 添加/编辑弹窗属性 end */

/** 拿出数组对象 begin */
export type ArrayType<T extends any[] | undefined> = T extends Array<infer R> ? R : never
export type NonNullable<T> = T extends null | undefined ? never : T
export type PickArrayItem<T extends any[] | undefined> = ArrayType<NonNullable<T>>
/** 拿出数组对象 end */
