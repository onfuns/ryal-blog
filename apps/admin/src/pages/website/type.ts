import { type FormInstance } from 'antd'

export type PageDetailType<TData = Record<string, string>> = {
  /** 详情数据 */
  detail: TData
  /** 提交事件 */
  onSubmit: (form: FormInstance) => void
}
