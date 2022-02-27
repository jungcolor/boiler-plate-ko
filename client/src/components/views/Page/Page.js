import React from 'react';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import LandingPage from '../LandingPage/LandingPage'
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ListPage from '../Board/ListPage/ListPage';
import WritePage from '../Board/WritePage/WritePage';
import DetailPage from '../Board/DetailPage/DetailPage';
import ModifyPage from '../Board/ModifyPage/ModifyPage';

// ant design
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { HomeOutlined, LoginOutlined, EllipsisOutlined, ProfileOutlined } from '@ant-design/icons';

function Page() {
    const { Header, Content, Footer, Sider } = Layout;
    const location = useLocation();
    const getSelectedKey = () => {
        const type = location.pathname.split("/").join("");
        let key = "0";

        switch (type) {
            case "register":
                key = "1";
                break;
            case "login":
                key = "2";
                break;
            case "boardlist":
            case "boardwrite":
            case "boarddetail":
            case "boardmodify":
                key = "3";
                break;
            default:
                break;
        }

        return key;
    }

    return (
        <Layout hasSider>
            <Sider style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
            }}>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={getSelectedKey()}>
                    <Menu.Item key="0" icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="1" icon={<EllipsisOutlined />}>
                        <Link to="/register">Sign Up</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<LoginOutlined />}>
                        <Link to="/login">Login</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<ProfileOutlined />}>
                        <Link to="/board/list">Board</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <h2 style={{ color: "#fff" }}>Header</h2>
                </Header>
                <Content style={{ margin: "24px 16px 0", overflow: 'initial' }}>
                    <div className="site-layout-background" style={{ padding: 24, background: "#fff", minHeight: 500 }}>
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
    );
}

export default Page;