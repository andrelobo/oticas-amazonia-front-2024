// src/pages/ClientListPage.jsx
import React from 'react';
import ClientList from '../components/ClientList';

const ClientListPage = ({ status }) => {
    return (
        <div>
            <ClientList status={status} />
        </div>
    );
};

export default ClientListPage;
