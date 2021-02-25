import React from 'react'
import { Form, Input, Button, message } from 'antd'
import './index.scss'
import { addCategory } from '../../utils/api'

function AddCategory (props: any) {
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const res = await addCategory(values)
    if (res.data.code) {
      message.success(res.data.message)
      props.history.push('/category')
    }
  };
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }
  return (
    <Form onFinish={onFinish} layout='horizontal' {...formItemLayout} className="addCategory">
      <Form.Item label="类名" name="name" rules={[{ required: true, message: '请输入类名!' }]}>
        <Input  placeholder="请输入类名" allowClear/>
      </Form.Item>
      <Form.Item label="描述" name="desc" rules={[{ required: true, message: '请填写描述!' }]}>
        <Input placeholder="请填写描述" allowClear/>
      </Form.Item>
      <div className="btnbox">
        <Button type="primary" htmlType="submit" className="btn">提交</Button>
      </div>
    </Form>
  )
}

export default AddCategory
