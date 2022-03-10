import * as React from "react";
import { Routes, Route } from "react-router-dom";

// sub page
import LandingPage from "../components/views/LandingPage/LandingPage";
import LoginPage from "../components/views/LoginPage/LoginPage";
import RegisterPage from "../components/views/RegisterPage/RegisterPage";
import ListPage from "../components/views/Board/ListPage/ListPage";
import WritePage from "../components/views/Board/WritePage/WritePage";
import ModifyPage from "../components/views/Board/ModifyPage/ModifyPage";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/board/list" element={<ListPage />} />
            <Route path="/board/write" element={<WritePage />} />
            <Route path="/board/modify" element={<ModifyPage />} />
        </Routes>
    );
}

export default Router;
