import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { boardWrite } from '../../../../_actions/user_actions';
import { useNavigate } from 'react-router-dom';

function WritePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');
    const [contents, setContents] = useState('');


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

        let body = {
            title: title,
            writer: writer,
            contents: contents,
            writeDate: dateFormat()
        }

        dispatch(boardWrite(body))
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

    const onClickHandler = (event) => {
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
                <textarea rows={5} cols={30} onChange={onContentsHandler}></textarea>

                <br />
                <button type="submit" onClick={onSubmitHandler}>확인</button>
                <button onClick={onClickHandler}>목록으로</button>
            </form>
        </div >
    );
}

export default WritePage;