import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { useNavigate, useLocation } from 'react-router-dom';

function DetailPage() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const { board_ID } = queryString.parse(search);
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

    const onClickGoToModify = (event) => {
        navigate(`/board/modify?board_ID=${detailData._id}`);
    }

    const onClickGoTolist = (event) => {
        navigate('/board/list');
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <ul>
                <li>
                    <div>제목</div>
                    <div>{detailData.title}</div>
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
            </ul>
        </div >
    );
};

export default DetailPage;