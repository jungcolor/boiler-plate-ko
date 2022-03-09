import React from 'react';
import NavBar from '../NavBar/NavBar';

// css
import { Layout } from 'antd';

function Header() {
    const { Header } = Layout;

    return (
        <Header>
            <div className="logo">logo</div>
            <NavBar />
        </Header>
    );
}

export default Header;