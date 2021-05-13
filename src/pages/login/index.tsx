import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { FormProps } from 'antd/lib/form/Form'
import { RouterProps } from 'react-router'
import './login.scss'
import { login } from '../../utils/api'
function LoginForm (props: (FormProps & RouterProps)) {
  const { history } = props
  const iconColor = { color: 'rgba(0,0,0,.25)' }
  const onFinish = async (values: any) => {
    // console.log('Success:', values);
    const { username, password } = values
    const { data } = await login({ 'username': username, 'password': password })
    if (data.code === 200) {
      window.localStorage.setItem('TOKEN', JSON.stringify(data.result.tokens))
      history.push('/')
    } else {
      message.warning(data.message);
      window.localStorage.clear()
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div id="login">
      <Form className="login-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <p className="title">Blog-管理后台</p>
        <Form.Item name="username"
          rules={[{ required: true, message: '请大人输入账号!' }, { pattern: new RegExp(/^[a-zA-Z0-9_-]{4,16}$/), message: '请大人输入正确账号!' }]}>
          <Input prefix={<UserOutlined style={iconColor} />} placeholder='请大人输入账号!' />
        </Form.Item>
        <Form.Item name="password"
          rules={[{ required: true, message: '请大人输入密码!' }, { pattern: new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$'), message: '请大人输入正确密码!' }]}>
          <Input.Password prefix={<LockOutlined style={iconColor} />} placeholder='请大人输入密码!' />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
      <div className="loginMask"></div>
    </div >
  )
}

export default LoginForm;
