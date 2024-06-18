import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('https://zoe-be.onrender.com/api/clients');
        setClients(response.data.clients);
      } catch (error) {
        setError('Erro ao buscar os clientes');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-700">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-pastel-pink py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-black mb-8">Lista de Clientes</h1>
        <ul className="space-y-4">
          {clients.map(client => (
            <li key={client._id} className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-black">{client.name}</h2>
                <p className="text-black"><strong>Email:</strong> {client.email}</p>
                <p className="text-black"><strong>Telefone:</strong> {client.phone}</p>
                <p className="text-black"><strong>Número de Compras:</strong> {client.purchaseCount}</p>
              </div>
              <Link to={`/clients/${client._id}`} className="text-pastel-pink hover:text-black font-semibold">
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
