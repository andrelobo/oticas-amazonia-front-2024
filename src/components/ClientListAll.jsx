import React, { useEffect, useState } from 'react';
import ClientCard from './ClientCard';
import EditClientCard from './EditClientCard';

const ClientListAll = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingClient, setEditingClient] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('https://zoe-be.onrender.com/api/clients');
        if (!response.ok) {
          throw new Error('Erro ao buscar os clientes');
        }
        const data = await response.json();
        if (!Array.isArray(data.clients)) {
          throw new Error('A resposta da API não é um array');
        }
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
      const response = await fetch(`https://zoe-be.onrender.com/api/clients/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar o cliente');
      }
      setClients(clients.filter(client => client._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSave = async (updatedClient) => {
    try {
      const response = await fetch(`https://zoe-be.onrender.com/api/clients/${updatedClient._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedClient)
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar o cliente');
      }
      const updatedData = await response.json();
      setClients(clients.map(client => client._id === updatedData._id ? updatedData : client));
      setEditingClient(null);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-700">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f5] py-10">
      <h1 className="text-4xl font-bold text-[#c69f56] mb-10">Lista de Clientes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
        {clients.map(client => (
          <ClientCard
            key={client._id}
            client={client}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {editingClient && (
        <EditClientCard
          client={editingClient}
          onSave={handleSave}
          onCancel={() => setEditingClient(null)}
        />
      )}
    </div>
  );
};

export default ClientListAll;
