import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate(); // v5 이상
    const onClickHandler = (event) => {
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

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <h2>시작페이지</h2>

            <button onClick={onClickHandler}>로그아웃</button>
        </div>
    );
}

export default LandingPage;