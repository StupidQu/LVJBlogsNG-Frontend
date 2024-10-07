import { Avatar } from 'antd';
import type { User } from '../interface';
import { AvatarSize } from 'antd/es/avatar/AvatarContext';

export default function UserAvatar({ user, size="small" }: { user: User, size?: AvatarSize }) {
  let avatar = <Avatar size={size} src={user.avatar}></Avatar>;
  if (user.avatar.length === 0) {
    avatar = <Avatar size={size}>{user.uname.slice(0, 1)}</Avatar>;
  }
  return avatar;
}