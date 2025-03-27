import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login.jsx';
import ToHomePage from './components/ToHomePage.jsx';
import Header from './components/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import PresentationPage from './pages/PresentationPage.jsx';

function App() {
    const user = useSelector((state) => state.user.name);
    if (!user) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={<ToHomePage />} />
                </Routes>
            </BrowserRouter>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Header />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/presentation/:id" element={<PresentationPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
