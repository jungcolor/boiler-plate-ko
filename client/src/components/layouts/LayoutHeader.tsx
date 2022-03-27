import React, { Component } from "react";
import SectionNav from "../sections/SectionNav";
// css
import { Layout } from "antd";

interface IProps {}
interface IState {
    logo: string;
    logoClass: string;
}

class LayoutHeader extends Component<IProps, IState> {
    state = {
        logo: 'logo',
        logoClass: "logo",
    };

    constructor(props: IProps) {
        super(props);
    }

    render() {
        const { Header } = Layout;

        return (
            <Header>
                <div className={this.state.logoClass}>{this.state.logo}</div>
                <SectionNav />
            </Header>
        );
    }
}

export default LayoutHeader;
