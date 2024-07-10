import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiContextProvider } from './context/ApiContext';
import { AuthContextProvider } from './context/AuthContext';
import { useLocalStorage } from './lib/useLocalStorage';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Account from './pages/dashboard/Account';
import Books from './pages/dashboard/Books';
import Dashboard from './pages/dashboard/Dashboard';
import Publications from './pages/dashboard/Publications';
import Publisher from './pages/dashboard/Publisher';
import Themes from './pages/dashboard/Theme';
import './styles/main.css';

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
                <ApiContextProvider>
                    <Routes>
                        <Route path="login" element={<Login />}></Route>
                        <Route path="signup" element={<SignUp />}></Route>
                        <Route index element={<Home />}></Route>
                        <Route path="dashboard" element={<Dashboard />}>
                            <Route
                                path="publications"
                                element={<Publications />}
                            ></Route>
                            <Route path="books" element={<Books />}></Route>
                            <Route path="publisher" element={<Publisher />}></Route>
                            <Route path="themes" element={<Themes />}></Route>
                            <Route path="account" element={<Account />}></Route>
                        </Route>
                    </Routes>
                </ApiContextProvider>
                <ToastContainer />
            </AuthContextProvider>
        </div>
    );
};

export default App;
