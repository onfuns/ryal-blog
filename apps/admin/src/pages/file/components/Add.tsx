import { fileService, type FileType } from '@/service'
import { IDetailModalProps } from '@/type'
import { CloseCircleFilled, InboxOutlined, PlusOutlined } from '@ant-design/icons'
import {
  ProForm,
  ProFormItem,
  ProFormSelect,
  ProFormText,
  ProFormUploadDragger,
} from '@ant-design/pro-components'
import { DrawerForm, TriggerModal } from '@ryal/ui-kit'
import { useRequest } from 'ahooks'
import { Button, Divider, Space, UploadFile, UploadProps, message } from 'antd'
import { useState } from 'react'

export const FileAdd = ({ onSuccess, onCancel }: IDetailModalProps<FileType>) => {
  const [formInstance] = ProForm.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [typeName, setTypeName] = useState<string | undefined>()
  const { data, refresh: refreshfileCategoryList } = useRequest(fileService.getFileCategoryList)
  const fileCategoryList = data?.data

  const uploadFile = async (file: UploadFile): Promise<any> => {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.readAsDataURL(file as any)
      reader.onload = () => {
        file.url = reader.result as string
        resolve(file)
      }
    })
  }

  const checkFile = (file: UploadFile) => {
    const error = () => {
      message.error('只能上传图片，不超过10M')
      return false
    }
    if (!file?.type?.includes('image/')) {
      return error()
    }
    if (file.size && file.size > 10 * 1024 * 1024) {
      return error()
    }
    return true
  }

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: async file => {
      if (!checkFile(file)) return false
      const newFile = await uploadFile(file)
      fileList.push(newFile)
      setFileList([...fileList])
    },
    showUploadList: false,
  }

  const addItem = async () => {
    if (!typeName) return
    await fileService.addFileCategory({ name: typeName })
    setTypeName(undefined)
    refreshfileCategoryList()
  }

  const onOk = async () => {
    if (!fileList.length) {
      return message.warning('请选择图片')
    }
    const values = await formInstance.validateFields()
    const formData = new FormData()
    formData.append('fileCategoryId', values.fileCategoryId)
    for (let file of fileList) {
      formData.append('files[]', file as any)
    }
    await fileService.upload(formData as any)
    message.success('上传成功')
    onSuccess?.()
  }

  const renderFileList = () => {
    const list = fileList.filter(file => !!file.url)
    return list.map((file, index) => (
      <div
        key={file.uid}
        className="flex items-center relative w-100 h-100 border border-solid border-#ccc mr-10 mb-10 v-mid"
      >
        <img src={file.url} style={{ width: '100%' }} />
        <CloseCircleFilled
          className="absolute z-5 right-[-5] top-[-5] text-16 "
          onClick={() => {
            fileList.splice(index, 1)
            setFileList([...fileList])
          }}
        />
      </div>
    ))
  }

  return (
    <DrawerForm title="上传文件" open={true} drawerProps={{ onCancel, onOk }} form={formInstance}>
      <ProFormSelect
        label="分组"
        name="fileCategoryId"
        placeholder="未分组"
        options={fileCategoryList?.map(item => ({
          label: item.name,
          value: item.id,
        }))}
        fieldProps={{
          dropdownRender: menu => (
            <>
              {menu}
              <Divider className="my-8" />
              <Space className="px-8 pb-8">
                <ProFormText
                  noStyle
                  placeholder="请输入分组名称"
                  fieldProps={{ value: typeName, onChange: e => setTypeName(e.target.value) }}
                />
                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                  新增分组
                </Button>
              </Space>
            </>
          ),
        }}
      />

      <ProFormUploadDragger label="附件" extra="仅支持图片类文件上传" {...uploadProps}>
        <div className="flex-center flex-col w-200">
          <div className="ant-upload-drag-icon">
            <InboxOutlined />
          </div>
          <div className="ant-upload-text">点击或拖拽图片上传</div>
        </div>
      </ProFormUploadDragger>

      {!!fileList.length && (
        <ProFormItem className="flex flex-wrap">{renderFileList()}</ProFormItem>
      )}
    </DrawerForm>
  )
}

export const TriggerAddModal = (props: IDetailModalProps<FileType>) => (
  <TriggerModal
    trigger={props?.trigger}
    component={({ setOpen }) => (
      <FileAdd
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
