import React from 'react';
import { Form } from "antd";
import SectionFormComponent from './SectionFormComponent';

interface IFormSubmitData {
    title?: string;
    writer?: string;
    contents?: string;
    email?: string;
    password?: string;
}

interface IFormData {
    form: any;
    formData: {
        name: string;
        labelCol?: object;
        wrapperCol?: object;
        formItems: object[];
    };
    submitHandler?: (data: IFormSubmitData) => void;
}

interface IFormItemData {
    name: string;
    label?: string;
    rules?: object[];
    components?: object[];
    wrapperCol?: {
        offset: number;
        span: number;
    };
    dependencies?: {
        target: string[];
    };
    hasFeedback?: boolean;
}

const createFormItems = (formItems: object[]): object[] => {
    return formItems?.map((formItem: IFormItemData, idx: number): JSX.Element => {
        const { label, name, rules, components, wrapperCol, dependencies, hasFeedback } = formItem;

        return (
            <Form.Item key={name + idx} label={label} name={name} rules={rules} wrapperCol={wrapperCol} hasFeedback={hasFeedback ? hasFeedback : null} dependencies={dependencies ? [dependencies.target] : undefined}>
                <SectionFormComponent key={idx} components={components} />
            </Form.Item>
        );
    });
}

function SectionForm(props: IFormData): JSX.Element {
    const { formData, submitHandler, form } = props;
    const { name, labelCol, wrapperCol, formItems } = formData;

    return (
        <Form form={form} name={name} labelCol={labelCol} wrapperCol={wrapperCol} onFinish={submitHandler}>
            {createFormItems(formItems)}
        </Form>
    );
}

export default SectionForm;