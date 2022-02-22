import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import ListPage from './components/views/Board/ListPage/ListPage';
import WritePage from './components/views/Board/WritePage/WritePage';
import DetailPage from './components/views/Board/DetailPage/DetailPage';
import ModifyPage from './components/views/Board/ModifyPage/ModifyPage';

// ant design
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    LoginOutlined,
    EllipsisOutlined,
    ProfileOutlined
} from '@ant-design/icons';

function App() {
    const { Header, Content, Footer, Sider } = Layout;

    return (
        <BrowserRouter>
            <Layout hasSider>
                <Sider style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
                        <Menu.Item key="0" icon={<HomeOutlined />}>
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<EllipsisOutlined />}>
                            <Link to="/register">Sign Up</Link>
                        </Menu.Item>
                        <Menu.Item key="1" icon={<LoginOutlined />}>
                            <Link to="/login">Login</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<ProfileOutlined />}>
                            <Link to="/board/list">Board</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                    <Header className="site-layout-background" style={{ padding: 0, background: "#fff" }}>Header</Header>
                    <Content style={{ margin: "24px 16px 0", overflow: 'initial' }}>
                        <div className="site-layout-background" style={{ poadding: 24, background: "#fff", minHeight: 500 }}>
                            <Routes>
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path="/board/list" element={<ListPage />} />
                                <Route path="/board/write" element={<WritePage />} />
                                <Route path="/board/detail" element={<DetailPage />} />
                                <Route path="/board/modify" element={<ModifyPage />} />
                            </Routes>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>DW Website @2022 Created by DW</Footer>
                </Layout>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
