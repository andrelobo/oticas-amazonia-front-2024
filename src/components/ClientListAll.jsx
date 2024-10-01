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
        const response = await fetch('https://oticaamazoniabackend.vercel.app/api/clients');
        if (!response.ok) {
          throw new Error('Error fetching clients');
        }
        const data = await response.json();
        if (!Array.isArray(data.clients)) {
          throw new Error('API response is not an array');
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
      const response = await fetch(`https://oticaamazoniabackend.vercel.app/api/clients/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error deleting client');
      }
      setClients(clients.filter(client => client._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSave = async (updatedClient) => {
    try {
      const response = await fetch(`https://oticaamazoniabackend.vercel.app/api/clients/${updatedClient._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedClient)
      });
      if (!response.ok) {
        throw new Error('Error updating client');
      }
      const updatedData = await response.json();
      setClients(clients.map(client => client._id === updatedData._id ? updatedData : client));
      setEditingClient(null);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center py-10">
      <h1 className="text-4xl font-bold text-pink-200 mb-10">Client List</h1>
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
