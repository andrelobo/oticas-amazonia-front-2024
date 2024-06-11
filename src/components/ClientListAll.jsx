import React, { useEffect, useState } from 'react';
import ClientCard from './ClientCard';
import EditClientCard from './EditClientCard';
import { Container, Typography, Button } from '@mui/material';
import AddClientCard from './AddClientCard';

const ClientListAll = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [addingClient, setAddingClient] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('https://zoe-be.onrender.com/api/clients');
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

  const handleAdd = async (newClient) => {
    try {
      const response = await fetch('https://zoe-be.onrender.com/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newClient)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao adicionar o cliente');
      }
      const addedClient = await response.json();
      setClients([...clients, addedClient]);
      setAddingClient(false);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <Typography className="text-center text-gray-700">Carregando...</Typography>;
  }

  if (error) {
    return <Typography className="text-center text-red-600">{error}</Typography>;
  }

  if (!clients || !clients.length) {
    return <Typography className="text-center text-gray-700">Não há clientes cadastrados.</Typography>;
  }

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#d957a9', fontWeight: 'bold' }}>
        Clientes
      </Typography>
      <Button variant="contained" sx={{ backgroundColor: '#d957a9', color: 'white', marginBottom: 2 }} onClick={() => setAddingClient(true)}>
        Adicionar Cliente
      </Button>
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
      {addingClient && (
        <AddClientCard
          onSave={handleAdd}
          onCancel={() => setAddingClient(false)}
        />
      )}
    </Container>
  );
};

export default ClientListAll;

