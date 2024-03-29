import React, { useState, useEffect } from 'react'
import { Table, Input, message, Popconfirm } from 'antd'
import { columns } from './article-config'
import PageLayout from '../../common/components/page-layout'
import { getCategory, editeCategory, delCategory } from '../../utils/api'
import { Operate } from './oprations'
import './index.scss'

const editPrams: any = {}

function EditCell (props: any) {
  const { editing, children, col, rowIndex, record} = props
  let res:any = null
  if (col && col.editable && col.editable) {
    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
      editPrams[col.key] = e.currentTarget.value
      editPrams.index = rowIndex
    }
    res = editing ? <Input defaultValue={record[col.key]} onChange={change} /> : <div>{record[col.key]}</div>
  } else {
    res = col && col.dataIndex === 'operation' ? <Operate {...props} editing={editing} /> : children
  }
  return <td>{res}</td>
}

const Category = () => {
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const [editingKey, setEditingKey] = useState(-1)
  const [refresh, setRefresh] = useState(1)
  useEffect(() => {
    (async () => {
      setLoading(true)
      const { data } = await getCategory()
      if (data.code === 200) {
        setTableData(data.result || [])
        cancel()
        setLoading(false)
      }
    })()
  }, [refresh])
  async function save (record:any) {
    if (editPrams.index === null) return
    let prams = {...record, ...editPrams}
    const { data } = await editeCategory({id: prams.id, name: prams.name, desc: prams.desc})
    if(data.code){
      message.success(data.message)
    }
    prams = null
    setRefresh(refresh+1)
  }
  function edit (index:number) {
    editPrams.index = null
    setEditingKey(index)
  }
  function cancel () {
    setEditingKey(-1)
  }
  async function del (record:any) {
    if (editPrams.index === null) return
    const { data } = await delCategory(record.id)
    if (data.code){
      message.success(data.message)
    }
    setRefresh(refresh+1)
  }

  function isEditing (index:number) {
    return index === editingKey
  }

  const tableColumns = columns.map(col => {
    if (col.editable) {
      return {
        ...col,
        onCell: (record:any, rowIndex: number) => ({ record, col, rowIndex, editing: isEditing(rowIndex) })
      }
    } else if (col.dataIndex === 'operation') {
      return { ...col, onCell: (record:any, rowIndex: number) => ({col, record, save, edit, cancel, del, rowIndex, editing: isEditing(rowIndex) }) }
    } else {
      return col
    }
  })
  const components = { body: { cell: EditCell } }
  return <>
    <PageLayout title='类目列表'>
      <Table components={components} loading={loading} columns={tableColumns as any } dataSource={tableData} bordered size='middle' rowKey='id' />
    </PageLayout>
  </>
}

export default Category
