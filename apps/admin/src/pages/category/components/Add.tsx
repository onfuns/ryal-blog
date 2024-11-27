import {
  categoryService,
  CategoryStatusEnumType,
  CategoryTypeEnumType,
  type CategoryType,
} from '@/service'
import { IDetailModalProps } from '@/type'
import {
  ProForm,
  ProFormCascader,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components'
import { ModalForm, TriggerModal } from '@ryal/ui-kit'
import { message } from 'antd'
import { useEffect } from 'react'
import { CategoryStatusMap, CategoryTypeMap, CatetoryIdEnum } from '../enum'

export const CategoryAdd = ({ onSuccess, onCancel, detail }: IDetailModalProps<CategoryType>) => {
  const [formInstance] = ProForm.useForm()
  const watchCategoryType = ProForm.useWatch('type', formInstance)
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
    return true
  }

  return (
    <ModalForm
      title={`${isEditMode ? '编辑' : '新增'}分类`}
      open={true}
      modalProps={{ onCancel, onOk }}
      form={formInstance}
      initialValues={{
        pid: [CatetoryIdEnum.Root],
        type: CategoryTypeEnumType.List,
        status: CategoryStatusEnumType.Enable,
        sort: 0,
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

      <ProFormRadio.Group
        label="类型"
        name="type"
        rules={[{ required: true }]}
        options={CategoryTypeMap}
      />

      {watchCategoryType === CategoryTypeEnumType.List && (
        <ProFormText
          label="链接别名"
          name="ename"
          rules={[
            {
              required: true,
              validator: (_, value: string) => {
                if (!value.startsWith('/')) {
                  throw new Error('链接别名格式错误，请使用 / 开始')
                } else {
                  return Promise.resolve()
                }
              },
            },
          ]}
          placeholder="请输入链接别名，如 /front"
        />
      )}

      {watchCategoryType === CategoryTypeEnumType.Url && (
        <ProFormText
          label="链接地址"
          name="url"
          rules={[{ required: true }]}
          placeholder="请输入链接地址"
        />
      )}

      <ProFormDigit label="权重" name="sort" min={0} max={9999} />

      <ProFormText label="图标" name="icon" placeholder="iconfont图标名称/链接地址" />

      <ProFormText label="图标颜色" name="icon_color" placeholder="仅配置 iconfont 图标有效" />

      <ProFormRadio.Group
        label="状态"
        name="status"
        rules={[{ required: true }]}
        options={CategoryStatusMap}
      />
    </ModalForm>
  )
}

export const TriggerAddModal = (props: IDetailModalProps<CategoryType>) => (
  <TriggerModal
    trigger={props?.trigger}
    component={({ setOpen }) => (
      <CategoryAdd
        detail={props?.detail}
        onSuccess={() => {
          props?.onSuccess?.()
          setOpen(false)
        }}
        onCancel={() => {
          props?.onCancel?.()
          setOpen(false)
        }}
      />
    )}
  />
)
