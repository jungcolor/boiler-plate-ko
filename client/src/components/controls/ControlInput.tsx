import React from 'react';
import { Input } from "antd";

interface IInputProps {
    id?: string;
    value?: string;
    placeHolder?: string;
    onChange?: () => void;
}

function ControlInput(props: IInputProps) {
    const { placeHolder, onChange, value } = props;

    return <Input onChange={onChange} placeholder={placeHolder} value={value} />;
}

export default ControlInput;