import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { boardRemove } from '../../../../_actions/user_actions';

// css
import 'antd/dist/antd.css';
import { Table, Button, Space } from 'antd';

function ListPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onChangeHandler = selectedRowKeys => {
        setSelectedRowKeys(selectedRowKeys);
    }

    const onNewHandler = event => {
        navigate('../board/write');
    }

    const onDeleteHandler = event => {
        dispatch(boardRemove(selectedRowKeys))
            .then(response => {
                if (response.payload.success) {
                    fetchData(); // 데이터 삭제 후 리스트를 보여주기 위해 호출
                }
                else {
                    alert("Error!!");
                }
            });
    }

    const fetchData = async () => {
        await axios.get('/api/board/list')
            .then(response => {
                console.log(response);
                const rowsData = response.data.list;
                setRows(rowsData);
            });
    }

    // 마운트 + [ items ] 변경될때만 실행
    useEffect(() => {
        fetchData();
    }, []);

    const rowSelection = {
        selectedRowKeys,
        onChange: onChangeHandler
    }

    const columns = [
        {
            title: "번호",
            key: "number",
            dataIndex: "number",
            width: "6%",
            align: "center"
        },
        {
            title: "제목",
            key: "title",
            dataIndex: "title",
            render: titOptions => <Link to={`/board/detail?board_ID=${titOptions.id}`}>{titOptions.title}</Link>
        },
        {
            title: "작성자",
            key: "writer",
            dataIndex: "writer",
            width: "17%",
            align: "center"
        },
        {
            title: "작성날짜",
            key: "writeDate",
            dataIndex: "writeDate",
            width: "17%",
            align: "center"
        },
    ];

    const getCellData = () => {
        const cellData = [];

        rows && rows.forEach((row, idx) => {
            cellData.push({
                key: row._id,
                number: idx + 1,
                title: {
                    id: row._id,
                    title: row.title,
                },
                writer: row.writer,
                writeDate: row.writeDate
            });
        });

        return cellData;
    };

    return (
        <div style={{ width: "850px", margin: "0 auto" }}>
            <Table
                rowSelection={rowSelection}
                pagination={{
                    position: ["bottomCenter"]
                }}
                columns={columns}
                dataSource={getCellData()}
                bordered={true}
                size={"small"}
            />
            <Space>
                <Button type="primary" onClick={onNewHandler}>신규</Button>
                <Button onClick={onDeleteHandler}>삭제</Button>
            </Space>
        </div>
    );
}

export default ListPage;