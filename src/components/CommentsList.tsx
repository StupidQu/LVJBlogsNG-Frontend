import { Button, List, message } from 'antd';
import { Comment, User } from '../interface';
import UserAvatar from './UserAvatar';
import LatexMarkdown from './LatexMarkdown';
import ts2s from '../lib/ts2s';
import request from '../lib/request';

export default function CommentsList({ comments, usersDict, canDeleteCommets }: { comments: Comment[], usersDict: Record<number, User>, canDeleteCommets: Record<number, { canDelete: boolean }> }) {
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <>
      { contextHolder }
      <List
        itemLayout='horizontal'
        dataSource={comments}
        renderItem={(comment, index) => (
          <List.Item key={index} actions={canDeleteCommets[comment.commentId].canDelete ? [<Button danger onClick={() => {
            request.Post<{success: boolean, msg?: string}>(`/blog/${comment.blogId}/comment/delete/${comment.commentId}`).then((data) => {
              if (data.success) location.reload();
              else messageApi.error(`删除评论失败：${data.msg || '未知错误'}`);
            })
          }}>删除</Button>] : []}>
            <List.Item.Meta
              avatar={UserAvatar({ user: usersDict[comment.author], size: "default" })}
              title={<><a href={`/user/${comment.author}`}>{usersDict[comment.author].uname}</a> <span>{`@${ts2s(comment.createTime)}`}</span></>}
              description={<LatexMarkdown>{comment.content}</LatexMarkdown>}
            />
          </List.Item>
        )}
      />
    </>
  )
}