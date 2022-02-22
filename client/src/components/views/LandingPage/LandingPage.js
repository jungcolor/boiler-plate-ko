import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';

function LandingPage() {
    const navigate = useNavigate(); // v5 이상

    const onClickLogout = (event) => {
        axios.get('/api/users/logout')
            .then(response => {
                if (response.data.success) {
                    navigate('/login');
                }
                else {
                    alert('로그아웃 하는데 실패했습니다.');
                }
            });
    }

    const onClickGoToList = (event) => {
        navigate('/board/list');
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <h2>메인페이지</h2>

            {/* <button id="board" onClick={onClickGoToList}>게시판이동</button>
            <button id="logout" onClick={onClickLogout}>로그아웃</button> */}
        </div>
    );
}

export default Auth(LandingPage, null);