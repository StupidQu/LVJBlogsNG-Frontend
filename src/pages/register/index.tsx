/* eslint-disable @typescript-eslint/no-explicit-any */
import { Breadcrumb, Button, Form, Input, message, Space, Typography } from 'antd';
import BasicLayout from '../../components/BasicLayout';
import { useNavigate } from 'react-router';
import request from '../../lib/request';
import { useEffect, useRef } from 'react';

export default function Register() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    document.title = '注册 - LVJBlogsNG';
  });
  let tokenId = '';
  const ref = useRef(null);

  return (<BasicLayout>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Register</Breadcrumb.Item>
    </Breadcrumb>
    {contextHolder}
    <Typography.Title>注册一个账号</Typography.Title>
    <Form
      ref={ref}
      onFinish={(values) => {
        request.Post<{success: boolean, msg?: string}>('/user/register', {
          uname: values.uname,
          password: values.password,
          email: values.email,
          code: values.code,
          tokenId,
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
        <Input id='uname_input' />
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
        <Input id='email_input' />
      </Form.Item>
      <Form.Item<string>
        rules={[{ required: true, message: '请填写此项' }]}
        label="验证码"
        name="code"
      >
        <Space.Compact style={{ width: '100%' }}>
          <Input />
          <Button style={{ width: 'max-content' }} onClick={async () => {
            if (!ref.current) return;
            const uname = (ref.current as unknown as any).getFieldValue('uname');
            const email = (ref.current as unknown as any).getFieldValue('email');
            // const uname = '', email = '';
            const response = await request.Post<{success: boolean, msg?: string, tokenId: string}>('/user/code', {
              email, uname,
            });
            if (!response.success) {
              messageApi.error(`获取验证码失败：${response.msg || '未知错误'}`);
            } else {
              tokenId = response.tokenId;
              messageApi.success('验证码已发送，请检查邮箱。');
            }
          }} type='primary'>获取验证码</Button>
        </Space.Compact>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">注册</Button>
      </Form.Item>
    </Form>
  </BasicLayout>);
}
