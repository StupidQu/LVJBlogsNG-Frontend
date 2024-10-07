import LatexMarkdownEditor from './LatexMarkdownEditor';
import request from '../lib/request';
import { Button, message } from 'antd';

export default function CommentBox({ blogId }: { blogId: number }) {
  let mdValue = '';
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <>
      {contextHolder}
      <LatexMarkdownEditor height='300px' onChange={(x) => mdValue = x.text} />
      <Button type='primary' onClick={() => {
        request.Post<{ success: boolean, commentId?: number, msg?: string }>(`/blog/${blogId}/comment/create`, { content: mdValue }).then((data) => {
          if (data.success) {
            window.location.reload();
          } else {
            messageApi.error(`评论失败: ${data.msg}`);
          }
        })
      }}>发送</Button>
    </>
  );
}
