import React, { useEffect, useState, useRef } from 'react';
import { Button, message, Modal, Spin } from 'antd';
import { useLocation } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import './index.scss';
import './view-article.scss';
import BaseInfo from './base-info';
import Edit from './edit';
import HeaderTittle from '../../common/components/header-title';
import { addArticle, editeArt, getArticles, mdArt, getArticleDetail } from '../../utils/api';
import { useQuery } from '../../utils/index';

export default function AddArticle(props: RouteComponentProps) {
  let myform: any = null;
  const [acontent, setAcontent] = useState({ content: '', editContent: '' }); // 编辑文章
  const [article, setArticle] = useState({}); // 文章基本信息
  const [editContent, setEditContent] = useState(''); // 编辑文章
  const [title, setTitle] = useState('');
  const [visible, setVisible] = useState(false); // 文章预览
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  let location = useLocation();
  const viewArticleDom = useRef<any>(null);
  function submit() {
    myform.submit();
  }
  async function openViewArticle() {
    setVisible(true);
    const res = await mdArt({
      article: acontent.content,
    });
    viewArticleDom.current.innerHTML = res.data.result.html;
  }

  function getFormData(article: any, category_id: Array<string>) {
    debugger;
    if (acontent.content) {
      let id = query.get('id');
      debugger;
      if (id) {
        // edit(article, id, category_id);
      } else {
        // add(article, category_id);
      }
    }
  }

  async function add(values: any, category_id: Array<string>) {
    const params = { ...values, ...acontent };
    const { data } = await addArticle({
      title: params.title,
      body: params.content,
      status: params.status,
      category_id: category_id,
      reading: params.reading,
    });
    if (data.code) {
      message.success(data.message);
      props.history.push('/article');
    }
  }

  async function edit(
    values: any,
    id: string,
    tagIds: Array<string>,
    categoriesIds: Array<string>
  ) {
    const params = { ...values, ...acontent };
    const { data } = await editeArt(id, {
      title: params.title,
      body: params.content,
      status: params.status,
      category_id: params.category_id,
      reading: params.reading,
    });
    if (data.code) {
      message.success(data.message);
      props.history.push('/article');
    }
  }
  const editChange = (c: string, e: string) => {
    setAcontent({ content: c, editContent: e });
  };

  const saveFormRef = (formRef: any) => {
    myform = formRef;
  };
  // 获取编辑数据
  useEffect(() => {
    (async () => {
      setLoading(true);
      const id = query.get('id');
      if (id) {
        const { data } = await getArticleDetail(id);
        if (data.code) {
          setArticle(data.result);
          setEditContent(data.result.content);
          setTitle('编辑文章');
          setAcontent({ content: data.result.content, editContent: data.result.editContent });
          setLoading(false);
        }
      } else {
        // setArticle();
        setEditContent('');
        setTitle('添加文章');
        setAcontent({ content: '', editContent: '' });
        setLoading(false);
      }
    })();
  }, [location]);

  return (
    <>
      <HeaderTittle title={title} />
      <Spin wrapperClassName="p20" spinning={loading}>
        <BaseInfo submit={getFormData} wrappedComponentRef={saveFormRef} article={article} />
        <Edit content={editContent} editChange={editChange} />
        <div className="btnbox">
          <Button type="primary" style={{ width: '100px' }} onClick={() => submit()}>
            提 交
          </Button>
          {/* <Button type="primary" style={{width: '100px', marginLeft: '20px'}} onClick={openViewArticle}>预览</Button> */}
        </div>
        <Modal
          title="文章预览"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={1000}
        >
          <div className="view-markdown">
            <div ref={viewArticleDom} className="theme-default-content content__default"></div>
          </div>
        </Modal>
      </Spin>
    </>
  );
}
