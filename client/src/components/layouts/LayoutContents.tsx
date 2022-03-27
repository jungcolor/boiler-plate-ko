import React, { Component } from "react";
import Router from "../../router/Router";
// css design
import { Layout } from "antd";

interface IProps {}
interface IState {
    siteLayoutClass: string;
    innerLayoutClass: string;
    contentStyle?: {
        padding: string;
    };
}

class LayoutContents extends Component<IProps, IState> {
    state = {
        siteLayoutClass: "site-layout-content",
        innerLayoutClass: "inner-layout-content",
        contentStyle: {
            padding: "50px",
        },
    };

    constructor(props: IProps) {
        super(props);
    }

    render() {
        const { Content } = Layout;

        return (
            <Content style={this.state.contentStyle}>
                <div className={this.state.siteLayoutClass}>
                    <div className={this.state.innerLayoutClass}>
                        <Router />
                    </div>
                </div>
            </Content>
        );
    }
}

export default LayoutContents;
