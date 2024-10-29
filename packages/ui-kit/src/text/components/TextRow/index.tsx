import { Col, Row, type RowProps } from 'antd'
import classNames from 'classnames'
import React, { Children } from 'react'
import { useConfigContext } from '../../../'
import './index.less'

export type TextRowProps = {
  /** 类名 */
  className?: string
  /** 文本 */
  label?: React.ReactNode
  /** 文本类名 */
  labelClassName?: string
  /** col span 集合，默认 [8,16] */
  span?: number[]
  /** 子元素 */
  children?: React.ReactNode
  /** row 属性 */
  rowProps?: RowProps
}

export const TextRow = ({
  className,
  label,
  labelClassName,
  children,
  span = [8],
  rowProps,
}: TextRowProps) => {
  const { getPrefixCls } = useConfigContext()
  const prefixCls = getPrefixCls('text-row')
  const [labelSpan, ...childSpan] = span
  const items = Children.toArray(children)

  return (
    <Row justify="center" align="top" {...rowProps} className={classNames(prefixCls, className)}>
      {label && (
        <Col span={labelSpan} className={classNames(`${prefixCls}-label`, labelClassName)}>
          {label}
        </Col>
      )}
      {items.map((item, index) => (
        <Col key={index} span={childSpan[index] ?? (24 - labelSpan) / items.length}>
          {item}
        </Col>
      ))}
    </Row>
  )
}
