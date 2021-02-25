import React from 'react'
import { Form, Input, InputNumber, Col, Select, Switch } from 'antd'
import { FormProps } from 'antd/es/form'
import { fetchTag, getSuperUser, getCategory} from '../../utils/api'
const { Option } = Select


interface IFormComponentProps<T> extends FormProps<T> {
  article: any,
  wrappedComponentRef: any,
  submit: any
}

// 必须是class 形式才能通过 wrappedComponentRef 拿到实例
class BaseInfo extends React.Component<IFormComponentProps<any>> {
  constructor(props: any) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.categoryHandleChange = this.categoryHandleChange.bind(this)
    this.superUserHandleChange = this.superUserHandleChange.bind(this)
    this.switchChange = this.switchChange.bind(this)
  }
  state = {
    allTags: [],
    tagIds: [],
    allCategories:[],
    categoriesId:[],
    allAuthor: [],
    authorId: [],
    article: this.props.article
  }
  async componentDidMount () {
    const { data } = await fetchTag()
    const superUser = await getSuperUser()
    const categories  = await getCategory()
    this.setState({
      allTags: data.result || [],
      allAuthor: superUser.data.result || [],
      allCategories: categories.data.result || [],
    })
  }
  componentWillReceiveProps(nextProps: any) {
    const article = nextProps.article
    console.log('nextProps -->>')
    console.log(nextProps)
    if (article.id) {
      const tagIds = article.tag ? article.tag.map((item:any) => item.id) : []
      this.setState({
        article: article,
        tagIds,
        categoriesId: article.category.id,
        authorId: article.author.id,
      });
    }
  }
  handleChange(value: any) {
    this.setState({tagIds: value})
  }
  categoryHandleChange(value: any){
    this.setState({categoriesId: value})
  }
  superUserHandleChange(value: any){
    this.setState({authorId: value})
  }
  onFinish = () => {
    this.props.submit(this.state.article, this.state.tagIds, this.state.categoriesId, this.state.authorId)
  };
  inputChange(key: string, e: any) {
    this.setState({
      article: {
        ...this.state.article,
        [key]: e.target.value
      }
    });
  }
  inputNumberChange(key: string, value: any) {
    console.log('key - e:' + key, value)
    this.setState({
      article: {
        ...this.state.article,
        [key]: value
      }
    });
  }
  switchChange(key: string, checked: boolean) {
    this.setState({
      article: {
        ...this.state.article,
        [key]: checked ? '1' : '0' 
      }
    },()=>{});
  }
  render () {
    const { allTags, article, tagIds, allAuthor, authorId, allCategories, categoriesId } = this.state
    const title = article.title || ''
    const desc = article.desc || ''
    const viewCount = article.viewCount || 1
    const likeCount = article.likeCount || 1
    console.log('tagIds | authorId | categoriesId')
    console.info(tagIds, authorId, categoriesId)
    return (
      <div className="baseInfo">
        <Form layout="inline"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          ref={this.props.wrappedComponentRef}
          onFinish={this.onFinish}>
          <Col span={10}>
            <Form.Item label="标题" rules={[{ required: true, message: '请输入标题!' }]}>
              <Input placeholder="请输入标题" value={title} onChange={(e) => this.inputChange('title', e)} />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item label="描述" rules={[{ required: true, message: '请输入标题!' }]}>
              <Input placeholder="请输入简短的描述" value={desc} onChange={(e) => this.inputChange('desc', e)} />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="类目" rules={[{ required: true, message: '请选择类目!' }]}>
                <Select
                  value={!categoriesId.length?"请选择类目":categoriesId}
                  onChange={this.categoryHandleChange} 
                  style={{ width: 200 }}
                >
                {
                  allCategories.map((item: any) => <Option key={item.id} value={item.id}>{item.name}</Option>)
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="作者" rules={[{ required: true, message: '请选择文章作者!' }]}>
              <Select
                value={!authorId.length?"请选择作者":authorId}
                onChange={this.superUserHandleChange}
                style={{ width: 200 }}
              >
                {
                  allAuthor.map((item: any) => <Option key={item.id} value={item.id}>{item.name}</Option>)
                }
              </Select>
            </Form.Item>
          </Col>
          
          <Col span={20}>
            <Form.Item label="标签" rules={[{ required: true, message: '请选择标签!' }]}>
              <Select
                mode="multiple"
                placeholder="请选择标签"
                value={tagIds}
                onChange={this.handleChange}
              >
                {
                  allTags.map((item: any) => <Option key={item.id} value={item.id}>{item.name}</Option>)
                }
              </Select>
            </Form.Item>
          </Col>
          
          <Col span={10}>
            <Form.Item label="阅读量" rules={[{ required: true, message: '请输入阅读量' }]}>
              <InputNumber 
                // defaultValue={viewCount}
                value={viewCount}
                onChange={(e) => this.inputNumberChange('viewCount', e)}
                formatter={value => `${value}`}
                // parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
          <Form.Item label="点赞量" rules={[{ required: true, message: '请输入点赞量' }]}>
              <InputNumber 
                value={likeCount}
                onChange={(e) => this.inputNumberChange('likeCount', e)} 
                formatter={value => `${value}`}
                // parser={value => value.replace(/\D/g,'')}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="是否置顶" rules={[{ required: true, message: '是否置顶' }]}>
              <Switch checkedChildren="置顶" unCheckedChildren="正常" checked={ article.top === '1'} onChange={(checked: boolean) => this.switchChange('top', checked) } />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item label="是否公开" rules={[{ required: true, message: '是否是公开文章!' }]}>
              <Switch checkedChildren="公开" unCheckedChildren="私密" checked={ article.publish == '1' } onChange={(checked: boolean) => this.switchChange('publish', checked) } />
            </Form.Item>
          </Col>
        </Form>
      </div>
    )
  }
}

export default BaseInfo
