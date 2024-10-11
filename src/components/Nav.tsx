import { useRequest } from 'alova/client';
import { Button, Menu, Row, Space } from 'antd';
import { Header } from 'antd/es/layout/layout';
import request from '../lib/request';
import { User } from '../interface';
import './Nav.css';
import { useNavigate } from 'react-router';
import UserCard from './UserCard';

export type NavData = {
  currentUser: User,
  NavItems: {
    label: string,
    key: string,
  }[],
};

export default function Nav() {
  const { data, loading } = useRequest(() => {
    return request.Get<NavData>('/ui/nav');
  });
  const navigate = useNavigate();
  
  let nowLocation = 'home';
  if (window.location.pathname.startsWith('/post')) nowLocation = 'post';
  if (window.location.pathname.startsWith('/user')) nowLocation = 'user';

  let userNavItem = <div style={{ float: 'right' }}>
    <Space><Button onClick={() => navigate('/login')}>登录</Button>
    <Button type='primary' onClick={() => navigate('/register')}>注册</Button></Space>
  </div>;
  if (!loading && data.currentUser.uid !== 1) {
    userNavItem = <Space>
      <UserCard user={data.currentUser} color="white" />
      <Button onClick={() => {
        window.localStorage.removeItem('sessionId');
        window.location.reload();
      }}>登出</Button>
    </Space>
  }
  if (!loading) window.localStorage.setItem('currentUser', JSON.stringify(data.currentUser));

  return (
    <Header style={{ padding: '0 10%'}}>
      <Row>
        <h1 className="nav_logo">{loading ? 'Loading' : 'LVJBlogs-NG'}</h1>
        <Menu
          mode="horizontal"
          theme="dark"
          style={{
            flex: 1,
            minWidth: 0,
          }}
          defaultSelectedKeys={[nowLocation]}
          items={
            (data ? data.NavItems : [])
          }
          onClick={(e) => {
            if (e.key === 'home') navigate('/');
            if (e.key === 'post') navigate('/post');
            if (e.key === 'user') navigate(`/user/${loading ? 1 : data.currentUser.uid}`);
          }}
        />
        {userNavItem}
      </Row>
    </Header>
  )
}