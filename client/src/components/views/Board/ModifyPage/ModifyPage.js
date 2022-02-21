import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { boardUpdate } from '../../../../_actions/user_actions';
import { useNavigate, useLocation } from 'react-router-dom';

function ModifyPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search } = useLocation();
    const { board_ID } = queryString.parse(search);
    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');
    const [contents, setContents] = useState('');

    const fetchData = async () => {
        const body = {
            _id: board_ID
        };

        await axios.post('/api/board/Detail', body)
            .then(response => {
                const detailData = response.data.detailData[0];
                setTitle(detailData.title);
                setWriter(detailData.writer);
                setContents(detailData.contents);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value);
    }

    const onWriteHandler = (event) => {
        setWriter(event.currentTarget.value);
    }

    const onContentsHandler = (event) => {
        setContents(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const body = {
            id: board_ID,
            title: title,
            writer: writer,
            contents: contents,
            writeDate: dateFormat()
        }

        dispatch(boardUpdate(body))
            .then(response => {
                if (response.payload.success) {
                    navigate('/board/list'); // v5이상
                }
                else {
                    const err = response.payload.err;
                    const errName = err.name;
                    const errMsg = err.message;
                    console.log("errName: ", errName);
                    console.log("errMsg: ", errMsg);
                }
            });
    }

    const onClickGoToBoard = (event) => {
        navigate('/board/list');
    }

    const dateFormat = () => {
        const date = new Date();

        return date.toLocaleDateString().replace(" ", "");
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <form style={{
                display: 'flex', flexDirection: 'column'
            }} onSubmit={onSubmitHandler}>
                <label>제목</label>
                <input type="text" value={title} onChange={onTitleHandler} />

                <label>작성자</label>
                <input type="text" value={writer} onChange={onWriteHandler} />

                <label>내용</label>
                <textarea value={contents} rows={5} cols={30} onChange={onContentsHandler}></textarea>

                <br />
                <button type="submit" onClick={onSubmitHandler}>저장</button>
                <button onClick={onClickGoToBoard}>목록으로</button>
            </form>
        </div >
    );
};

export default ModifyPage;