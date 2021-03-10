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
    title: '文章信息',
    dataIndex: 'article',
    width: 300,
    key: 'article',
    render: (text, record, dataIndex) => <div>
      <li>标题：{record.target.title}</li>
      <li>ID：{record.target.id}</li>
    </div>
  },
  {
    title: '留言内容',
    dataIndex: 'content',
    width: 300,
    key: 'content'
  },
  {
    title: 'ip地址',
    key: 'ip',
    dataIndex: 'ip',
    width: 200,
  },
  {
    title: '留言邮箱',
    key: 'from_.email',
    dataIndex: 'from_.email',
    width: 200,
    render: (text, record, dataIndex) => <span>{record.from_.email}</span>
  },
  {
    title: 'web地址',
    key: 'from_.site',
    dataIndex: 'from_.site',
    width: 300,
    render: (text, record, dataIndex) => <span>{record.from_.site}</span>
  },
  {
    title: '留言者基本信息',
    key: 'from_.info',
    dataIndex: 'from_.info',
    width: 300,
    render: (text, record, dataIndex) => <div>
      <li>昵称：{record.from_.name}</li>
      <li>ID：{record.from_.id}</li>
    </div>
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
