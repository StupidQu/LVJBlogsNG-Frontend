import { Breadcrumb } from 'antd';
import BasicLayout from '../components/BasicLayout';
import request from '../lib/request';
import { useRequest } from 'alova/client';
import type { Blog, User } from '../interface';
import BlogsList from '../components/BlogsList';
import { useEffect } from 'react';

function App() {
  const { data, loading } = useRequest(() => request.Get<{
    blogs: Blog[],
    usersDict: Record<number, User>,
  }>('/'));

  useEffect(() => {
    document.title = '首页 - LVJBlogsNG';
  });

  const blogsList = loading ? <></> : <BlogsList usersDict={data.usersDict} blogs={data.blogs}></BlogsList>

  return (
    <BasicLayout>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
      {blogsList}
    </BasicLayout>
  )
}

export default App
