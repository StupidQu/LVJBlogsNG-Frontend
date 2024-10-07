import { Avatar, Space } from 'antd';
import type { User } from '../interface';
import { useNavigate } from 'react-router';

export default function UserCard({ user, color = 'black' }: { user: User, color?: string }) {
  let avatar = <Avatar size={20} src={user.avatar}></Avatar>;
  const navigate = useNavigate();
  if (user.avatar.length === 0) {
    avatar = <Avatar
      size="small">
        {user.uname.slice(0, 1)}
    </Avatar>;
  }
  return <span>
    <Space style={{ verticalAlign: 'bottom', cursor: 'pointer' }} onClick={() => {
      navigate(`/user/${user.uid}`);
    }}>
      {avatar}
      <span style={{ color: color }}>{user.uname}</span>
    </Space>
  </span>;
}