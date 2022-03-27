import React from "react";
import { useDispatch } from "react-redux";
import { boardWrite } from "../../../actions/boardActions";
import { useNavigate } from "react-router-dom";
import { getDate } from "../../../util/util";
import ControlButton from "../../controls/ControlButton";

// css
import { Form, Input, Space, Typography } from "antd";

interface IFormDataDTO {
    title: string;
    writer: string;
    contents: string;
}

function WriteBoardPage(props: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Text } = Typography;

    // state
    const [form] = Form.useForm();

    const onSubmitHandler = (formData: IFormDataDTO) => {
        const body = {
            title: formData.title,
            writer: formData.writer,
            contents: formData.contents,
            writeDate: getDate(),
        };

        dispatch(boardWrite(body)).then((response) => {
            if (response.payload.success) {
                navigate(`/board/list`); // v5이상
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
        navigate(`/board/list`);
    };

    return (
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} form={form} name="write" autoComplete="off" onFinish={onSubmitHandler}>
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
            >
                <Text>{props.name}</Text>
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
            <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
                <Space>
                    <ControlButton type="primary" htmlType="submit" label="저장" />
                    <ControlButton htmlType="button" clickHandler={onResetHandler} label="다시작성" />
                    <ControlButton htmlType="button" clickHandler={onListHandler} label="목록으로" />
                </Space>
            </Form.Item>
        </Form>
    );
}

export default WriteBoardPage