import { ProForm, type ProFormProps } from '@ant-design/pro-components'
import {
  Drawer as AntdDrawer,
  Modal as AntdModal,
  Button,
  type DrawerProps as AntdDrawerProps,
  type ModalProps as AntdModalProps,
} from 'antd'
import React from 'react'

export type ModalFormProps<T> = ProFormProps<T> & {
  type?: 'modal' | 'drawer'
  width?: string | number
  title?: React.ReactNode
  trigger?: React.ReactElement
  modalProps?: AntdModalProps
  children: React.ReactNode | React.ReactNode[]
  open?: boolean
}

export const FormComponent = <T extends Record<string, any>>({
  children,
  ...formProps
}: {
  children: React.ReactNode | React.ReactNode[]
} & ProFormProps<T>) => (
  <ProForm
    layout="horizontal"
    colon={false}
    labelCol={{ span: 4 }}
    {...formProps}
    submitter={false}
  >
    {children}
  </ProForm>
)

export const ModalForm = <T extends Record<string, any>>({
  width = 480,
  children,
  trigger,
  title,
  open,
  modalProps,
  ...formProps
}: ModalFormProps<T>) => {
  const mixinProps: AntdModalProps = {
    title,
    width,
    destroyOnClose: true,
    open,
    ...modalProps,
  }

  return (
    <AntdModal {...mixinProps}>
      <FormComponent<T> {...formProps}>{children}</FormComponent>
    </AntdModal>
  )
}

export type DrawerFormProps<T> = Omit<ModalFormProps<T>, 'modalProps'> & {
  drawerProps?: AntdDrawerProps
}

export const DrawerForm = <T extends Record<string, any>>({
  width = 600,
  children,
  trigger,
  title,
  drawerProps,
  open,
  ...formProps
}: DrawerFormProps<T> & {
  drawerProps?: AntdDrawerProps & {
    onOk?: (e: React.MouseEvent | React.KeyboardEvent) => void
    onCancel?: (e: React.MouseEvent | React.KeyboardEvent) => void
  }
}) => {
  const mixinProps: AntdDrawerProps = {
    title,
    width,
    destroyOnClose: true,
    open,
    ...drawerProps,
    onClose: drawerProps?.onCancel,
    footer: drawerProps?.footer ?? [
      <div className="flex justify-end gap-12" key="footer">
        <Button onClick={drawerProps?.onCancel}>取消</Button>
        <Button type="primary" onClick={drawerProps?.onOk}>
          确定
        </Button>
      </div>,
    ],
  }

  return (
    <AntdDrawer {...mixinProps}>
      <FormComponent<T> {...formProps}>{children}</FormComponent>
    </AntdDrawer>
  )
}
