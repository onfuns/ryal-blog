import {
  ProTable,
  type ActionType,
  type ParamsType,
  type ProColumns,
  type ProTableProps,
} from '@ant-design/pro-components'
import { useSetState as useMergeState, useRequest } from 'ahooks'
import classNames from 'classnames'
import _ from 'lodash-es'
import { useConfigContext } from '../config-provider'
import './index.less'

export type { ActionType as TableActionType, ProColumns as TableColumns }

/** 继承 [ProTableProps](https://procomponents.ant.design/components/table) */
export type TableProps<T, U extends ParamsType, ValueType = 'text'> = ProTableProps<
  T,
  U,
  ValueType
> & {
  /** 最外层类名 */
  wrapperClassName?: string
  /** 最外层 style */
  wrapperStyle?: React.CSSProperties
}

type IRequestParams = {
  pageSize?: number
  current?: number
  keyword?: string
}
export const Table = <DataSource extends Record<string, any>, Params extends ParamsType, ValueType>(
  props: TableProps<DataSource, Params, ValueType>,
) => {
  const { wrapperClassName, wrapperStyle, request } = props
  const { getPrefixCls } = useConfigContext()
  const prefixCls = getPrefixCls('protable')

  const EMPTY_DATA = {
    pageSize: 20,
    current: 1,
    total: 0,
    loading: false,
    success: true,
    data: [],
  }
  const [tableMixData, setTableMixData] = useMergeState(EMPTY_DATA)
  const defaultRequest = async (params?: any) => ({ data: [], total: 0, success: false })
  const { runAsync } = useRequest(request ?? defaultRequest, {
    manual: true,
  })

  const customRequest = async (params: IRequestParams, sort = {}, filter = {}) => {
    if (!request) return EMPTY_DATA
    try {
      const pageNum = params.current || 1
      setTableMixData({
        loading: true,
        data: tableMixData.data,
      })
      const res: any = await runAsync?.(
        {
          ...params,
          current: pageNum,
          pageNo: pageNum,
        } as any,
        sort,
        filter,
      )
      const total = _.get(res, 'total', 0)
      const data = _.get(res, 'data', [])
      setTableMixData({
        data,
        success: true,
        total,
        loading: false,
      })
      return {
        total,
        success: true,
        data,
      }
    } catch (e) {
      setTableMixData({ ...EMPTY_DATA })
    }
  }

  const commonProps: TableProps<DataSource, Params, ValueType> = {
    ...props,
    search: {
      labelWidth: 'auto',
      searchText: '搜索',
      searchGutter: 12,
      ...props.search,
    },
    className: classNames(prefixCls, props.className),
    tableClassName: classNames(`${prefixCls}-table`, props.tableClassName),
    loading: props.loading ?? tableMixData.loading,
    request: customRequest as any,
    options: props.options ?? false,
    tableAlertRender: props.tableAlertRender ?? false,
  }

  return (
    <div className={classNames(`${prefixCls}-root`, wrapperClassName)} style={wrapperStyle}>
      <ProTable {...(commonProps as any)} dataSource={tableMixData.data} />
    </div>
  )
}
