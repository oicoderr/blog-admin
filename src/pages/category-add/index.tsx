import React from 'react'
import PageLayout from '../../common/components/page-layout'
import Category from './add'

const AddCategory = (props: any) => {
  return <>
    <PageLayout title='新增类目'>
      <Category {...props}/>
    </PageLayout>
  </>
}

export default AddCategory
