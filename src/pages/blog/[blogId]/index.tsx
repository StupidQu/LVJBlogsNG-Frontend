import { useNavigate, useParams } from 'react-router';
import BasicLayout from '../../../components/BasicLayout';
import { Breadcrumb, Button, message, Space, Typography } from 'antd';
import { useRequest } from 'alova/client';
import request from '../../../lib/request';
import { Blog, User } from '../../../interface';
import Markdown from 'react-markdown';
import UserCard from '../../../components/UserCard';
import ts2s from '../../../lib/ts2s';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

type BlogDetail = {
  blog: Blog,
  author: User,
  canEdit: boolean,
  canDelete: boolean,
};

export default function BlogDetail() {
  const { blogId } = useParams();
  const { data, loading } = useRequest(() => request.Get<BlogDetail>(`/blog/detail/${blogId}`));
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  if (!blogId) return <div>404</div>;

  return (
    <BasicLayout>
      {contextHolder}
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Blog</Breadcrumb.Item>
        <Breadcrumb.Item>{blogId}</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title>{ loading ? 'Loading' : data.blog.title}</Typography.Title>
      {!loading && <p><UserCard user={data.author} /> 发表于 { ts2s(data.blog.createTime) }.</p>}
      <Markdown 
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >{loading ? 'Loading' : data.blog.content }</Markdown>
      {!loading && (data.canEdit || data.canDelete) && <Space>
        {data.canEdit && <Button onClick={() => navigate(`/blog/${blogId}/edit`)}>编辑</Button>}
        {data.canDelete && <Button danger onClick={() => {
          request.Post<{success: boolean, msg?: string}>(`/blog/delete/${blogId}`).then((data) => {
            if (data.success) navigate('/');
            else messageApi.error(`删除博客失败：${data.msg || '未知错误'}`);
          })
        }}>删除</Button>}
      </Space>}
    </BasicLayout>
  )
}
