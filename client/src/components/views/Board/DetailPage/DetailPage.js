import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { useNavigate, useLocation } from 'react-router-dom';

// css
import 'antd/dist/antd.css';
import { Form, Input, Button, Space } from 'antd';

function DetailPage() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const { board_ID } = queryString.parse(search);
    const [form] = Form.useForm();
    const [detailData, setDetailData] = useState({});

    const fetchData = async () => {
        const body = {
            _id: board_ID
        };

        await axios.post('/api/board/Detail', body)
            .then(response => {
                const detailData = response.data.detailData;
                setDetailData(detailData[0]);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onModiftHandler = (event) => {
        navigate(`/board/modify?board_ID=${detailData._id}`);
    }

    const onListHandler = (event) => {
        navigate('/board/list');
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
                name="detail"
                autoComplete="off"
            >
                <Form.Item
                    label="제목"
                    name="title"
                >
                    <span>{detailData.title}</span>
                </Form.Item>
                <Form.Item
                    label="작성자"
                    name="writer"
                >
                    <span>{detailData.writer}</span>
                </Form.Item>
                <Form.Item
                    label="날짜"
                    name="writeDate"
                >
                    <span>{detailData.writeDate}</span>
                </Form.Item>
                <Form.Item
                    label="내용"
                    name="detailContents"
                >
                    <span>{detailData.contents}</span>
                </Form.Item>
                <Form.Item
                    {...tailLayout}
                >
                    <Space>
                        <Button type='primary' htmlType='button' onClick={onModiftHandler}>수정</Button>
                        <Button htmlType='button' onClick={onListHandler}>목록으로</Button>
                    </Space>
                </Form.Item>
            </Form>

            {/* <ul>
                <li>
                    <div>제목</div>
                    <div></div>
                </li>
                <li>
                    <div>작성자</div>
                    <div>{detailData.writer}</div>
                </li>
                <li>
                    <div>날짜</div>
                    <div>{detailData.writeDate}</div>
                </li>
                <li>
                    <div>내용</div>
                    <div>{detailData.contents}</div>
                </li>
                <br />
                <div>
                    <button onClick={onClickGoToModify}>수정</button>
                    <button onClick={onClickGoTolist}>목록</button>
                </div>
            </ul> */}
        </ >
    );
};

export default DetailPage;