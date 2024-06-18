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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-[#d957a9] mb-4">Editar Cliente</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nome</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Telefone</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Endereço</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Status da Compra</label>
          <select
            className="w-full px-4 py-2 border rounded-lg"
            value={purchaseStatus}
            onChange={(e) => setPurchaseStatus(e.target.value)}
          >
            <option value={true}>Pago</option>
            <option value={false}>Não Pago</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Número de Compras</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg"
            value={purchaseCount}
            onChange={(e) => setPurchaseCount(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancelar</button>
          <button onClick={handleSave} className="bg-[#d957a9] text-white px-4 py-2 rounded">Salvar</button>
        </div>
      </div>
    </div>
  );
};

export default EditClientCard;
