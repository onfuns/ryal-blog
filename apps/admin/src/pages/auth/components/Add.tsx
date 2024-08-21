import { authService } from '@/service'
import { arrayToTree } from '@/utils'
import {
  ModalForm,
  ProForm,
  ProFormCascader,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components'
import { useRequest } from 'ahooks'
import { message } from 'antd'
import { useEffect } from 'react'
import { AuthIdEnum, AuthTypeEnum, AuthTypeMap } from '../enum'

export const AuthAdd = ({ trigger, onSuccess, onCancel, detail }: IDetailModalProps) => {
  const [formInstance] = ProForm.useForm()
  const { data } = useRequest(authService.getList)
  const authList = data?.data || []
  const isEditMode = !!detail?.id

  useEffect(() => {
    if (isEditMode) {
      const pid = detail.pid ? findAllPid(detail.id) : undefined
      formInstance.setFieldsValue({ ...detail, pid })
    }
  }, [detail])

  const findAllPid = (id: number, result: any[] = []): number[] => {
    const current = authList?.find(auth => auth.id === id)
    result.push(id)
    if (current && current.pid !== AuthIdEnum.Root) {
      return findAllPid(current.pid, result)
    }
    //只查出父级ID，不包含自己
    result.reverse()
    result.pop()
    return result
  }

  const onOk = async () => {
    const values = await formInstance.validateFields()
    const params = {
      ...values,
      pid: values.pid.pop(),
    }
    if (isEditMode) {
      await authService.update(detail.id, params)
    } else {
      await authService.add(params)
    }
    message.success('操作成功')
    onSuccess?.()
  }

  const menuList = [{ id: AuthIdEnum.Root, name: '一级菜单' }].concat(
    authList.filter(auth => auth.type === AuthTypeEnum.Menu),
  )

  return (
    <ModalForm
      title="权限信息"
      trigger={trigger}
      modalProps={{ onOk, onCancel }}
      form={formInstance}
      initialValues={{ type: AuthTypeEnum.Menu }}
    >
      <ProFormRadio.Group
        label="类型"
        name="type"
        rules={[{ required: true }]}
        options={AuthTypeMap}
      />

      <ProFormCascader
        label="所属菜单"
        name="pid"
        rules={[{ required: true }]}
        placeholder="请选择所属菜单"
        allowClear={false}
        fieldProps={{
          options: arrayToTree(menuList),
          changeOnSelect: true,
          fieldNames: { label: 'name', value: 'id', children: 'children' },
        }}
      />

      <ProFormText label="名称" name="name" rules={[{ required: true }]} />

      <ProFormText
        label="编码"
        name="code"
        rules={[{ required: true }]}
        extra="唯一性，带/前缀的 页面或接口路径，可用英文逗号分割"
      />
    </ModalForm>
  )
}
