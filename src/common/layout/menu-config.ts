import {
  HomeOutlined,
  EditOutlined,
  TagsOutlined,
  TagOutlined,
  MessageOutlined,
  IssuesCloseOutlined,
  ProjectOutlined,
} from '@ant-design/icons';
export interface menuType {
  title: string,
  key: string,
  icon?: any,
  path?: string,
  children?: menuType[]
}

export const menuConfig:menuType[] = [
  {
    title: 'HOME',
    key: 'home',
    icon: HomeOutlined,
    path: '/'
  },
  {
    title: '文章管理',
    key: 'article',
    icon: EditOutlined,
    children: [
      {
        title: '文章列表',
        key: 'article-list',
        path: '/article'
      },
      {
        title: '添加文章',
        key: 'article-add',
        path: '/article-add'
      },
    ]
  },
  {
    title: '标签管理',
    key: 'tags',
    icon: TagsOutlined,
    children: [
      {
        title: '全部标签',
        key: 'tags-all',
        path: '/tags'
      },
      {
        title: '新增标签',
        key: 'tags-add',
        path: '/tags-add'
      }
    ]
  },
  {
    title: '类目管理',
    key: 'category',
    icon: TagOutlined,
    children: [
      {
        title: '全部类目',
        key: 'category-all',
        path: '/category'
      },
      {
        title: '新增类目',
        key: 'category-add',
        path: '/category-add'
      }
    ]
  },
  {
    title: '留言墙管理',
    key: 'message',
    icon: MessageOutlined,
    children: [
      {
        title: '全部留言',
        key: 'message-all',
        path: '/message'
      },
      {
        title: '新增留言',
        key: 'message-add',
        path: '/message-add'
      }
    ]
  },
  {
    title: '评论管理',
    key: 'discuss',
    icon: IssuesCloseOutlined,
    children: [
      {
        title: '文章评论',
        key: 'discuss-article',
        path: '/discuss'
      }
    ]
  },
  {
    title: '项目管理',
    key: 'project',
    icon: ProjectOutlined,
    children: [
      {
        title: '全部项目',
        key: 'project-all',
        path: '/project'
      },
      {
        title: '新增项目',
        key: 'project-add',
        path: '/project-add'
      }
    ]
  },
]
