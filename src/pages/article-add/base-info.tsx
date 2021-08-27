import React from 'react';
import { Form, Input, InputNumber, Col, Select } from 'antd';
import { FormProps } from 'antd/es/form';
import { getCategory } from '../../utils/api';
const { Option } = Select;

interface IFormComponentProps<T> extends FormProps<T> {
  article: any;
  wrappedComponentRef: any;
  submit: any;
}

// 必须是class 形式才能通过 wrappedComponentRef 拿到实例
class BaseInfo extends React.Component<IFormComponentProps<any>> {
  constructor(props: any) {
    super(props);
    this.statusChange = this.statusChange.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
  }
  state = {
    allCategories: [],
    categoriesId: -1,
    reading: 0,
    title: '',
    body: '',
    article: this.props.article,
  };
  async componentDidMount() {
    const category = await getCategory();
    debugger;
    this.setState({
      allCategories: category.data.result.category || [],
    });
  }
  componentWillReceiveProps(nextProps: any) {
    const article = nextProps.article;
    console.log('nextProps -->>');
    console.log(nextProps);
    // if (article.id) {
    //   const tagIds = article.tag ? article.tag.map((item: any) => item.id) : [];
    //   this.setState({
    //     article: article,
    //     tagIds,
    //     categoriesId: article.category.id,
    //     authorId: article.author.id,
    //   });
    // }
  }
  statusChange(value: any) {
    console.log('文章状态：' + value);
    // this.setState({ tagIds: value });
  }
  categoryChange(value: any) {
    this.setState({ categoriesId: value });
  }
  onFinish = () => {
    this.props.submit(this.state.article, this.state.categoriesId);
  };
  inputChange(key: string, e: any) {
    console.log(2, e.target.value);
    this.setState({
      article: {
        ...this.state.article,
        [key]: e.target.value,
      },
    });
  }
  inputNumberChange(key: string, value: any) {
    console.log('key - e:' + key, value);
    this.setState({
      article: {
        ...this.state.article,
        [key]: value,
      },
    });
  }

  render() {
    const { allCategories, categoriesId, reading, title, body } = this.state;

    return (
      <div className="baseInfo">
        <Form
          layout="inline"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          ref={this.props.wrappedComponentRef}
          onFinish={this.onFinish}
        >
          <Col span={10}>
            <Form.Item label="标题" rules={[{ required: true, message: '请输入标题!' }]}>
              <Input
                placeholder="请输入标题"
                value={title}
                onChange={e => this.inputChange(title, e)}
              />
            </Form.Item>
          </Col>

          <Col span={10}>
            <Form.Item label="类目" rules={[{ required: true, message: '请选择类目!' }]}>
              <Select
                defaultValue="请选择类目"
                onChange={this.categoryChange}
                style={{ width: 200 }}
              >
                {allCategories.map((item: any) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={10}>
            <Form.Item label="阅读量" rules={[{ required: true }]}>
              <InputNumber
                value={reading}
                onChange={e => this.inputNumberChange('viewCount', e)}
                formatter={value => `${value}`}
              />
            </Form.Item>
          </Col>

          <Col span={10}>
            <Form.Item label="状态" rules={[{ required: true, message: '' }]}>
              <Select defaultValue="置顶显示" style={{ width: 120 }} onChange={this.statusChange}>
                <Option value="1">置顶显示</Option>
                <Option value="2">正常显示</Option>
                <Option value="3">不显示</Option>
              </Select>
            </Form.Item>
          </Col>
        </Form>
      </div>
    );
  }
}

export default BaseInfo;
