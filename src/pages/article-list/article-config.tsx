import React from 'react'
import { Tag } from 'antd'
import dayjs from 'dayjs'
export interface recordType{
  name: string
}

const colorArr = ['magenta', 'geekblue', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'purple']
export const columns = [
  {
    title: '#',
    width: 50,
    key: 'tindex',
    render: (text: string, record: any, dataIndex: number) => {
      return(
        <span>{dataIndex+1}</span>
      )
    }
  },
  {
    title: '标题',
    width: 280,
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
    render: (text: string, record: any, dataIndex: number) => {
      return(
        <span>{record.title}</span>
      )
    }
  },
  {
    title: '标签',
    key: 'tag',
    width: 250,
    render: (record: any) => {
      return (
        <span>
          {record.tag? record.tag.map((item:any, index: number) => {
            return (
              <Tag color={colorArr[index] || 'red'} key={item.id}>
                {item.name}
              </Tag>
            )
          }): ''}
        </span>
      )
    }
  },
  {
    title: '更新日期',
    width: 250,
    dataIndex: 'update_time',
    key: 'update_time',
    render: (text: string, record: any, dataIndex: number) => {
      return(
        // <div>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</div> 
        <div>{record.update_time}</div>
      )
    }
  },
  {
    title: '信息',
    dataIndex: 'meta',
    key: 'meta',
    render: (text: string, record: any, dataIndex: number) => {
      return(
        <div>
          <p>
            浏览：{record.viewCount} &emsp; 喜欢：{record.likeCount}&emsp;&ensp;
            <span style={{color:'#00CC00'}}>是否置顶：{record.top +''}</span>&emsp;
            <span style={{color:'#FF8F59'}}>是否公开: {record.publish +''}</span>
          </p>
        </div>
      )
    }
  },
  {
    title: '编辑',
    key: 'operation',
    dataIndex: 'operation',
    width: 150
  }
]
