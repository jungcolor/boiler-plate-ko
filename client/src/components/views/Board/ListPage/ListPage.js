import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { boardRemove } from '../../../../_actions/user_actions';
import { useNavigate } from 'react-router-dom';

function ListPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [checkedList, setcheckedList] = useState([]);

    const onChangeHandler = (event) => {
        const { id, checked } = event.currentTarget;
        let newCheckedList = [];

        if (checked) {
            newCheckedList = checkedList.concat(id);
        }
        else {
            newCheckedList = checkedList.filter((list, idx) => {
                return list !== id;
            });
        }

        setcheckedList(newCheckedList);
    }

    const onClickHandler = (event) => {
        const { id } = event.currentTarget;

        switch (id) {
            case "new":
                navigate('../board/write');
                break;
            case "remove":
                dispatch(boardRemove(checkedList))
                    .then(response => {
                        if (response.payload.success) {
                            fetchData(); // 데이터 삭제 후 리스트를 보여주기 위해 호출
                        }
                        else {
                            alert("Error!!");
                        }
                    })
                break;

            default:
                break;
        }
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

    return (
        <div>

            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'
            }}>
                <div style={{
                    display: 'flex', flexDirection: 'column', width: "700px"
                }}>
                    <table>
                        <colgroup>
                            <col style={{ "width": "5%" }} />
                            <col style={{ "width": "10%" }} />
                            <col />
                            <col style={{ "width": "20%" }} />
                            <col style={{ "width": "15%" }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th><input type='checkbox' /></th>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map(row => {
                                return (
                                    <tr key={row._id}>
                                        <td><input type='checkbox' id={row._id} onChange={onChangeHandler} /></td>
                                        <td>{row.number}</td>
                                        <td>
                                            <Link to={`/board/detail?board_ID=${row._id}`}>
                                                {row.title}
                                            </Link>
                                        </td>
                                        <td>{row.writer}</td>
                                        <td>{row.writeDate}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <br />
                </div>
            </div>
            <div style={{
                textAlign: "center"
            }}>
                <button id="new" onClick={onClickHandler}>신규</button>
                <button id="remove" onClick={onClickHandler}>삭제</button>
            </div>
        </div >
    );
}

export default ListPage;