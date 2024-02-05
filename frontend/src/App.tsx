import { Route, Routes, useNavigate } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { useEffect } from 'react';
import { useLocalStorage } from './lib/useLocalStorage';
import './styles/main.css';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                </Routes>
                <ToastContainer />
            </AuthContextProvider>
        </div>
    );
};

export default App;
