import React, { useState, useEffect } from 'react';

const EditClientModal = ({ client, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purchaseStatus: false,
    purchaseCount: 0,
  });

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || '',
        email: client.email || '',
        phone: client.phone || '',
        purchaseStatus: client.purchaseStatus || false,
        purchaseCount: client.purchaseCount || 0,
      });
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...client, ...formData });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-green-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-4">Editar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-600 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-600 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Telefone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-600 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Status da Compra</label>
            <input
              type="checkbox"
              name="purchaseStatus"
              checked={formData.purchaseStatus}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Número de Compras</label>
            <input
              type="number"
              name="purchaseCount"
              value={formData.purchaseCount}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-600 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-600 text-white px-4 py-2 rounded mr-2 hover:bg-gray-500 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[#2d6a4f] text-white px-4 py-2 rounded hover:bg-[#1f4d40] transition-colors duration-200"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClientModal;
