import React from 'react'
import { useState } from 'react'
import { Divider, Button, Popconfirm } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons';
export function Operate (props: any) {
  const { editing, rowIndex, record} = props
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
    <div className="btnbox1">
      {
        editing ? (
          <>
            <Button type="link" onClick={() => props.cancel()}>取消</Button>
            <Divider type="vertical" />
            <Button type="link" onClick={() => props.save(record)}>保存</Button>
          </>
        ) : (
          <>
            <Button type="link" onClick={() => props.edit(rowIndex)}>修改</Button>
            <Divider type="vertical" />
            <Popconfirm 
              title="Are you sure？" 
              icon={<QuestionCircleOutlined />}
              style={{ color: 'red' }}
              onConfirm={() => props.del(record)}
              onCancel={cancel}
            >
              <Button type="link" onClick={showPopconfirm}>删除</Button>
            </Popconfirm>
          </>
        )
      }
    </div>
  )
}
