import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import ListPage from './components/views/Board/ListPage/ListPage';
import WritePage from './components/views/Board/WritePage/WritePage';
import DetailPage from './components/views/Board/DetailPage/DetailPage';
import ModifyPage from './components/views/Board/ModifyPage/ModifyPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/board/list" element={<ListPage />} />
                <Route path="/board/write" element={<WritePage />} />
                <Route path="/board/detail" element={<DetailPage />} />
                <Route path="/board/modify" element={<ModifyPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
