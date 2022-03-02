import React from 'react';
import Header from '../Header/Header';
import Contents from '../Contents/Contents';
import Footer from '../Footer/Footer';

// css design
import '../../../../App.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

function Page() {
    return (
        <Layout className="layout">
            <Header />
            <Contents />
            <Footer />
        </Layout>
    );
}

export default Page;