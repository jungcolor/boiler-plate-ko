import React, { Component } from "react";
// css design
import { Layout } from "antd";

interface IProps {}
interface IState {}

class LayoutFooter extends Component<IProps, IState> {
    state = {};

    constructor(props: IProps) {
        super(props);
    }

    render() {
        const { Footer } = Layout;

        return (
            <Footer
                style={{
                    textAlign: "center",
                    color: "rgba(255, 255, 255, 0.65)",
                    backgroundColor: "#001529",
                }}
            >
                DW Website @2022 Created by DW
            </Footer>
        );
    }
}

export default LayoutFooter;
