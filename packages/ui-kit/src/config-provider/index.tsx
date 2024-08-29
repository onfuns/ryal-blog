import { ConfigProvider } from 'antd'
import { type ConfigProviderProps } from 'antd/es/config-provider'
import classNames from 'classnames'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import React, { createContext, useContext } from 'react'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

const defaultGetPrefixCls = (suffixCls?: string) => `ryal-ui-kit-${suffixCls}`

type PickPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
/** 用户自定义类型 */
export type ConfigConsumerProps = {
  /** 全局类名前缀 */
  getPrefixCls: (suffixCls?: string) => string
  /** antd 全局属性 */
  antdConfig?: ConfigProviderProps
}

/** 内置类型 */
export type BuiltInConfigProps = {
  /** 预留类型，暂无使用 */
  action?: string
}

export const ConfigContext = createContext<Partial<BuiltInConfigProps> & ConfigConsumerProps>({
  getPrefixCls: defaultGetPrefixCls,
})

export const useConfigContext = () => {
  return useContext(ConfigContext)
}

export const ConfigContextProvider = ({
  children,
  getPrefixCls = defaultGetPrefixCls,
  antdConfig,
}: React.PropsWithChildren & PickPartial<ConfigConsumerProps, 'getPrefixCls'>) => {
  const mixedFormClassName = getPrefixCls('mixed-form')
  const mixedTableClassName = getPrefixCls('mixed-table')

  return (
    <ConfigContext.Provider value={{ getPrefixCls }}>
      <ConfigProvider
        {...antdConfig}
        form={{
          ...antdConfig?.form,
          className: classNames(antdConfig?.form?.className, mixedFormClassName),
        }}
        table={{
          ...antdConfig?.table,
          className: classNames(antdConfig?.table?.className, mixedTableClassName),
        }}
      >
        {children}
      </ConfigProvider>
    </ConfigContext.Provider>
  )
}
