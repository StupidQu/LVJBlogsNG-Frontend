import { Flex } from 'antd';
import { Blog, User } from '../interface';
import BlogCard from './BlogCard';

export default function BlogsList({ blogs, usersDict }: { blogs: Blog[], usersDict: Record<number, User> }) {
  return (
    <>
      <Flex vertical gap="middle">
      { blogs.map(blog => <BlogCard key={blog.blogId} blog={blog} user={usersDict[blog.author]} />) }
      </Flex>
    </>
  )
}