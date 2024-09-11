import { useHistory } from '@/hooks'
import LoginImage from '@/public/images/login-bg.png'
import { adminRoutes } from '@/routes'
import { userService, type UserLoginParamsType } from '@/service'
import { ProForm, ProFormItem, ProFormText } from '@ant-design/pro-components'
import { Icon } from '@ryal/ui-kit'
import { Button, message } from 'antd'
import CryptoJS from 'crypto-js'
import { useState } from 'react'
import './index.less'

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [formInstance] = ProForm.useForm<UserLoginParamsType>()
  const history = useHistory()

  const onSubmit = async () => {
    const values = await formInstance.validateFields()
    try {
      setLoading(true)
      const { name, password } = values
      const { data } = await userService.login({
        name,
        password: CryptoJS.MD5(password).toString(),
      })
      setLoading(false)
      userService.saveLocalUser(data)
      message.success('登录成功', 1, () => history.push(adminRoutes[0].path))
    } catch (error) {
      message.error('登录失败，请重试')
      setLoading(false)
    }
  }
  return (
    <div className="login-page absolute top-0 right-0 bottom-0 left-0 flex-center flex-col">
      <div className="flex items-center overflow-hidden w-1080 h-600 flex-shrink-0 bg-white border-rd-10">
        <div className="flex items-center w-500 h-100%">
          <img src={LoginImage} className="w-100%" />
        </div>
        <ProForm
          form={formInstance}
          submitter={false}
          className="w-350 ml-100"
          initialValues={{ name: 'demo', password: 'a123456' }}
        >
          <h1 className="mb-40 text-30">Ryal Blog</h1>

          <ProFormText
            name="name"
            rules={[{ required: true, message: '请输入用户名' }]}
            fieldProps={{ prefix: <Icon name="icon-user" /> }}
            placeholder="用户名"
          />

          <ProFormText.Password
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
            fieldProps={{ prefix: <Icon name="icon-lock" />, onPressEnter: onSubmit }}
            placeholder="密码"
          />

          <ProFormItem noStyle>
            <Button
              type="primary"
              size="large"
              onClick={onSubmit}
              className="w-100%"
              loading={loading}
            >
              登录
            </Button>
          </ProFormItem>
        </ProForm>
      </div>
    </div>
  )
}

export default LoginPage
