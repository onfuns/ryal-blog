import { type ITriggerModalProps } from '@ryal/ui-kit'

export type IDetailModalProps<DataType = any> = {
  trigger?: ITriggerModalProps['trigger']
  /** 取消事件 */
  onCancel?: (args?: any) => void
  /** 成功回调 */
  onSuccess?: (args?: any) => void
  /** 详情信息 */
  detail?: Record<string, any> & DataType
}
