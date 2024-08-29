import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import { Editor, EditorProps } from '@bytemd/react'
import zh_Hans from 'bytemd/locales/zh_Hans.json'
import classNames from 'classnames'
import { useConfigContext } from '../../config-provider'
import './index.less'

export type MarkdownEditorType = EditorProps & {
  className?: string
}

export const MarkdownEditor = ({ className, plugins, ...resetProps }: MarkdownEditorType) => {
  const { getPrefixCls } = useConfigContext()
  const prefixCls = getPrefixCls('markdown-editor')

  return (
    <div className={classNames(prefixCls, className)}>
      <Editor
        mode="split"
        locale={zh_Hans}
        {...resetProps}
        plugins={[gfm(), highlight()].concat(plugins || [])}
      />
    </div>
  )
}
