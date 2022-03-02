import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';

// css
import 'antd/dist/antd.css';
import { Form, Input, Button, Space } from 'antd';

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // v5 이상

    // state 생성
    const [form] = Form.useForm();
    const onSubmitHandler = (formData) => {
        const body = {
            email: formData.email,
            password: formData.password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    navigate('/'); // v5이상
                }
                else {
                    alert('Error');
                }
            });
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
                name="login"
                autoComplete='off'
                onFinish={onSubmitHandler}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Email을 입력해주세요"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "비밀번호를 입력해주세요"
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    {...tailLayout}
                >
                    <Space>
                        <Button type="primary" htmlType='submit'>로그인</Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
}

export default Auth(LoginPage, null);