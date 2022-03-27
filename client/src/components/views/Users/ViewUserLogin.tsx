import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../actions/userActions";
import { useNavigate } from "react-router-dom";
import Auth from "../../../middleware/auth";
import SectionForm from "../../sections/SectionForm";

// css
import { Form } from "antd";

interface IFormDataDTO {
    email: string;
    password: string;
}

const formData = {
    name: "login",
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
            label: "비밀번호",
            name: "password",
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
            wrapperCol: {
                offset: 5,
                span: 19,
            },
            components: [
                {
                    componentType: "button",
                    type: "primary",
                    htmlType: "submit",
                    label: "로그인",
                }
            ],
        },
    ],
};

function ViewUserLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // v5 이상
    const [form] = Form.useForm();
    const onSubmitHandler = (formData: IFormDataDTO) => {
        console.log(formData);
        const body = {
            email: formData.email,
            password: formData.password,
        };

        dispatch(loginUser(body)).then((response) => {
            if (response.payload.loginSuccess) {
                navigate("/"); // v5이상
            } else {
                const err = response.payload;
                const errMsg = err.message;
                console.log("errMsg: ", errMsg);
                alert(errMsg);
            }
        });
    };

    return (
        <SectionForm formData={formData} form={form} submitHandler={onSubmitHandler} />
    );
}

export default Auth(ViewUserLogin, null);