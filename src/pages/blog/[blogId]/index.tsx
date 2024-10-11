import { useNavigate, useParams } from 'react-router';
import BasicLayout from '../../../components/BasicLayout';
import { Alert, Breadcrumb, Button, Divider, Form, Input, message, Space, Typography } from 'antd';
import { useRequest } from 'alova/client';
import request from '../../../lib/request';
import { Blog, Comment, User } from '../../../interface';
import UserCard from '../../../components/UserCard';
import ts2s from '../../../lib/ts2s';
import CommentsList from '../../../components/CommentsList';
import CommentBox from '../../../components/CommentBox';
import LatexMarkdown from '../../../components/LatexMarkdown';
import { useEffect } from 'react';

type BlogDetail = {
  failStatusCode?: number;
  blog: Blog,
  author: User,
  canEdit: boolean,
  canDelete: boolean,
  comments: Comment[],
  usersDict: Record<number, User>,
  canCommentsDelete: Record<number, { canDelete: boolean }>,
};

export default function BlogDetail() {
  const { blogId } = useParams();
  const { data, loading } = useRequest(() => {
    const password = window.localStorage.getItem(`Blog-Password-${blogId}`);
    return request.Get<BlogDetail>(`/blog/detail/${blogId}?password=${password}`);
  });
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && data.failStatusCode) document.title = '博客详情 - 被密码保护的博文 - LVJBlogsNG';
    else document.title = `博客详情 - ${loading ? 'Loading' : data.blog.title} - LVJBlogsNG`;
  });

  if (!blogId) return <div>404</div>;
  if (!loading && data.failStatusCode === -1) {
    return (
      <BasicLayout>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Blog</Breadcrumb.Item>
          <Breadcrumb.Item>{blogId}</Breadcrumb.Item>
        </Breadcrumb>
        <Typography.Title>输入密码以继续</Typography.Title>
        <Typography.Paragraph>该博文被密码保护。</Typography.Paragraph>
        <Space direction='vertical' style={{ width: '100%' }}>{!!window.localStorage.getItem(`Blog-Password-${blogId}`) && <Alert message="密码错误" type="error" />}
        <Form
          layout='vertical'
          onFinish={(values) => {
            window.localStorage.setItem(`Blog-Password-${blogId}`, values.password);
            window.location.reload();
          }}
        >
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>提交</Button>
          </Form.Item>
        </Form></Space>
      </BasicLayout>
    );
  }

  return (
    <BasicLayout>
      {contextHolder}
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Blog</Breadcrumb.Item>
        <Breadcrumb.Item>{blogId}</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title>{ loading ? 'Loading' : data.blog.title}{ !loading && data.blog.protected && <Typography.Text type="warning">(被密码保护的博文)</Typography.Text>}</Typography.Title>
      {!loading && <div><UserCard user={data.author} /> 发表于 { ts2s(data.blog.createTime) }.</div>}
      <LatexMarkdown>{loading ? 'Loading' : data.blog.content }</LatexMarkdown>
      {!loading && (data.canEdit || data.canDelete) && <Space>
        {data.canEdit && <Button onClick={() => navigate(`/blog/${blogId}/edit`)}>编辑</Button>}
        {data.canDelete && <Button danger onClick={() => {
          request.Post<{success: boolean, msg?: string}>(`/blog/delete/${blogId}`).then((data) => {
            if (data.success) navigate('/');
            else messageApi.error(`删除博客失败：${data.msg || '未知错误'}`);
          })
        }}>删除</Button>}
      </Space>}
      <Divider orientation='left'>共 {loading ? 0 : data.comments.length} 条评论</Divider>
      <CommentBox blogId={Number(blogId)} />
      <CommentsList comments={loading ? [] : data.comments} usersDict={loading ? {} : data.usersDict} canDeleteCommets={loading ? {} : data.canCommentsDelete} />
    </BasicLayout>
  )
}
