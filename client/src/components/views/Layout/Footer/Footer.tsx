import React from 'react';

// css design
import { Layout } from 'antd';

function Footer() {
    const { Footer } = Layout;

    return (
        <Footer style={{
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.65)",
            background: "#001529"
        }}>
            DW Website @2022 Created by DW
        </Footer>
    );
}

export default Footer;