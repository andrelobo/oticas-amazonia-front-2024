import React, { useState } from 'react';

const EditClientCard = ({ client, onSave, onCancel }) => {
  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [phone, setPhone] = useState(client.phone);
  const [address, setAddress] = useState(client.address);
  const [purchaseStatus, setPurchaseStatus] = useState(client.purchaseStatus);
  const [purchaseCount, setPurchaseCount] = useState(client.purchaseCount);

  const handleSave = () => {
    onSave({
      ...client,
      name,
      email,
      phone,
      address,
      purchaseStatus,
      purchaseCount,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl text-pink-200 mb-4">Editar Cliente</h2>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Nome</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Telefone</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Endereço</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Status da Compra</label>
          <select
            className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white"
            value={purchaseStatus}
            onChange={(e) => setPurchaseStatus(e.target.value)}
          >
            <option value={true}>Pago</option>
            <option value={false}>Não Pago</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Número de Compras</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white"
            value={purchaseCount}
            onChange={(e) => setPurchaseCount(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded mr-2 hover:bg-gray-500 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-300 transition-colors duration-200"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditClientCard;
