import { Breadcrumb, Button, Form, Input, message, Typography } from 'antd';
import BasicLayout from '../../../components/BasicLayout';
import request from '../../../lib/request';
import { useNavigate, useParams } from 'react-router';
import { useRequest } from 'alova/client';
import { Blog } from '../../../interface';
import LatexMarkdownEditor from '../../../components/LatexMarkdownEditor';

export default function Post() {
  const currentUser = JSON.parse(window.localStorage.getItem('currentUser') || '{}');
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const { data, loading } = useRequest(() => request.Get<{ blog: Blog }>(`/blog/detail/${blogId}`))

  const { blogId } = useParams();

  if (!currentUser.uid || currentUser.uid === 1) {
    window.location.href = '/login';
    return <></>;
  }

  let mdValue = '';
  
  return (
    <BasicLayout>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Blog</Breadcrumb.Item>
        <Breadcrumb.Item>{blogId}</Breadcrumb.Item>
        <Breadcrumb.Item>Edit</Breadcrumb.Item>
      </Breadcrumb>
      {contextHolder}
      <Typography.Title>编辑博文</Typography.Title>
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
          {!loading && <Input defaultValue={data.blog.title}/>}
        </Form.Item>
        <LatexMarkdownEditor onChange={(x) => mdValue = x.text} />
        <Form.Item>
          <Button type='primary' htmlType='submit'>提交</Button>
          <Button style={{ marginLeft: '8px' }} onClick={() => navigate(`/blog/${blogId}`)}>取消</Button>
        </Form.Item>
      </Form>
    </BasicLayout>
  )
}