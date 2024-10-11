import { Space } from 'antd';
import type { User } from '../interface';
import { useNavigate } from 'react-router';
import UserAvatar from './UserAvatar';
import { AvatarSize } from 'antd/es/avatar/AvatarContext';

export default function UserCard({ user, color = 'black', avatarSize = 'small' }: { user: User, color?: string, avatarSize?: AvatarSize }) {
  const navigate = useNavigate();

  return <span>
    <Space style={{ verticalAlign: 'bottom', cursor: 'pointer' }} onClick={() => {
      navigate(`/user/${user.uid}`);
    }}>
      <UserAvatar size={avatarSize} user={user}/>
      <span style={{ color: color }}>{user.uname}</span>
    </Space>
  </span>;
}