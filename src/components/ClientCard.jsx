// src/components/ClientCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClientCard = ({ client, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handlePurchases = () => {
    navigate(`/clients/${client._id}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-200">
      <div className="bg-[#ffd433] p-6">
        <h2 className="text-2xl font-semibold text-[#c69f56] mb-2">{client.name}</h2>
        <p className="text-gray-700 mb-1"><strong>Email:</strong> {client.email}</p>
        <p className="text-gray-700 mb-1"><strong>Telefone:</strong> {client.phone}</p>
        <div className="mt-4 flex justify-between">
          <button onClick={() => onEdit(client)} className="bg-[#c69f56] text-white px-4 py-2 rounded">Editar</button>
          <button onClick={() => onDelete(client._id)} className="bg-red-600 text-white px-4 py-2 rounded">Deletar</button>
          <button onClick={handlePurchases} className="bg-blue-600 text-white px-4 py-2 rounded">Compras</button>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
