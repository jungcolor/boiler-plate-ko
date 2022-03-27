import React from 'react';
import { Button } from "antd";

interface IButtonProps {
    id?: string;
    controlType?: string;
    htmlType?: any;
    type?: any;
    label?: string;
    clickHandler?: any;
}

function ControlButton(props: IButtonProps) {
    const { type, htmlType, label, clickHandler, id } = props;

    return (
        <Button id={id} type={type} htmlType={htmlType} onClick={clickHandler}>
            {label}
        </Button>
    );
}

export default ControlButton;