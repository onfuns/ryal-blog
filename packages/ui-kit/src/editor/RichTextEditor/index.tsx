import { IDomEditor } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import '@wangeditor/editor/dist/css/style.css'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useConfigContext } from '../../'

export type RichTextEditorType = {
  className?: string
  /** 工具栏配置 */
  toolbar?: React.ComponentProps<typeof Toolbar>
  /** 编辑器配置 */
  editor?: React.ComponentProps<typeof Editor>
}

export const RichTextEditor = ({ className, toolbar, editor }: RichTextEditorType) => {
  const { getPrefixCls } = useConfigContext()
  const prefixCls = getPrefixCls('richtext-editor')
  const [editorInstance, setEditorInstance] = useState<IDomEditor | null>(null)

  useEffect(() => {
    return () => {
      if (editor == null) return
      editorInstance?.destroy()
      setEditorInstance(null)
    }
  }, [editor])

  return (
    <div className={classNames(prefixCls, className)}>
      <Toolbar mode="default" {...toolbar} editor={editorInstance} />
      <Editor
        defaultConfig={{ placeholder: '请输入内容...', ...editor?.defaultConfig }}
        mode="default"
        style={{ height: 500, overflowY: 'hidden' }}
        {...editor}
        onCreated={setEditorInstance}
      />
    </div>
  )
}
