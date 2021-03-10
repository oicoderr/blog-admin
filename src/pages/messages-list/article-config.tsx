import React from 'react'
import { ColumnProps } from 'antd/es/table'

interface Comments<T> extends ColumnProps<T> {
  _id?: string
  editable?: boolean
}

export const columns:Comments<any>[] = [
  {
    title: '#',
    width: 50,
    key: 'tindex',
    render: (text, record, dataIndex) => <span>{dataIndex}</span>
  },
  {
    title: '昵称',
    dataIndex: 'fans.name',
    width: 150,
    key: 'fans.name',
    render: (text, record, dataIndex) => <span>{record.fans.name}</span>
  },
  {
    title: '留言内容',
    dataIndex: 'content',
    width: 300,
    key: 'content',
  },
  {
    title: 'ip地址',
    key: 'ip',
    dataIndex: 'ip',
    width: 200,
  },
  {
    title: '留言邮箱',
    key: 'email',
    dataIndex: 'email',
    width: 200,
    render: (text, record, dataIndex) => <span>{record.fans.email}</span>
  },
  {
    title: 'web地址',
    key: 'site',
    dataIndex: 'site',
    width: 300,
    render: (text, record, dataIndex) => <span>{record.fans.site}</span>
  },
  {
    title: '状态',
    key: 'state',
    dataIndex: 'state',
    editable: true,
    width: 100,
  },
  {
    title: '编辑',
    key: 'operation',
    dataIndex: 'operation',
    width: 100
  }
]
