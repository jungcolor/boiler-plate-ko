import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Auth from "../../middleware/auth";
import ControlButton from "../controls/ControlButton";

function ViewLanding() {
    const navigate = useNavigate(); // v5 이상

    const onClickLogout = (event: React.MouseEvent<HTMLButtonElement>): void => {
        axios.get("/api/users/logout").then((response) => {
            if (response.data.success) {
                navigate("/user/login");
            } else {
                alert("로그아웃 하는데 실패했습니다.");
            }
        });
    };

    return (
        <div>
            <h2>메인페이지</h2>
            <ControlButton clickHandler={onClickLogout} label="로그아웃" id="logout" />
        </div>
    );
}

export default Auth(ViewLanding, null);
