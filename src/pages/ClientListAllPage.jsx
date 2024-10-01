import React, { useEffect, useState } from 'react';
import ClientCard from '../components/ClientCard';
import EditClientModal from '../components/EditClientModal';

const ClientListAllPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingClient, setEditingClient] = useState(null);

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

        const response = await fetch('https://oticaamazoniabackend.vercel.app/

api/clients', {
          headers: {
            Authorization: `Bearer ${token}`, // Incluindo o token no cabeçalho
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar os clientes');
        }

        const data = await response.json();
        setClients(data.clients);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleEdit = (client) => {
    setEditingClient(client);
  };

  const handleDelete = async (id) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Unauthorized: Token not found');
      }

      const response = await fetch(`https://oticaamazoniabackend.vercel.app/

api/clients/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Incluindo o token no cabeçalho
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar o cliente');
      }

      setClients(clients.filter((client) => client._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSave = async (updatedClient) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Unauthorized: Token not found');
      }

      const response = await fetch(`https://oticaamazoniabackend.vercel.app/

api/clients/${updatedClient._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Incluindo o token no cabeçalho
        },
        body: JSON.stringify(updatedClient),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar o cliente');
      }

      const updatedData = await response.json();
      setClients(clients.map((client) => (client._id === updatedData._id ? updatedData : client)));
      setEditingClient(null);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-400">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-900 py-10">
      <h5 className="text-2xl text-white mb-10">Lista de Clientes</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
        {clients.map((client) => (
          <ClientCard key={client._id} client={client} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
      {editingClient && (
        <EditClientModal
          client={editingClient}
          onSave={handleSave}
          onCancel={() => setEditingClient(null)}
        />
      )}
    </div>
  );
};

export default ClientListAllPage;
