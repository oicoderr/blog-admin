import { http, getAccessToken } from './http';
import { API_ROOT } from './config';

// refresh_token 刷新access_token
export const handleCheckRefreshToken = (params = {}) => http.post('token/access', { ...params });

// 登录
export const login = (params = {}) => http.post('v1/auth/', { ...params });

// 获取文章列表
export const getArticles = (params = {}) => http.get('v1/post', { params });

// 获取文章详情
export const getArticleDetail = (id: string, params = {}) => http.get(`v1/post/${id}`, { params });

// 添加文章
export const addArticle = (params = {}) => http.post('v1/admin/post', { ...params });

// 更新文章
export const editeArt = (id: string, params = {}) => http.put(`v1/admin/post/${id}`, { ...params });

// 删除文章
export const delArt = (id: string) => http.delete(`article/delete/${id}`);

// 文章md转化
export const mdArt = (params = {}) => http.post(`article/transform`, { ...params });

// 获取所有类目
export const getCategory = (params = {}) => http.get(`v1/category`, { params });
// 编辑类目
export const editeCategory = (params = {}) => http.post(`category/editor`, { ...params });
// 添加类目
export const addCategory = (params = {}) => http.put('category/add', { ...params });
// 删除标签
export const delCategory = (id: string) => http.delete(`category/delete/${id}`);

// 编辑标签
export const editeTag = (params = {}) => http.post('tag/editor', { ...params });

// 添加标签
export const addTag = (params = {}) => http.put('tag/add', { ...params });

// 删除标签
export const delTag = (id: string) => http.delete(`tag/delete/${id}`);

// 获取留言墙
export const fetchHero = (params = {}) => http.get('hero/get', { params });

// 删除留言墙
export const delHero = (id: string) => http.delete(`hero/delete/${id}`);

// 编辑留言墙
export const editeHero = (id: string, params = {}) => http.post(`hero/editor/${id}`, { ...params });

// 获取文章评论
export const fetchComment = (params = {}) => http.get('comment/get', { params });

// 删除评论
export const delComment = (id: string) => http.delete(`comment/delete/${id}`);

// 编辑评论
export const editeComment = (id: string, params = {}) =>
  http.post(`comment/editor/${id}`, { ...params });

// 新增项目
export const addProject = (params = {}) => http.put('project/add', { ...params });

// 编辑项目
export const editeProject = (id: string, params = {}) =>
  http.post(`project/editor/${id}`, { ...params });

// 删除项目
export const delProject = (id: string) => http.delete(`project/delete/${id}`);

// 获取项目
export const fetchProject = (params = {}) => http.get('project/get', { params });

// 根据id获取项目
export const fetchProjectId = (id: string, params = {}) =>
  http.get(`project/get/${id}`, { params });

// 添加音乐
export const addMusic = (params = {}) => http.put('music/add', { ...params });

// 获取音乐
export const fetchMusic = (params = {}) => http.get('music/get', { params });

// 删除音乐
export const delMusic = (id: string) => http.delete(`music/delete/${id}`);

// 编辑留音乐
export const editeMusic = (id: string, params = {}) =>
  http.post(`music/edite/${id}`, { ...params });

// 上传配置
export const uploadConfig = () => ({
  action: `${API_ROOT}music/upload`,
  headers: {
    Authorization: getAccessToken(),
  },
});
