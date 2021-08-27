import React from 'react';
import { Route } from 'react-router-dom';
import loadable from '@loadable/component';

const Layout = loadable(() => import('../common/layout'));
const Login = loadable(() => import('../pages/login'));
const ArticleList = loadable(() => import('../pages/article-list'));
const AddArticle = loadable(() => import('../pages/article-add'));
const ArticleComments = loadable(() => import('../pages/article-comments'));
const AddMessage = loadable(() => import('../pages/message-add'));
const MessageList = loadable(() => import('../pages/messages-list'));
const ProjectAdd = loadable(() => import('../pages/project-add'));
const Projects = loadable(() => import('../pages/projects'));
const Category = loadable(() => import('../pages/categories'));
const CategoryAdd = loadable(() => import('../pages/category-add'));
const Home = loadable(() => import('../pages/home'));
// export interface routeType {
//   path: string,
//   component: React.SFC
// }

export const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/article',
        component: ArticleList,
      },
      {
        path: '/article-add',
        component: AddArticle,
      },
      {
        path: '/discuss',
        component: ArticleComments,
      },
      {
        path: '/message-add',
        component: AddMessage,
      },
      {
        path: '/message',
        component: MessageList,
      },
      {
        path: '/project-add',
        component: ProjectAdd,
      },
      {
        path: '/project',
        component: Projects,
      },
      {
        path: '/category',
        component: Category,
      },
      {
        path: '/category-add',
        component: CategoryAdd,
      },
      {
        path: '/',
        component: Home,
      },
    ],
  },
];

export function RouteWithSubRoutes(route: any) {
  return <Route path={route.path} render={props => <route.component {...props} {...route} />} />;
}
