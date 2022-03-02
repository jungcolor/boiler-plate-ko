import React from 'react';
import { Link, useLocation } from "react-router-dom";

// css
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { HomeOutlined, LoginOutlined, EllipsisOutlined, ProfileOutlined } from '@ant-design/icons';

function NavBar() {
    const location = useLocation();
    const getSelectedKey = () => {
        const pathname = location.pathname;
        const type = pathname.split("/").join("");
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
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={getSelectedKey()}>
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
    );
}

export default NavBar;