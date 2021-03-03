import React from 'react'
import { useState } from 'react'
import { Divider, Button, Popconfirm } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons';
export function Operate (props: any) {
  const { record} = props
  const [visible, setVisible] = useState(false);
  // open sure pop
  const showPopconfirm = () => {
    setVisible(true);
  };
  // close sure pop
  function cancel (){
    setVisible(false);
  }
  return (
    <div className="btnbox">
      <Button type="link" onClick={() => props.edit(record.id)}>编辑</Button>
      <Divider type="vertical" />
      <Popconfirm 
        title="Are you sure？" 
        icon={<QuestionCircleOutlined />}
        style={{ color: 'red' }}
        onConfirm={() => props.del(record.id)}
        onCancel={cancel}
      >
        <Button type="link" onClick={showPopconfirm}>删除</Button>
      </Popconfirm>
    </div>
  )
}
