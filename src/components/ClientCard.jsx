import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClientCard = ({ client, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handlePurchases = () => {
    navigate(`/clients/${client._id}`);
  };

  return (
    <div className="bg-amazon-green-dark text-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-200">
      <div className="bg-amazon-green-light p-6">
        <h2 className="text-2xl text-white mb-2">{client.name}</h2>
        <p className="text-white mb-1"><strong>Email:</strong> {client.email}</p>
        <p className="text-white mb-1"><strong>Telefone:</strong> {client.phone}</p>
        <div className="mt-4 flex justify-between space-x-2">
          <button
            onClick={() => onEdit(client)}
            className="bg-amazon-green text-white px-2 py-1 rounded hover:bg-amazon-green-light transition-colors duration-200"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(client._id)}
            className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors duration-200"
          >
            Deletar
          </button>
          <button
            onClick={handlePurchases}
            className="bg-amazon-green-dark text-white px-2 py-1 rounded hover:bg-amazon-green transition-colors duration-200"
          >
            Compras
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
