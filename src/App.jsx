import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import RegisterUserPage from './pages/RegisterUserPage';
import RegisterClientPage from './pages/RegisterClientPage';
import RegisterPurchasePage from './pages/RegisterPurchasePage';
import ClientListAllPage from './pages/ClientListAllPage';
import ClientDetailsPage from './pages/ClientDetailsPage';

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
          <Route path="/clients/:clientId" element={<ClientDetailsPage />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
