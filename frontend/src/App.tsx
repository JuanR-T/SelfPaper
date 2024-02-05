import { Route, Routes, useNavigate } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { useEffect } from 'react';
import { useLocalStorage } from './lib/useLocalStorage';
import './styles/main.css';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/dashboard/Dashboard';
import Publications from './pages/dashboard/Publications';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Publisher from './pages/dashboard/Publisher';
import Account from './pages/dashboard/Account';
import Themes from './pages/dashboard/Theme';

const App = () => {
    const { getItem } = useLocalStorage();
    const navigate = useNavigate();

    useEffect(() => {
        if (!getItem('token')) {
            navigate('/login');
        }
    }, []);

    return (
        <div>
            <AuthContextProvider>
                <Routes>
                    <Route index element={<Home />}></Route>
                    <Route path="login" element={<Login />}></Route>
                    <Route path="signup" element={<SignUp />}></Route>
                    <Route path="dashboard" element={<Dashboard />}>
                        <Route
                            path="publications"
                            element={<Publications />}
                        ></Route>
                        <Route path="publisher" element={<Publisher />}></Route>
                        <Route path="themes" element={<Themes />}></Route>
                        <Route path="account" element={<Account />}></Route>
                    </Route>
                </Routes>
                <ToastContainer />
            </AuthContextProvider>
        </div>
    );
};

export default App;
