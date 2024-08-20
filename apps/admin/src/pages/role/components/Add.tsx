import { authService, roleService } from '@/service'
import { toTree } from '@/utils'
import {
  DrawerForm,
  ProForm,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components'
import { useRequest } from 'ahooks'
import { Tree, message } from 'antd'
import { cloneDeep } from 'lodash'
import { useEffect, useState } from 'react'
import { RoleStatusEnum, RoleStatusMap } from '../enum'

export const RoleAdd = ({ trigger, onSuccess, onClose, detail }: IDetailModalProps) => {
  const [formInstance] = ProForm.useForm()
  const [selectedKeys, setSelectedKeys] = useState<number[]>([])
  const { data } = useRequest(() => authService.getList())
  const authList = data?.data || []
  const isEditMode = !!detail?.id

  useEffect(() => {
    if (isEditMode) {
      formInstance.setFieldsValue({ ...detail })
    }
  }, [detail])

  const onFinish = async () => {
    const values = await formInstance.validateFields()
    //这里有个注意点，因为tree是完全受控的，所以当点击取消勾选子节点时，父级的节点也不会出现在 selectedKeys里
    //比如 勾选状态下二级结构是[30000,30001,30002]，取消勾选30002子节点后直接变成 [30001]，应该是 [30000,30001]
    //所以需要遍历数组找到其父级节点去重后放进去
    const resources: Set<number> = new Set()

    const findAllParent = (id: number, result: number[] = []): number[] => {
      const current = authList?.find(auth => auth.id === id)
      result.push(id)
      if (current && current.pid !== 0) {
        return findAllParent(current.pid, result)
      }
      return result
    }

    selectedKeys.forEach(id => {
      const ids = findAllParent(id)
      ids.forEach(id => resources.add(id))
    })
    const params = {
      ...values,
      auths: [...resources].map(id => ({ id })),
    }
    if (isEditMode) {
      await roleService.update(detail.id, params)
    } else {
      await roleService.add(params)
    }
    message.success('操作成功')
    onSuccess?.()
  }

  const treeList = toTree(cloneDeep(authList))

  return (
    <DrawerForm
      title="角色信息"
      trigger={trigger}
      drawerProps={{ onClose: onClose, destroyOnClose: true }}
      onFinish={onFinish}
      form={formInstance}
      initialValues={{ enable: RoleStatusEnum.Enable }}
    >
      <ProFormText
        label="名称"
        name="name"
        rules={[{ required: true }]}
        placeholder="请输入名称"
        fieldProps={{ maxLength: 10 }}
      />

      <ProFormTextArea
        label="描述"
        name="description"
        rules={[{ required: true }]}
        placeholder="请输入描述"
        fieldProps={{ showCount: true, maxLength: 200 }}
      />

      <ProFormRadio.Group
        label="状态"
        name="enable"
        rules={[{ required: true }]}
        options={RoleStatusMap}
      />

      {treeList.length ? (
        <ProForm.Item label="权限配置">
          <Tree
            checkable
            defaultExpandAll
            checkedKeys={selectedKeys}
            onCheck={(value: any) => setSelectedKeys([...value])}
            fieldNames={{ title: 'name', key: 'id', children: 'children' }}
            treeData={treeList}
          />
        </ProForm.Item>
      ) : null}
    </DrawerForm>
  )
}
