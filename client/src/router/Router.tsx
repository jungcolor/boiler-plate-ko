import * as React from "react";
import { Routes, Route } from "react-router-dom";

// sub page
import ViewLanding from "../components/views/ViewLanding";
import ViewUserLogin from "../components/views/Users/ViewUserLogin";
import RegisterPage from "../components/views/Users/ViewUserRegister";
import ViewBoardList from "../components/views/Boards/ViewBoardList";
import WriteBoardPage from "../components/views/Boards/WriteBoardPage";
import ViewBoardModify from "../components/views/Boards/ViewBoardModify";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<ViewLanding />} />
            <Route path="/user/login" element={<ViewUserLogin />} />
            <Route path="/user/register" element={<RegisterPage />} />
            <Route path="/board/list" element={<ViewBoardList />} />
            <Route path="/board/write" element={<WriteBoardPage />} />
            <Route path="/board/modify" element={<ViewBoardModify />} />
        </Routes>
    );
}

export default Router;
