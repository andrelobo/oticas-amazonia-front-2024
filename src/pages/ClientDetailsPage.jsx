// src/pages/ClientDetailsPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import ClientDetails from '../components/ClientDetails';

const ClientDetailsPage = () => {
  const { clientId } = useParams();
  return <ClientDetails clientId={clientId} />;
};

export default ClientDetailsPage;
