import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import ListPage from './components/views/Board/list/ListPage';
import WritePage from './components/views/Board/write/WritePage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/Board/ListPage" element={<ListPage />} />
                <Route path="/Board/WritePage" element={<WritePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
