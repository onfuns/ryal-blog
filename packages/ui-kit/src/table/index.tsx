import {
  ProTable,
  type ActionType,
  type ParamsType,
  type ProColumns,
  type ProTableProps,
  type RequestData,
} from '@ant-design/pro-components'
import { useSetState as useMergeState, useRequest } from 'ahooks'
import { type SortOrder } from 'antd/es/table/interface'
import classNames from 'classnames'
import _ from 'lodash'
import { useConfigContext } from '../config-provider'
import './index.less'

export { TableDelete } from './TableDelete'
export type { ActionType as TableActionType, ProColumns as TableColumns }

/** 继承 [ProTableProps](https://procomponents.ant.design/components/table) */
export type TableProps<
  DataSource,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
> = Omit<ProTableProps<DataSource, Params, ValueType>, 'request'> & {
  /** 最外层类名 */
  wrapperClassName?: string
  /** 最外层 style */
  wrapperStyle?: React.CSSProperties
  /** 接口取值字段，默认 data.data */
  dataFieldName?: string
  /** 接口总数取值字段，默认 data.total */
  totalFieldName?: string
  /** 接口请求 */
  request?: (
    params: Params,
    sort: Record<string, SortOrder>,
    filter: Record<string, (string | number)[] | null>,
  ) => Promise<{
    data?: DataSource[] | ({ data?: DataSource[]; total?: number } & Record<string, any>)
    total?: number
    success?: boolean
  }>
}

export const Table = <
  DataSource extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(
  props: TableProps<DataSource, Params, ValueType>,
) => {
  const { wrapperClassName, wrapperStyle, request, dataFieldName, totalFieldName } = props
  const { getPrefixCls } = useConfigContext()
  const prefixCls = getPrefixCls('protable')
  const defautPagination = { pageSize: 20, current: 1 }
  const EMPTY_DATA: RequestData<DataSource> & { loading?: boolean } = {
    total: 0,
    loading: false,
    success: true,
    data: [],
  }
  const [tableMixData, setTableMixData] = useMergeState(EMPTY_DATA)
  const defaultRequest = async () => ({ data: [], total: 0, success: true }) as any
  const { runAsync } = useRequest(request ?? defaultRequest, {
    manual: true,
  })

  const customRequest: TableProps<DataSource, Params, ValueType>['request'] = async (
    params,
    sort,
    filter,
  ) => {
    if (!request) return EMPTY_DATA
    try {
      setTableMixData({ loading: true, data: tableMixData.data })
      const pageNum = params.current || defautPagination.current
      const pageSize = params.pageSize || defautPagination.pageSize
      const res = await runAsync?.(
        {
          ...params,
          current: Number(pageNum),
          pageSize: Number(pageSize),
        },
        sort,
        filter,
      )
      const total = _.get(res, totalFieldName || 'data.total', 0)
      const data = _.get(res, dataFieldName || 'data.data', [])
      setTableMixData({ data, success: true, total, loading: false })
      return { success: true, data, total }
    } catch (e) {
      setTableMixData({ ...EMPTY_DATA })
      return { success: false, total: 0, data: [] }
    }
  }

  const commonProps: TableProps<DataSource, Params, ValueType> = {
    ...props,
    search: props.search ?? {
      labelWidth: 'auto',
      searchText: '搜索',
      searchGutter: 12,
      ...(props.search || {}),
    },
    className: classNames(prefixCls, props.className),
    tableClassName: classNames(`${prefixCls}-table`, props.tableClassName),
    loading: props.loading ?? tableMixData.loading,
    request: customRequest,
    options: props.options ?? false,
    tableAlertRender: props.tableAlertRender ?? false,
  }

  return (
    <div className={classNames(`${prefixCls}-root`, wrapperClassName)} style={wrapperStyle}>
      <ProTable {...(commonProps as any)} dataSource={tableMixData.data} />
    </div>
  )
}
