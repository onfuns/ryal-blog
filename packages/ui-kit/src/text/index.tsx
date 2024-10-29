import classNames from 'classnames'
import React from 'react'
import { useConfigContext } from '..'
import { util } from '../helper'
import { TextRow, type TextRowProps } from './components/TextRow'
import './index.less'

export type TextProps = {
  /** 类名 */
  className?: string
  /** 样式 */
  style?: React.CSSProperties
  /** 值 */
  value?: React.ReactNode
  /** 值类名 */
  valueClassName?: string
  /** 前缀 */
  prefix?: React.ReactNode
  /** 后缀 */
  suffix?: React.ReactNode
  /** 符号类名 */
  symbolClassName?: string
  /** 空值占位符 */
  empty?: React.ReactNode
}
export const Text = ({
  className,
  style,
  value,
  valueClassName,
  prefix = '',
  suffix = '',
  empty = '-',
  symbolClassName,
}: TextProps) => {
  const { getPrefixCls } = useConfigContext()
  const prefixCls = getPrefixCls('text')
  return (
    <span className={classNames(prefixCls, className)} style={style}>
      {util.isEmpty(value) ? (
        empty
      ) : (
        <>
          {prefix && (
            <span className={classNames(`${prefixCls}-symbol`, symbolClassName)}>{prefix}</span>
          )}
          <span className={classNames(`${prefixCls}-value`, valueClassName)}>{value}</span>
          {suffix && (
            <span className={classNames(`${prefixCls}-symbol`, symbolClassName)}>{suffix}</span>
          )}
        </>
      )}
    </span>
  )
}

export { type TextRowProps }
Text.Row = TextRow
