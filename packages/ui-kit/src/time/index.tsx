import classNames from 'classnames'
import dayjs from 'dayjs'
import _ from 'lodash'
import React from 'react'
import { useConfigContext } from '../config-provider'
import './index.less'

export enum TimeFormt {
  /** 年月日时分秒 */
  Time = 'YYYY-MM-DD HH:mm:ss',
  /** 年月日 */
  Date = 'YYYY-MM-DD',
  /** 年月日时分 */
  TimeMinute = 'YYYY-MM-DD HH:mm',
}

export type TimeProps = {
  /** 类名 */
  className?: string
  /** 值 */
  value?: string | number | any[]
  /** 格式，默认 YYYY-MM-DD HH:mm:ss  */
  format?: string
  /** 内置格式，format 未配置时生效 */
  type?: 'date' | 'time'
  /** 连接符号，默认 ~ */
  symbol?: React.ReactNode
  /** 默认为空时显示 - */
  empty?: React.ReactNode
}

export const Time = ({
  className,
  value,
  format,
  type = 'date',
  symbol = '~',
  empty = '-',
}: TimeProps) => {
  const { getPrefixCls } = useConfigContext()
  const prefixCls = getPrefixCls('time')

  const getFormat = () => {
    if (format) return format
    let result = ''
    switch (type) {
      case 'date':
        result = 'YYYY-MM-DD'
        break
      case 'time':
        result = 'YYYY-MM-DD HH:mm:ss'
        break
      default:
        result = 'YYYY-MM-DD HH:mm:ss'
        break
    }
    return result
  }

  const renderContent = () => {
    const format = getFormat()
    if (_.isNil(value) || !value) return empty

    if (_.isArray(value)) {
      return value.map((v, index) => (
        <React.Fragment key={index}>
          {
            //symbol 前后有空格
            index > 0 && <> {symbol} </>
          }
          {_.isNil(v) || !v ? empty : dayjs(v).format(format)}
        </React.Fragment>
      ))
    }
    return dayjs(value).format(format)
  }

  return <span className={classNames(prefixCls, className)}>{renderContent()}</span>
}
