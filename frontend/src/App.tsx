import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { AuthContextProvider } from './context/AuthContext';

const App = () => {
    return (
        <div>
            <AuthContextProvider>
                <Routes>
                    <Route index element={<Home />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                </Routes>
            </AuthContextProvider>
        </div>
    );
};

export default App;
