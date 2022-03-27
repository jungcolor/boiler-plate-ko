import React, { Component } from "react";
import LayoutHeader from "./LayoutHeader";
import LayoutContents from "./LayoutContents";
import LayoutFooter from "./LayoutFooter";

// css design
import "../../App.css";
import "antd/dist/antd.css";
import { Layout } from "antd";

interface IProps {}
interface IState {}

class LayoutPage extends Component<IProps, IState> {
    state = {
        layoutClass: "layout",
    };

    constructor(props: IProps) {
        super(props);
    }
    render() {
        return (
            <Layout className={this.state.layoutClass}>
                <LayoutHeader />
                <LayoutContents />
                <LayoutFooter />
            </Layout>
        );
    }
}

export default LayoutPage;
