import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { boardUpdate } from '../../../../_actions/user_actions';
import { useNavigate, useLocation } from 'react-router-dom';

// css
import 'antd/dist/antd.css';
import { Form, Input, Button, Space } from 'antd';

function ModifyPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search } = useLocation();
    const { board_ID } = queryString.parse(search);

    // state
    const [form] = Form.useForm();

    const fetchData = async () => {
        const body = {
            _id: board_ID
        };

        await axios.post('/api/board/Detail', body)
            .then(response => {
                const detailData = response.data.detailData[0];
                form.setFields([
                    {
                        name: "title",
                        value: detailData.title
                    },
                    {
                        name: "writer",
                        value: detailData.writer
                    },
                    {
                        name: "contents",
                        value: detailData.contents
                    }
                ]);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onSubmitHandler = (formData) => {
        const body = {
            id: board_ID,
            title: formData.title,
            writer: formData.writer,
            contents: formData.contents,
            writeDate: toStringByFormatting()
        }

        dispatch(boardUpdate(body))
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
        <>
            <Form
                {...layout}
                form={form}
                name="modify"
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
                        <Button type="primary" htmlType='submit'>수정완료</Button>
                        <Button htmlType='button' onClick={onResetHandler}>다시작성</Button>
                        <Button htmlType='button' onClick={onListHandler}>목록으로</Button>
                    </Space>
                </Form.Item>
            </Form>
        </ >
    );
};

export default ModifyPage;