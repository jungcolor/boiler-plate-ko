import React from 'react';
import { Space } from "antd";

interface ISpace {
    controlType: string;
    controls: object[];
}

function SectionSpace({ controls }: any) {
    return (
        <Space>
        </Space>
    );
}

export default SectionSpace;