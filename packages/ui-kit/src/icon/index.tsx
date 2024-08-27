import classNames from 'classnames'
import { type CSSProperties } from 'react'
import { useConfigContext } from '../'
import './index.less'

export type IconProps = Record<string, any> & {
  /** 类名 */
  className?: string
  /** 样式 */
  style?: CSSProperties
  /** 图标名称，iconfont 生成 */
  name: string
}

export const Icon = ({ className, style, name, ...resetProps }: IconProps) => {
  const { getPrefixCls } = useConfigContext()
  const prefixCls = getPrefixCls('icon')

  return (
    <span
      style={style}
      className={classNames(`${prefixCls}`, 'iconfont', name, className)}
      {...resetProps}
    ></span>
  )
}
