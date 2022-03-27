import React from 'react';
import { Input } from "antd";

interface ISearchProps {
    placeHolder?: string;
    onSearch?: any;
}

function ControlSerach(props: ISearchProps) {
    const { Search } = Input;

    return <Search placeholder={props.placeHolder} onSearch={props.onSearch} />;
}

export default ControlSerach;