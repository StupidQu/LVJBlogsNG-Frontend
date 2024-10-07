import { Breadcrumb, Button, Form, Input, message, Typography } from 'antd';
import BasicLayout from '../../components/BasicLayout';
import MarkdownEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import markdownItKatex from '@traptitech/markdown-it-katex';
import request from '../../lib/request';
import { useNavigate } from 'react-router';

export default function Post() {
  const currentUser = JSON.parse(window.localStorage.getItem('currentUser') || '{}');
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  if (!currentUser.uid || currentUser.uid === 1) {
    window.location.href = '/login';
    return <></>;
  }

  let mdValue = '';
  
  const mdIt = new MarkdownIt();
  mdIt.use(markdownItKatex);

  const markdownEditor = <MarkdownEditor
    style={{ height: '500px', marginBottom: '16px' }}
    id="markdownContent"
    name=""
    renderHTML={(text) => mdIt.render(text)}
    onChange={(x) => mdValue = x.text}
  />;

  return (
    <BasicLayout>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Post Blog</Breadcrumb.Item>
      </Breadcrumb>
      {contextHolder}
      <Typography.Title>发表一篇博文</Typography.Title>
      <Form
        layout='vertical'
        onFinish={(values) => {
          request.Post<{success: boolean, msg?: string, blogId?: number}>('/blog/create', {
            title: values.title,
            content: mdValue,
          }).then((data) => {
            if (data.success) {
              navigate(`/blog/${data.blogId}`);
            } else {
              messageApi.error(`发表博客失败：${data.msg || '未知错误'}`);
            }
          });
        }}
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input/>
        </Form.Item>
        {markdownEditor}
        <Form.Item>
          <Button type='primary' htmlType='submit'>提交</Button>
        </Form.Item>
      </Form>
    </BasicLayout>
  )
}