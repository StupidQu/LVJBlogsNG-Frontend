import { Card, Space, Typography } from 'antd';
import { Blog, User } from '../interface';
import { useNavigate } from 'react-router';
import './BlogCard.css';
import UserCard from './UserCard';
import LatexMarkdown from './LatexMarkdown';
import { MessageOutlined } from "@ant-design/icons";
import React from 'react';

export default function BlogCard({ blog, user }: { blog: Blog, user: User }) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/blog/${blog.blogId}`)}
      style={{ width: '100%', cursor: 'pointer' }}
      title={ <>{blog.title}{ blog.protected && <Typography.Text type='warning'>(被密码保护的博文)</Typography.Text>}</> }
      bordered={false}
      extra={<Space><UserCard user={user}></UserCard>{(blog.commentsCount || 0) > 0 && (<Space>{React.createElement(MessageOutlined)}{blog.commentsCount}</Space>)}</Space>}
    >
      <LatexMarkdown className="no-p-margin">{blog.content.slice(0, 100)}</LatexMarkdown>
    </Card>
  );
}