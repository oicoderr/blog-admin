import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PageLayout from '../../common/components/page-layout'
import Add from './add'
import { fetchProjectId } from '../../utils/api'
import { useQuery } from '../../utils/index'
const ProjectAdd = (props: any) => {
  const [project, setProject] = useState({})
  const [name, setName] = useState({})
  let location = useLocation()
  const query = useQuery()
  // 获取编辑数据
  useEffect(() => {
    (async () => {
      const id = query.get('id')
      if (id) { 
        const { data } = await fetchProjectId(id)
        if (data.code) {
          setProject(data.result)
          setName('编辑项目')
        }
      } else {
        setProject({})
        setName('新增项目')
      }
    })()
  }, [location])
  return <PageLayout title={name + ''}>
    <Add {...props} project={project} />
  </PageLayout>
}

export default ProjectAdd
