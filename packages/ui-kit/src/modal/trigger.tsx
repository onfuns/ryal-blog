import React, { forwardRef, useImperativeHandle } from 'react'
import { useTriggerHooks } from './hooks'

export type ITriggerModalRef = {
  open: boolean
  setOpen: (open: boolean) => void
}

export type ITriggerModalProps = {
  open?: boolean
  trigger?: React.ReactElement
  component: (props: ITriggerModalRef) => React.ReactElement | boolean | null | undefined
}

export const TriggerModal = forwardRef<ITriggerModalRef, ITriggerModalProps>(
  ({ trigger, component, open: defaultOpen }, ref) => {
    const { open, triggerDom, setOpen } = useTriggerHooks(trigger, defaultOpen)

    useImperativeHandle(ref, () => ({
      open,
      setOpen,
    }))

    return (
      <>
        {triggerDom}
        {open ? component({ open, setOpen }) : null}
      </>
    )
  },
)
