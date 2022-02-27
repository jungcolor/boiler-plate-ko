import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { boardWrite } from '../../../../_actions/user_actions';
import { useNavigate } from 'react-router-dom';

// css
import 'antd/dist/antd.css';
import { Form, Input, Button, Space } from 'antd';

function WritePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // state
    const [form] = Form.useForm();

    const onSubmitHandler = (formData) => {
        const body = {
            title: formData.title,
            writer: formData.writer,
            contents: formData.contents,
            writeDate: toStringByFormatting()
        }

        dispatch(boardWrite(body))
            .then(response => {
                if (response.payload.success) {
                    navigate('/board/list'); // v5이상
                }
                else {
                    const err = response.payload.err;
                    const errName = err.name;
                    const errMsg = err.message;
                    console.log("errName: ", errName);
                    console.log("errMsg: ", errMsg);
                }
            });
    }

    const onResetHandler = (event) => {
        form.resetFields();
    }

    const onListHandler = (event) => {
        navigate('/board/list');
    }

    const leftPad = (value) => {
        if (value >= 10) {
            return value;
        }

        return `0${value}`;
    }

    const toStringByFormatting = (delimiter = '/') => {
        const date = new Date();
        const year = date.getFullYear();
        const month = leftPad(date.getMonth() + 1);
        const day = leftPad(date.getDate());

        return [year, month, day].join(delimiter);
    }

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
    };

    const tailLayout = {
        wrapperCol: { offset: 5, span: 19 }
    };

    return (
        <div style={{ width: "850px", margin: "0 auto" }}>
            <Form
                {...layout}
                form={form}
                name="write"
                autoComplete="off"
                onFinish={onSubmitHandler}
            >
                <Form.Item
                    label="제목"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: "제목을 입력해주세요"
                        }
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
                            message: "작성자를 입력해주세요"
                        }
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
                            message: "내용을 입력해주세요"
                        }
                    ]}
                >
                    <Input.TextArea rows={6} />
                </Form.Item>
                <Form.Item
                    {...tailLayout}
                >
                    <Space>
                        <Button type="primary" htmlType='submit'>저장</Button>
                        <Button htmlType='button' onClick={onResetHandler}>다시작성</Button>
                        <Button htmlType='button' onClick={onListHandler}>목록으로</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div >
    );
}

export default WritePage;