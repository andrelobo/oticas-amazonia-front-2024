import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ClientDetails = ({ clientId }) => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`https://zoe-be.onrender.com/api/clients/${clientId}`);
        setClient(response.data.client);
      } catch (error) {
        setError('Erro ao buscar os detalhes do cliente');
      } finally {
        setLoading(false);
      }
    };

    const fetchPurchases = async () => {
      try {
        const response = await axios.get(`https://zoe-be.onrender.com/api/purchases/client/${clientId}`);
        setPurchases(response.data.purchases);
      } catch (error) {
        setError('Erro ao buscar as compras do cliente');
      }
    };

    fetchClient();
    fetchPurchases();
  }, [clientId]);

  const handleUpdatePurchaseStatus = async (purchaseId, currentStatus) => {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: `Deseja atualizar o status desta compra para ${currentStatus ? 'Não Pago' : 'Pago'}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, atualizar!'
    });

    if (result.isConfirmed) {
      try {
        await axios.put(`https://zoe-be.onrender.com/api/purchases/${purchaseId}`, {
          purchaseStatus: !currentStatus
        });
        setPurchases(purchases.map(purchase =>
          purchase._id === purchaseId ? { ...purchase, purchaseStatus: !currentStatus } : purchase
        ));
        Swal.fire(
          'Atualizado!',
          'O status da compra foi atualizado.',
          'success'
        );
      } catch (error) {
        Swal.fire(
          'Erro!',
          'Não foi possível atualizar o status da compra.',
          'error'
        );
      }
    }
  };

  if (loading) {
    return <p className="text-center text-gray-700">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  const purchaseCount = purchases.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f5] py-10">
      {client ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-[#d957a9] mb-4">{client.name}</h2>
          <p className="text-gray-700 mb-1"><strong>Email:</strong> {client.email}</p>
          <p className="text-gray-700 mb-1"><strong>Telefone:</strong> {client.phone}</p>
          <p className="text-gray-700 mb-1"><strong>Endereço:</strong> {client.address}</p>
          <p className="text-gray-700 mb-1"><strong>Status da Compra:</strong> {client.purchaseStatus ? 'Pago' : 'Não Pago'}</p>
          <p className="text-gray-700 mb-1"><strong>Número de Compras:</strong> {purchaseCount}</p>
          
          <h3 className="text-xl font-semibold text-[#d957a9] mt-4">Compras</h3>
          {purchases.length > 0 ? (
            <ul className="mt-2 space-y-4">
              {purchases.map(purchase => (
                <li key={purchase._id} className="bg-gray-100 p-4 rounded-lg shadow-sm flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-gray-700 mb-1"><strong>Data da Compra:</strong> {new Date(purchase.purchaseDate).toLocaleDateString('pt-BR')}</p>
                    <p className="text-gray-700 mb-1"><strong>Detalhes:</strong> {purchase.details}</p>
                    <p className="text-gray-700 mb-1"><strong>Valor Total:</strong> R${purchase.totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-700 mb-1 mr-2"><strong>Status da Compra:</strong></p>
                    <div className={`w-12 h-6 flex items-center rounded-full p-1 ${purchase.purchaseStatus ? 'bg-green-400' : 'bg-red-400'}`}>
                      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform ${purchase.purchaseStatus ? 'translate-x-6' : ''}`}></div>
                    </div>
                    <button
                      onClick={() => handleUpdatePurchaseStatus(purchase._id, purchase.purchaseStatus)}
                      className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      {purchase.purchaseStatus ? 'Marcar como Não Pago' : 'Marcar como Pago'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">Nenhuma compra encontrada</p>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-700">Cliente não encontrado</p>
      )}
    </div>
  );
};

export default ClientDetails;
