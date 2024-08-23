import { ProForm, type ProFormProps } from '@ant-design/pro-components'
import {
  Drawer as AntdDrawer,
  Modal as AntdModal,
  Button,
  type DrawerProps as AntdDrawerProps,
  type ModalProps as AntdModalProps,
} from 'antd'
import React, { useEffect, useState } from 'react'

export type ModalFormProps<T> = {
  children: React.ReactNode | React.ReactNode[]
} & ProFormProps<T> & {
    type?: 'modal' | 'drawer'
    title?: React.ReactNode
    trigger?: React.ReactElement
    modalProps?: AntdModalProps
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

const useTriggerHooks = (trigger?: React.ReactElement, open?: boolean) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(open ?? false)
  }, [open])

  const onTrigger = () => {
    setVisible(true)
  }

  const triggerDom = trigger ? React.cloneElement(trigger, { onClick: onTrigger }) : null
  return { open: visible, triggerDom, setOpen: setVisible }
}

export const ModalForm = <T extends Record<string, any>>({
  children,
  trigger,
  title,
  open: defaultOpen,
  modalProps,
  ...formProps
}: ModalFormProps<T>) => {
  const { open, triggerDom, setOpen } = useTriggerHooks(trigger, defaultOpen)

  const mixinProps: AntdModalProps = {
    width: 480,
    destroyOnClose: true,
    ...modalProps,
    title,
    open,

    onCancel: e => {
      modalProps?.onCancel?.(e)
      setOpen(false)
    },
    onOk: async e => {
      const done = await (modalProps?.onOk?.(e) ?? true)
      if (done) setOpen(false)
    },
  }

  return (
    <>
      {triggerDom}
      <AntdModal {...mixinProps}>
        <FormComponent<T> {...formProps}>{children}</FormComponent>
      </AntdModal>
    </>
  )
}

export type DrawerFormProps<T> = Omit<ModalFormProps<T>, 'modalProps'> & {
  width?: string | number
  drawerProps?: AntdDrawerProps
}

export const DrawerForm = <T extends Record<string, any>>({
  width = 600,
  children,
  trigger,
  title,
  open: defaultOpen,
  drawerProps,
  ...formProps
}: DrawerFormProps<T> & {
  drawerProps?: AntdDrawerProps & {
    onOk?: (e: React.MouseEvent | React.KeyboardEvent) => void
    onCancel?: (e: React.MouseEvent | React.KeyboardEvent) => void
  }
}) => {
  const { open, triggerDom, setOpen } = useTriggerHooks(trigger, defaultOpen)

  const mixinProps: AntdDrawerProps = {
    title,
    width,
    destroyOnClose: true,
    ...drawerProps,
    open,
    onClose: e => {
      drawerProps?.onCancel?.(e)
      setOpen(false)
    },
    footer: drawerProps?.footer ?? [
      <div className="flex justify-end gap-12">
        <Button onClick={e => mixinProps?.onClose?.(e)}>取消</Button>
        <Button
          type="primary"
          onClick={async e => {
            const done = await (drawerProps?.onOk?.(e) ?? true)
            if (done) setOpen(false)
          }}
        >
          确定
        </Button>
      </div>,
    ],
  }

  return (
    <>
      {triggerDom}
      <AntdDrawer {...mixinProps}>
        <FormComponent<T> {...formProps}>{children}</FormComponent>
      </AntdDrawer>
    </>
  )
}
