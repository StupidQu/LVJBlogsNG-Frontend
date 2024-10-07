import { Card } from 'antd';
import { Blog, User } from '../interface';
import { useNavigate } from 'react-router';
import Markdown from 'react-markdown';
import './BlogCard.css';
import UserCard from './UserCard';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export default function BlogCard({ blog, user }: { blog: Blog, user: User }) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/blog/${blog.blogId}`)}
      style={{ width: '100%', cursor: 'pointer' }}
      title={ blog.title }
      bordered={false}
      extra={<UserCard user={user}></UserCard>}
    >
      <Markdown
        className='no-p-margin'
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        { blog.content.slice(0, 100) }
      </Markdown>
    </Card>
  );
}