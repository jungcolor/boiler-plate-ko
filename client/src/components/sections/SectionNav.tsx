import React from "react";
import { Link, useLocation } from "react-router-dom";

// css
import { Menu } from "antd";
import { HomeOutlined, LoginOutlined, EllipsisOutlined, ProfileOutlined } from "@ant-design/icons";

function SectionNav() {
    const location = useLocation();
    const getSelectedKey = () => {
        const pathname = location.pathname;
        const type = pathname.split("/")[2];
        let key = "0";

        switch (type) {
            case "register":
                key = "1";
                break;
            case "login":
                key = "2";
                break;
            case "list":
            case "write":
            case "detail":
            case "modify":
                key = "3";
                break;
            default:
                break;
        }

        return [key];
    };

    return (
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={getSelectedKey()}>
            <Menu.Item key="0" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="1" icon={<EllipsisOutlined />}>
                <Link to="/user/register">Sign Up</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<LoginOutlined />}>
                <Link to="/user/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<ProfileOutlined />}>
                <Link to="/board/list">Board</Link>
            </Menu.Item>
        </Menu>
    );
}

export default SectionNav;
