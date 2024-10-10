import { Layout } from 'antd';
import Nav from './Nav';
import { Content, Footer } from 'antd/es/layout/layout';

export default function BasicLayout({ children }: { children: React.ReactNode }) {
  return (
  <Layout lang="zh">
    <Nav />
    <Content style={{
      padding: '0 10%',
      minHeight: 'calc(100vh - 150px)',
    }}>
    { children }
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Copyright © 2024 LVJ, Open-Source(MIT) Project. 本站内容在无特殊说明情况下均遵循 CC-BY-SA 4.0 协议，内容版权归属原作者。
    </Footer>
  </Layout>
  )
}