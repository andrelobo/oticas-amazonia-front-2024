// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import RegisterUserPage from './pages/RegisterUserPage';
import RegisterClientPage from './pages/RegisterClientPage';
import RegisterPurchasePage from './pages/RegisterPurchasePage';
import ClientListAllPage from './pages/ClientListAllPage';
import NavBar from './components/NavBar';

function App() {
    return (
        <Router>
            <div>
                <NavBar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register-user" element={<RegisterUserPage />} />
                    <Route path="/register-client" element={<RegisterClientPage />} />
                    <Route path="/register-purchase" element={<RegisterPurchasePage />} />
                    <Route path="/client-list" element={<ClientListAllPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
