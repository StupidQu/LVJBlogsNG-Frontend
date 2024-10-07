import { Breadcrumb, Button, Form, Input, message, Typography } from 'antd';
import BasicLayout from '../../components/BasicLayout';
import request from '../../lib/request';
import { useNavigate } from 'react-router';

export default function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  return (<BasicLayout>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Login</Breadcrumb.Item>
    </Breadcrumb>
    {contextHolder}
    <Typography.Title>登录您的账号</Typography.Title>
    <Form
      onFinish={(values) => {
        request.Post<{success: boolean, sessionId?: string, msg?: string}>('/user/login', {
          uname: values.uname,
          password: values.password,
        }).then((data) => {
          if (data.success) {
            messageApi.success('登录成功');
            localStorage.setItem('sessionId', data.sessionId || '')
            setTimeout(() => {
              navigate('/');
            }, 1500);
          } else {
            messageApi.error(`登录失败：${data.msg}`);
          }
        });
      }}
    >
      <Form.Item<string>
        rules={[{ required: true, message: '请填写此项' }]}
        label="账号"
        name="uname"
      >
        <Input />
      </Form.Item>
      <Form.Item<string>
        rules={[{ required: true, message: '请填写此项' }]}
        label="密码"
        name="password"
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">登录</Button>
      </Form.Item>
    </Form>
  </BasicLayout>);
}
