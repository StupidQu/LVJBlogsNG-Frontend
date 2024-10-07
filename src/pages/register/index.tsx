import { Breadcrumb, Button, Form, Input, message, Typography } from 'antd';
import BasicLayout from '../../components/BasicLayout';
import request from '../../lib/request';
import { useNavigate } from 'react-router';

export default function Register() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  return (<BasicLayout>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Register</Breadcrumb.Item>
    </Breadcrumb>
    {contextHolder}
    <Typography.Title>注册一个账号</Typography.Title>
    <Form
      onFinish={(values) => {
        request.Post<{success: boolean, msg?: string}>('/user/register', {
          uname: values.uname,
          password: values.password,
          email: values.email,
        }).then((data) => {
          if (data.success) {
            messageApi.success('注册成功，1.5s 后重定向到登录页...');
            setTimeout(() => {
              navigate('/login');
            }, 1500);
          } else {
            messageApi.error(`注册失败：${data.msg}`);
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
      <Form.Item<string>
        rules={[{ required: true, message: '请填写此项' }]}
        label="邮箱"
        name="email"
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">注册</Button>
      </Form.Item>
    </Form>
  </BasicLayout>);
}
