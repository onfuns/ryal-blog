import React, { useEffect, useState } from 'react'

export const useTriggerHooks = (trigger?: React.ReactElement, defaultOpen: boolean = false) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (defaultOpen) {
      setOpen(true)
    }
  }, [defaultOpen])

  const onTrigger = () => {
    setOpen(true)
  }

  const triggerDom = trigger ? React.cloneElement(trigger, { onClick: onTrigger }) : null
  return {
    open,
    triggerDom,
    setOpen,
  }
}
