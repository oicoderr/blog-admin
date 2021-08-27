import React from 'react';
import { Tag } from 'antd';
import dayjs from 'dayjs';
export interface recordType {
  name: string;
}

const colorArr = [
  'magenta',
  'geekblue',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'purple',
];
export const columns = [
  {
    title: '#',
    width: 50,
    key: 'tindex',
    render: (text: string, record: any, dataIndex: number) => {
      return <span>{dataIndex + 1}</span>;
    },
  },
  {
    title: '标题',
    width: 280,
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
    render: (text: string, record: any, dataIndex: number) => {
      return <span>{record.title}</span>;
    },
  },
  {
    title: '类目',
    key: 'category',
    width: 250,
    render: (rtext: string, record: any, dataIndex: number) => {
      return (
        <span>
          <Tag color={colorArr[Math.floor(Math.random() * (10 - 0 + 1)) + 0] || 'red'}>
            {record.category_id}
          </Tag>
        </span>
      );
    },
  },
  {
    title: '创建日期',
    width: 250,
    dataIndex: 'create_at',
    key: 'create_at',
    render: (text: string, record: any, dataIndex: number) => {
      return <div>{dayjs(record.create_at).format('YYYY-MM-DD HH:mm:ss')}</div>;
    },
  },
  {
    title: '更新日期',
    width: 250,
    dataIndex: 'update_at',
    key: 'update_at',
    render: (text: string, record: any, dataIndex: number) => {
      return (
        <div>{dayjs(record.update_at).format('YYYY-MM-DD HH:mm:ss')}</div>
        // <div>{record.update_at}</div>
      );
    },
  },
  {
    title: '浏览量',
    dataIndex: 'reading',
    key: 'reading',
    render: (text: string, record: any, dataIndex: number) => {
      return (
        <div>
          <p style={{ color: '#FF8F59', fontSize: '16px' }}>{record.reading}</p>
        </div>
      );
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text: string, record: any, dataIndex: number) => {
      return (
        <div>
          <p style={{ color: '#999' }}>
            <span>
              （1:置顶显示 2:正常显示 3:不显示):
              <i style={{ color: '#FF8F59', fontSize: '16px' }}> {record.status + ''}</i>
            </span>
          </p>
        </div>
      );
    },
  },
  {
    title: '编辑',
    key: 'operation',
    dataIndex: 'operation',
    width: 150,
  },
];
