import { Tooltip as AntdTooltip } from 'antd'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { useConfigContext } from '../config-provider'
import './index.less'

export type EllipsisProps = {
  /** 文本类名 */
  className?: string
  /** 显示行数，默认 1 行 */
  line?: number
  /** 文本 */
  text: string
  /** 是否自动计算 */
  autoCompute?: boolean
}

export const Ellipsis = ({ className, text, line = 1, autoCompute = true }: EllipsisProps) => {
  const { getPrefixCls } = useConfigContext()
  const prefixCls = getPrefixCls('ellipsis')
  const textContentRef = useRef<HTMLDivElement>(null)
  const specialChart = ['', '-', '--', '/']
  const [isShowTip, setIsShowTip] = useState(!specialChart.includes(text))
  /** 行高 */
  const LINE_HEIGHT = 20

  const setStyle = () => {
    if (textContentRef.current) {
      textContentRef.current.style.webkitLineClamp = String(line)
      textContentRef.current.style.display = '-webkit-box'
      textContentRef.current.style.webkitBoxOrient = 'vertical'
    }
  }

  const getTextWidth = (text: string, parentDom: HTMLElement | null) => {
    try {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (!context) return undefined
      if (parentDom) {
        context.font = getComputedStyle(parentDom).font
      }
      return context.measureText(text)?.width
    } catch (error) {
      return undefined
    }
  }

  useEffect(() => {
    if (!autoCompute) {
      setStyle()
      return
    }
    const element = textContentRef?.current

    if (element && text) {
      const parentElement = element?.parentElement
      const parentWidth = parentElement?.offsetWidth
      element.style.visibility = 'hidden'
      element.style.whiteSpace = 'nowrap'
      const width = getTextWidth(text, parentElement) || element?.offsetWidth
      const height = element?.offsetHeight
      if (parentWidth && width <= parentWidth && height <= line * LINE_HEIGHT) {
        setIsShowTip(false)
      } else {
        setStyle()
        setIsShowTip(true)
      }
      element.style.removeProperty('visibility')
      element.style.removeProperty('white-space')
    }
  }, [textContentRef, autoCompute, text, line])

  const renderContent = () => {
    return (
      <div className={classNames(prefixCls, className)} ref={textContentRef}>
        {text}
      </div>
    )
  }

  return isShowTip ? (
    <AntdTooltip placement="bottom" title={text} arrow>
      {renderContent()}
    </AntdTooltip>
  ) : (
    renderContent()
  )
}
