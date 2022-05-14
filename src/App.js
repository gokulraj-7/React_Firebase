import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import PostScreen from './screens/PostScreen';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import TeachersHome from './screens/TeachersHome';
import TeachersPostScreen from './screens/TeachersPostScreen';

function App() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);
            window.location.pathname = '/login';
        });
    };
    return (
        <Router>
            <nav>
                <h1 className="heading" style={{ fontVariant: 'small-caps' }}>
                    Student-Teachers DB
                </h1>
                <div className="navs">
                    <Link to="/">Student</Link>
                    <Link to="/teacherpostshow">Teachers</Link>

                    {!isAuth ? (
                        <Link to="/login">Login</Link>
                    ) : (
                        <>
                            <Link to="/post">Student-Details</Link>
                            <Link to="/teacherpost">Teachers-Details</Link>

                            <button className="button" onClick={signUserOut}>
                                Log-Out
                            </button>
                        </>
                    )}
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<HomeScreen isAuth={isAuth} />} />
                <Route path="/post" element={<PostScreen isAuth={isAuth} />} />
                <Route
                    path="/teacherpost"
                    element={<TeachersPostScreen isAuth={isAuth} />}
                />
                <Route
                    path="/teacherpostshow"
                    element={<TeachersHome isAuth={isAuth} />}
                />
                <Route
                    path="/login"
                    element={<LoginScreen setIsAuth={setIsAuth} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
