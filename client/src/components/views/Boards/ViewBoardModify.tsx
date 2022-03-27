import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { useDispatch } from "react-redux";
import { boardDetail, boardUpdate, boardRemove } from "../../../actions/boardActions";
import { useNavigate, useLocation } from "react-router-dom";
import { getDate } from "../../../util/util";

// css
import { Form, Input, Button, Space } from "antd";
import SectionForm from "../../sections/SectionForm";

interface IFormDataDTO {
    title: string;
    writer: string;
    contents: string;
}

function ViewBoardModify() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search } = useLocation();
    const { board_ID } = queryString.parse(search);

    // state
    const [form] = Form.useForm();

    const fetchData = () => {
        const body = {
            _id: board_ID,
        };

        dispatch(boardDetail(body)).then((response) => {
            const detailData = response.payload.detailData[0];

            if (!detailData) {
                alert("데이터가 존재하지 않습니다!!");
                navigate("/board/list"); // v5이상
            }
            else {
                form.setFields([
                    {
                        name: "title",
                        value: detailData.title,
                    },
                    {
                        name: "writer",
                        value: detailData.writer,
                    },
                    {
                        name: "contents",
                        value: detailData.contents,
                    },
                ]);
            }
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onSubmitHandler = (formData: IFormDataDTO) => {
        const body = {
            id: board_ID,
            title: formData.title,
            writer: formData.writer,
            contents: formData.contents,
            writeDate: getDate(),
        };

        dispatch(boardUpdate(body)).then((response) => {
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

    const onDeleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        const body = {
            _id: board_ID
        }

        dispatch(boardRemove(body)).then((response) => {
            console.log(response);
            if (response.payload.success) {
                navigate("/board/list"); // 데이터 삭제 후 리스트페이지로 이동
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

    const formData = {
        name: "modify",
        autoComplete: "off",
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
        formItems: [
            {
                label: "제목",
                name: "title",
                rules: [
                    {
                        required: true,
                        message: "제목을 입력해주세요",
                    },
                ],
                components: [
                    {
                        componentType: "input",
                        placeHolder: "제목을 입력해주세요",
                        id: "modify_title",
                    },
                ],
            },
            {
                label: "작성자",
                name: "writer",
                rules: [
                    {
                        required: true,
                        message: "작성자를 입력해주세요",
                    },
                ],
                components: [
                    {
                        componentType: "input",
                        placeHolder: "작성자를 입력해주세요",
                    },
                ],
            },
            {
                label: "내용",
                name: "contents",
                rules: [
                    {
                        required: true,
                        message: "내용을 입력해주세요",
                    },
                ],
                components: [
                    {
                        componentType: "textarea",
                        placeHolder: "내용을 입력해주세요",
                        rows: 6,
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
                        label: "수정완료",
                    },
                    {
                        componentType: "button",
                        label: "삭제",
                        clickHandler: onDeleteHandler,
                    },
                    {
                        componentType: "button",
                        label: "다시작성",
                        clickHandler: onResetHandler,
                    },
                    {
                        componentType: "button",
                        label: "목록으로",
                        clickHandler: onListHandler,
                    },
                ],
            },
        ],
    };

    return (
        <SectionForm formData={formData} form={form} submitHandler={onSubmitHandler} />
    );
}

export default ViewBoardModify;
