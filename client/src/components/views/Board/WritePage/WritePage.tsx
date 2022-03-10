import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { boardWrite } from "../../../../_actions/user_actions";
import { useNavigate } from "react-router-dom";

// css
import { Form, Input, Button, Space } from "antd";

interface IFormDataDTO {
    title: string;
    writer: string;
    contents: string;
}

function WritePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // state
    const [form] = Form.useForm();

    const onSubmitHandler = (formData: IFormDataDTO) => {
        const body = {
            title: formData.title,
            writer: formData.writer,
            contents: formData.contents,
            writeDate: toStringByFormatting(),
        };

        dispatch(boardWrite(body)).then((response) => {
            if (response.payload.success) {
                navigate("/board/list"); // v5이상
            } else {
                const err = response.payload.err;
                const errName = err.name;
                const errMsg = err.message;
                console.log("errName: ", errName);
                console.log("errMsg: ", errMsg);
            }
        });
    };

    const onResetHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        form.resetFields();
    };

    const onListHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/board/list");
    };

    const leftPad = (value: number) => {
        if (value >= 10) {
            return value;
        }

        return `0${value}`;
    };

    const toStringByFormatting = (delimiter = "/") => {
        const date = new Date();
        const year = date.getFullYear();
        const month = leftPad(date.getMonth() + 1);
        const day = leftPad(date.getDate());
        const hour = leftPad(date.getHours());
        const minites = leftPad(date.getMinutes());
        const seconds = leftPad(date.getSeconds());
        const yyyymmdd = [year, month, day].join(delimiter);
        const hhmmss = [hour, minites, seconds].join(":");

        return yyyymmdd + " " + hhmmss;
    };

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    };

    const tailLayout = {
        wrapperCol: { offset: 5, span: 19 },
    };

    return (
        <>
            <Form {...layout} form={form} name="write" autoComplete="off" onFinish={onSubmitHandler}>
                <Form.Item
                    label="제목"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: "제목을 입력해주세요",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="작성자"
                    name="writer"
                    rules={[
                        {
                            required: true,
                            message: "작성자를 입력해주세요",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="내용"
                    name="contents"
                    rules={[
                        {
                            required: true,
                            message: "내용을 입력해주세요",
                        },
                    ]}
                >
                    <Input.TextArea rows={6} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            저장
                        </Button>
                        <Button htmlType="button" onClick={onResetHandler}>
                            다시작성
                        </Button>
                        <Button htmlType="button" onClick={onListHandler}>
                            목록으로
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
}

export default WritePage;
