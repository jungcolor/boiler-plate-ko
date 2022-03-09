import React from 'react';
import Router from '../../../../_router/Router';

// css design
import '../../../../App.css';
import { Layout } from 'antd';

function Contents() {
    const { Content } = Layout;

    return (
        <Content style={{ padding: "50px" }}>
            <div className="site-layout-content">
                <div className="inner-layout-content">
                    <Router />
                </div>
            </div>
        </Content>
    );
}

export default Contents;