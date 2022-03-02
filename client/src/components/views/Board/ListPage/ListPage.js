import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { boardRemove, boardSearch } from '../../../../_actions/user_actions';

// css
import 'antd/dist/antd.css';
import { Table, Button, Space, Input } from 'antd';

function ListPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const { Search } = Input;

    const fetchData = async () => {
        await axios.get('/api/board/list')
            .then(response => {
                const rowsData = response.data.list;
                setRows(rowsData);
            });
    }

    // 마운트 + [ items ] 변경될때만 실행
    useEffect(() => {
        fetchData();
    }, []);

    const onNewHandler = event => {
        navigate('/board/write');
    }

    const onChangeHandler = selectedRowKeys => {
        setSelectedRowKeys(selectedRowKeys);
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

    const onSearchHandler = searchValue => {
        if (searchValue === "") {
            fetchData();
            navigate(`/board/list`);
            return false;
        }

        const body = { contents: searchValue };

        dispatch(boardSearch(body))
            .then(response => {
                if (response.payload.success) {
                    setRows(response.payload.searchData);
                }
            });

        navigate(`/board/list?search=${searchValue}`);
    }

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
        return rows.map((row, idx) => {
            return {
                key: row._id,
                number: idx + 1,
                title: {
                    id: row._id,
                    title: row.title,
                },
                writer: row.writer,
                writeDate: row.writeDate
            }
        });
    };

    const cellData = getCellData();

    return (
        <Space direction="vertical">
            <Space>
                <Search placeholder="검색어를 입력해주세요" onSearch={onSearchHandler} />
            </Space>
            <Table
                rowSelection={rowSelection}
                pagination={{
                    position: ["bottomCenter"]
                }}
                columns={columns}
                dataSource={cellData}
                bordered={true}
                size={"middle"}
                tableLayout={"fixed"}
            />
            <Space>
                <Button type="primary" onClick={onNewHandler}>신규</Button>
                <Button onClick={onDeleteHandler}>삭제</Button>
            </Space>
        </Space>
    );
}

export default ListPage;