import { Breadcrumb, Button, Input, InputRef, message, Space, Typography } from "antd";
import BasicLayout from "../../components/BasicLayout";
import { useParams } from "react-router";
import { useRequest } from "alova/client";
import request from "../../lib/request";
import { Blog, User } from "../../interface";
import UserCard from "../../components/UserCard";
import LatexMarkdown from "../../components/LatexMarkdown";
import BlogsList from "../../components/BlogsList";
import LatexMarkdownEditor from "../../components/LatexMarkdownEditor";
import { useRef } from "react";

type UserDetailPageResp = {
  user: User;
  blogs: Blog[];
  canEdit: boolean;
}

export default function UserDetailPage() {
  const { userId } = useParams();
  const { data, loading } = useRequest(() => request.Get<UserDetailPageResp>(`/user/detail/${userId}`));
  let mdValue = loading ? '' : data.user.description;
  const ref = useRef<InputRef>(null);
  const [messageApi, contextHolder] = message.useMessage();

  return (<BasicLayout>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>User</Breadcrumb.Item>
      <Breadcrumb.Item>{loading ? userId : data.user.uname}</Breadcrumb.Item>
    </Breadcrumb>
    {contextHolder}
    <Typography.Title>{!loading && <UserCard avatarSize={'large'} user={data.user}/>} 的个人主页</Typography.Title>
    <Typography.Title level={2}>个人简介</Typography.Title>
    {!loading && (
      data.canEdit ? <>
        <Space direction="vertical" style={{width: '100%'}}><Input ref={ref} addonBefore="https://" placeholder="头像 URL" defaultValue={data.user.avatar.slice(8)} />
        <LatexMarkdownEditor onChange={({ text }) => mdValue = text} value={data.user.description} />
        <Button onClick={async () => {
          if (!ref.current) return;
          const response = await request.Post<{ success:boolean; msg?: string; }>(`/user/update/${userId}`, {
            description: mdValue,
            avatar: `https://${ref.current.nativeElement?.attributes.getNamedItem('value')?.value || ''}`,
          });
          if (response.success) {
            window.location.reload();
          } else {
            messageApi.error(`更新失败：${response.msg || '未知错误'}`);
          }
        }} type='primary'>更新</Button></Space>
      </> : <LatexMarkdown>{data.user.description || '这个人很懒，还没有个人简介。'}</LatexMarkdown>
    )}
    <Typography.Title level={2}>{loading ? '' : data.user.uname} 发表的博客</Typography.Title>
    {!loading && <BlogsList blogs={data.blogs} usersDict={{ [data.user.uid]: data.user }} />}
  </BasicLayout>);
}
