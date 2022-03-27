import React from 'react';
import { Input } from 'antd';

interface IInputTextareaProps {
    cols?: number;
    rows?: number;
    value?: string;
    placeHolder?: string;
}

function ControlInputTextarea(props: IInputTextareaProps) {
    const { rows, cols, placeHolder, value } = props;
    return <Input.TextArea rows={rows} cols={cols} placeholder={placeHolder} value={value} />;
}

export default ControlInputTextarea;