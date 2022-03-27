import React from "react";
import ControlInput from "../controls/ControlInput";
import ControlInputPassword from "../controls/ControlInputPassword";
import ControlButton from "../controls/ControlButton";
import ControlInputTextarea from "../controls/ControlInputTextarea";

interface IFormComponent {
    id?: string;
    componentType: string;
    type?: string;
    htmlType?: string;
    label?: string;
    placeHolder?: string;
    clickHandler?: any;
    rows?: number;
    cols?: number;
}

interface IFormComponents {
    value?: string;
    components: object[];
    onChange?: () => void;
}

const createSectionFormComponents = (components: object[], onChange: () => void, value: string): any => {
    const result = components.map((component: IFormComponent, idx: number): JSX.Element => {
        const { componentType, type, htmlType, label, placeHolder, clickHandler, cols, rows, id } = component;

        switch (componentType) {
            case "input":
                return <ControlInput key={idx} onChange={onChange} placeHolder={placeHolder} value={value} />;
            case "password":
                return <ControlInputPassword key={idx} onChange={onChange} placeHolder={placeHolder} value={value} />;
            case "button":
                return <ControlButton key={idx} type={type} htmlType={htmlType} label={label} clickHandler={clickHandler} />;
            case "textarea":
                return <ControlInputTextarea key={idx} placeHolder={placeHolder} cols={cols} rows={rows} value={value} />;
            default:
                return <></>;
        }
    });

    return result;
};

function SectionFormComponent(props: IFormComponents): JSX.Element {
    const { components, onChange, value } = props;
    return createSectionFormComponents(components, onChange, value);
}

export default SectionFormComponent;
