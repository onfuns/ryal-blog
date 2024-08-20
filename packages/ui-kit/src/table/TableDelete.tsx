import { Popconfirm, type PopconfirmProps } from 'antd'

type TableDeleteProps = Partial<PopconfirmProps> & {
  /** 删除事件 */
  onDelete: (params: any) => any
  /** 标题 */
  title?: React.ReactNode
  /** 文本 */
  text?: React.ReactNode
  /** 节点 */
  element?: React.ReactNode
}

export const TableDelete = ({
  onDelete,
  text = '删除',
  title = '确定删除？',
  element,
  ...resetPopconfirmProps
}: TableDeleteProps) => {
  return (
    <Popconfirm onConfirm={onDelete} {...resetPopconfirmProps} title={title}>
      {element ?? <a className="a-danger">{text}</a>}
    </Popconfirm>
  )
}
