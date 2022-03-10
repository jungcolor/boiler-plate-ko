import React from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_actions";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";

interface IFormDataDTO {
    email: string;
    password: string;
    name: string;
}

// css
import { Form, Input, Button, Space } from "antd";

function RegisterPage(props: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // v5 이상
    // state 생성
    const [form] = Form.useForm();

    const onFinishHandler = (formData: IFormDataDTO) => {
        const body = {
            email: formData.email,
            password: formData.password,
            name: formData.name,
        };

        dispatch(registerUser(body)).then((response) => {
            if (response.payload.success) {
                navigate("/login"); // v5이상
            } else {
                return alert("Failed to sign up");
            }
        });
    };

    const onResetHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        form.resetFields();
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
            <Form {...layout} form={form} name="register" autoComplete="off" onFinish={onFinishHandler}>
                <Form.Item
                    label="이메일"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Email을 입력해주세요",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="이름"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Name을 입력해주세요",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="비밀번호"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "비밀번호를 입력해주세요",
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="비밀번호확인"
                    name="confirm"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "비밀번호를 한번 더 입력해주세요",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error("비밀번호와 맞지 않습니다"));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            회원가입
                        </Button>
                        <Button htmlType="button" onClick={onResetHandler}>
                            다시작성
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
}

// export default Auth(RegisterPage, false);
export default RegisterPage;
