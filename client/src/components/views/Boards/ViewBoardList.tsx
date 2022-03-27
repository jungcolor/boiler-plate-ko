import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { boardSearch } from "../../../actions/boardActions";
import ControlSerach from "../../controls/ControlSerach";

// css
import { Space } from "antd";
import ControlButton from "../../controls/ControlButton";
import ControlTable from "../../controls/ControlTable";

// custom hook 예시
// function useColorChanger({ initColor = 'red' }): any {
//     const [color, setColor] = useState(initColor);

//     return {
//         getColor() {
//             return color;
//         },
//         getApossiteColor() {
//             setColor('blue');
//             return 'blue';
//         }
//     }
// }

const columns: Array<any> = [
    {
        title: "번호",
        key: "number",
        dataIndex: "number",
        width: "7%",
        align: "center",
    },
    {
        title: "제목",
        key: "title",
        dataIndex: "title",
        render: (titOptions: { id: string; title: string }) => <Link to={`/board/modify?board_ID=${titOptions.id}`}>{titOptions.title}</Link>,
    },
    {
        title: "작성자",
        key: "writer",
        dataIndex: "writer",
        width: "17%",
    },
    {
        title: "작성날짜",
        key: "writeDate",
        dataIndex: "writeDate",
        width: "25%",
    },
];

function ViewBoardList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);

    const fetchData = async () => {
        await axios.get("/api/board/list").then((response) => {
            const rowsData = response.data.list;
            setRows(rowsData);
        });
    };

    // 마운트 + [ items ] 변경될때만 실행
    useEffect(() => {
        fetchData();
    }, []);

    const onNewHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        navigate(`/board/write`);
    };

    const onSearchHandler = (searchValue: string): void => {
        if (searchValue === "") {
            fetchData();
            navigate(`/board/list`);
            return;
        }

        const body = { contents: searchValue };

        dispatch(boardSearch(body)).then((response) => {
            if (response.payload.success) {
                setRows(response.payload.searchData);
            } else {
                const err = response.payload.err;
                const errName = err.name;
                const errMsg = err.message;
                console.log("errName: ", errName);
                console.log("errMsg: ", errMsg);
            }
        });

        navigate(`/board/list?search=${searchValue}`);
    };

    const getBodyData = () => {
        return rows.map((row, idx) => {
            return {
                key: row._id,
                number: idx + 1,
                title: {
                    id: row._id,
                    title: row.title,
                },
                writer: row.writer,
                writeDate: row.writeDate,
            };
        });
    };

    return (
        <Space direction="vertical">
            <Space>
                <ControlSerach placeHolder="검색어를 입력해주세요" onSearch={onSearchHandler} />
            </Space>
            <ControlTable
                useCheckbox={false}
                usePagination={{ position: ["bottomCenter"] }} // false - 사용안함
                headerData={columns}
                bodyData={getBodyData()}
                useBordered={true}
                size="middle"
                tableLayout="fixed"
            />
            <Space>
                <ControlButton type="primary" label="신규" clickHandler={onNewHandler} />
            </Space>
        </Space>
    );
}

export default ViewBoardList;
