import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para obter o token do localStorage
  const getToken = () => {
    return localStorage.getItem('token');
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = getToken();
        if (!token) {
          throw new Error('Unauthorized: Token not found');
        }

        const response = await axios.get('https://oticaamazoniabackend.vercel.app/

api/clients', {
          headers: {
            Authorization: `Bearer ${token}`, // Incluindo o token no cabeçalho
          },
        });
        setClients(response.data.clients);
      } catch (error) {
        setError('Erro ao buscar clientes');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return <p className="text-center text-white">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-green-900 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-white mb-8">Lista de Clientes</h1>
        <ul className="space-y-4">
          {clients.map(client => (
            <li key={client._id} className="bg-green-800 p-6 rounded-lg shadow-lg flex items-center justify-between">
              <div>
                <h2 className="text-2xl text-white mb-2">{client.name}</h2>
                <p className="text-white mb-1"><strong>Email:</strong> {client.email}</p>
                <p className="text-white mb-1"><strong>Telefone:</strong> {client.phone}</p>
                <p className="text-white mb-1"><strong>Qtd de Compras:</strong> {client.purchaseCount}</p>
              </div>
              <Link to={`/clients/${client._id}`} className="text-green-300 hover:text-white font-semibold">
                Ver Detalhes
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClientList;
