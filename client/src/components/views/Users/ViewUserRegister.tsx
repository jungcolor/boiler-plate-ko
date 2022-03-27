import React from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../actions/userActions";
import { useNavigate } from "react-router-dom";
import Auth from "../../../middleware/auth";
import SectionForm from "../../sections/SectionForm";

// css
import { Form } from "antd";

interface IFormDataDTO {
    email: string;
    password: string;
    name: string;
}

function ViewUserRegister(props: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // v5 이상
    // state 생성
    const [form] = Form.useForm();

    const onSubmitHandler = (formData: IFormDataDTO) => {
        const body = {
            email: formData.email,
            password: formData.password,
            name: formData.name,
        };

        dispatch(registerUser(body)).then((response) => {
            if (response.payload.success) {
                navigate("/user/login"); // v5이상
            } else {
                return alert("Failed to sign up");
            }
        });
    };

    const onResetHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        form.resetFields();
    };

    const formData = {
        name: "register",
        autoComplete: "off",
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
        formItems: [
            {
                label: "이메일",
                name: "email",
                rules: [
                    {
                        required: true,
                        message: "이메일을 입력해주세요",
                    },
                ],
                components: [
                    {
                        componentType: "input",
                        placeHolder: "이메일을 입력해주세요",
                    },
                ],
            },
            {
                label: "이름",
                name: "name",
                rules: [
                    {
                        required: true,
                        message: "이름을 입력해주세요",
                    },
                ],
                components: [
                    {
                        componentType: "input",
                        placeHolder: "이름을 입력해주세요",
                    },
                ],
            },
            {
                label: "비밀번호",
                name: "password",
                hasFeedback: true,
                rules: [
                    {
                        required: true,
                        message: "비밀번호를 입력해주세요",
                    },
                ],
                components: [
                    {
                        componentType: "password",
                        placeHolder: "비밀번호를 입력해주세요",
                    },
                ],
            },
            {
                label: "비밀번호확인",
                name: "confirm",
                dependencies: {
                    target: "password",
                },
                hasFeedback: true,
                rules: [
                    {
                        required: true,
                        message: "비밀번호를 한번 더 입력해주세요",
                    },
                    ({ getFieldValue }: any) => ({
                        validator(_: any, value: string) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error("비밀번호와 맞지 않습니다"));
                        },
                    }),
                ],
                components: [
                    {
                        componentType: "password",
                        placeHolder: "비밀번호를 한번 더 입력해주세요",
                    },
                ],
            },
            {
                wrapperCol: {
                    offset: 5,
                    span: 19,
                },
                components: [
                    {
                        componentType: "button",
                        type: "primary",
                        htmlType: "submit",
                        label: "회원가입",
                    },
                    {
                        componentType: "button",
                        label: "다시작성",
                        clickHandler: onResetHandler,
                    },
                ],
            },
        ],
    };

    return (
        <SectionForm formData={formData} form={form} submitHandler={onSubmitHandler} />
    );
}

export default Auth(ViewUserRegister, false);
