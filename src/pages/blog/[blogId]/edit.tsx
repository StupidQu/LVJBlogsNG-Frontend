import { Breadcrumb, Button, Form, Input, message, Space, Typography } from 'antd';
import BasicLayout from '../../../components/BasicLayout';
import request from '../../../lib/request';
import { useNavigate, useParams } from 'react-router';
import { useRequest } from 'alova/client';
import { Blog } from '../../../interface';
import LatexMarkdownEditor from '../../../components/LatexMarkdownEditor';
import { useEffect, useRef } from 'react';

export default function Post() {
  const currentUser = JSON.parse(window.localStorage.getItem('currentUser') || '{}');
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const { data, loading } = useRequest(() => request.Get<{ blog: Blog }>(`/blog/detail/${blogId}`));

  const { blogId } = useParams();

  const form = useRef(null);
  useEffect(() => {
    document.title = `编辑博文 - ${loading ? 'Loading' : data.blog.title} - LVJBlogsNG`;
  });
  useEffect(() => {
    // this is fucking shitty
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (form.current as unknown as any).resetFields();
  })


  if (!currentUser.uid || currentUser.uid === 1) {
    window.location.href = '/login';
    return <></>;
  }

  let mdValue = loading ? '' : data.blog.content;
  
  return (
    <BasicLayout>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Blog</Breadcrumb.Item>
        <Breadcrumb.Item>{blogId}</Breadcrumb.Item>
        <Breadcrumb.Item>Edit</Breadcrumb.Item>
      </Breadcrumb>
      {contextHolder}
      <Typography.Title>编辑博文{loading ? '' : `：${data.blog.title}`}</Typography.Title>
      <Form
        ref={form}
        initialValues={
          loading ? {} : {
            title: data.blog.title,
            password: data.blog.password,
          }
        }
        layout='vertical'
        onFinish={(values) => {
          request.Post<{success: boolean, msg?: string}>(`/blog/edit/${blogId}`, {
            title: values.title,
            password: values.password,
            content: mdValue,
          }).then((data) => {
            if (data.success) {
              navigate(`/blog/${blogId}`);
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
          {!loading && <Input />}
        </Form.Item>
        {!loading && <LatexMarkdownEditor onChange={(x) => mdValue = x.text} value={data.blog.content} />}
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: false }]}
        >
          <Input placeholder='公开文章请留空'/>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' htmlType='submit'>提交</Button>
            <Button onClick={() => navigate(`/blog/${blogId}`)}>取消</Button>
          </Space>
        </Form.Item>
      </Form>
    </BasicLayout>
  )
}