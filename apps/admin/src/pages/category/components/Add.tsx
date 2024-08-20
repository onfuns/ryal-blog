import { categoryService } from '@/service'
import {
  ModalForm,
  ProForm,
  ProFormCascader,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components'
import { message } from 'antd'
import { useEffect } from 'react'
import {
  CategoryStatusEnum,
  CategoryStatusMap,
  CategoryTypeEnum,
  CategoryTypeMap,
  CatetoryIdEnum,
} from '../enum'

export const CategoryAdd = ({ trigger, onSuccess, onCancel, detail }: IDetailModalProps) => {
  const [formInstance] = ProForm.useForm()
  const categoryType = ProForm.useWatch('type', formInstance)
  const isEditMode = !!detail?.id

  useEffect(() => {
    if (isEditMode) {
      formInstance.setFieldsValue({ ...detail, pid: [detail.pid] })
    }
  }, [detail])

  const onOk = async () => {
    const values = await formInstance.validateFields()
    if (isEditMode) {
      await categoryService.update(detail.id, values)
    } else {
      await categoryService.add(values)
    }
    message.success('操作成功')
    onSuccess?.()
  }

  return (
    <ModalForm
      title="分类信息"
      trigger={trigger}
      modalProps={{ onOk, onCancel }}
      form={formInstance}
      initialValues={{
        pid: [CatetoryIdEnum.Root],
        type: CategoryTypeEnum.List,
        status: CategoryStatusEnum.Enable,
      }}
    >
      <ProFormCascader
        label="所属分类"
        name="pid"
        rules={[{ required: true }]}
        placeholder="请选择分类"
        request={async () => {
          const { data } = await categoryService.getList()
          return [{ id: CatetoryIdEnum.Root, name: '一级分类' }].concat(data)
        }}
        disabled={!!detail?.id}
        fieldProps={{
          fieldNames: { label: 'name', value: 'id', children: 'children' },
          changeOnSelect: true,
        }}
      />

      <ProFormText label="名称" name="name" rules={[{ required: true }]} placeholder="请输入名称" />

      <ProFormText
        label="链接"
        name="ename"
        rules={[{ required: true }]}
        placeholder="请输入链接，如 /front"
      />

      <ProFormRadio.Group
        label="类别"
        name="type"
        rules={[{ required: true }]}
        options={CategoryTypeMap}
      />

      {categoryType === CategoryTypeEnum.Url && (
        <ProFormText
          label="外链地址"
          name="url"
          rules={[{ required: true }]}
          placeholder="请输入外链地址"
        />
      )}

      <ProFormText label="图标" name="icon" placeholder="iconfont 或 url" />

      <ProFormText label="图标颜色" name="icon_color" placeholder="只对iconfont 有效" />

      <ProFormRadio.Group
        label="状态"
        name="status"
        rules={[{ required: true }]}
        options={CategoryStatusMap}
      />
    </ModalForm>
  )
}
