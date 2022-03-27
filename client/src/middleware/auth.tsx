import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { WrapperTooltipProps } from "antd/lib/form/FormItemLabel";

function Auth(SpecificComponent: React.ComponentType, option?: boolean, adminRoute: boolean = null): Function {
    // adminRoute
    // null => 아무나 출입이 가능한 페이지
    // true => 로그인한 유저만 출입 가능한 페이지
    // false => 로그인한 유저는 출입 불가능한 페이지

    function AuthenticationCheck(): JSX.Element {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const [authUser, setAuthUser] = useState();

        useEffect(() => {
            dispatch(auth()).then((response) => {
                // 로그인 하지 않은 상태
                if (!response.payload.isAuth) {
                    if (option) {
                        navigate("/login");
                    }
                } else {
                    // 로그인 한 상태 - 관리자
                    if (adminRoute && !response.payload.isAdmin) {
                        navigate("/");
                    }
                    else { // 로그인 한 상태 - 회원
                        if (!option) {
                            navigate("/");
                            // setAuthUser(response.payload);
                        }
                    }
                }
            });
        }, []);

        return <SpecificComponent {...authUser} />;
    }

    return AuthenticationCheck;
}

export default Auth;
