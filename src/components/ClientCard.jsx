import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClientCard = ({ client, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handlePurchases = () => {
    navigate(`/clients/${client._id}`);
  };

  return (
    <div className="bg-gray-800 text-gray-100 shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-200">
      <div className="bg-gray-700 p-6">
        <h2 className="text-2xl text-pink-400 mb-2">{client.name}</h2>
        <p className="text-gray-200 mb-1"><strong>Email:</strong> {client.email}</p>
        <p className="text-gray-200 mb-1"><strong>Telefone:</strong> {client.phone}</p>
        <div className="mt-4 flex justify-between space-x-2">
          <button
            onClick={() => onEdit(client)}
            className="bg-gray-900 text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors duration-200"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(client._id)}
            className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors duration-200"
          >
            Delete
          </button>
          <button
            onClick={handlePurchases}
            className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Compras
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
