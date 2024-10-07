import { Card } from 'antd';
import { Blog, User } from '../interface';
import { useNavigate } from 'react-router';
import './BlogCard.css';
import UserCard from './UserCard';
import 'katex/dist/katex.min.css';
import LatexMarkdown from './LatexMarkdown';

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
      <LatexMarkdown className="no-p-margin">{blog.content.slice(0, 100)}</LatexMarkdown>
    </Card>
  );
}