import React from 'react';
import { Input } from "antd";

interface IInputPasswordProps {
    value?: string;
    placeHolder?: string;
    onChange?: () => void;
}

function ControlInputPassword(props: IInputPasswordProps) {
    const { placeHolder, onChange, value } = props;

    return <Input.Password placeholder={placeHolder} onChange={onChange} value={value} />;
}

export default ControlInputPassword;