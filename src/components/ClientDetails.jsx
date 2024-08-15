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
        setError('Erro ao buscar detalhes do cliente');
      } finally {
        setLoading(false);
      }
    };

    const fetchPurchases = async () => {
      try {
        const response = await axios.get(`https://zoe-be.onrender.com/api/purchases/client/${clientId}`);
        setPurchases(response.data.purchases);
      } catch (error) {
        setError('Erro ao buscar compras do cliente');
      }
    };

    fetchClient();
    fetchPurchases();
  }, [clientId]);

  const handleUpdatePurchaseStatus = async (purchaseId, currentStatus) => {
    const result = await Swal.fire({
      title: 'Você tem certeza?',
      text: `Você quer mudar o status da compra para ${currentStatus ? 'Não Pago' : 'Pago'}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, atualize o status!'
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
          'O status da Compra foi atualizado!.',
          'success'
        );
      } catch (error) {
        Swal.fire(
          'Erro!',
          'Não foi possível atualizar o status!.',
          'error'
        );
      }
    }
  };

  if (loading) {
    return <p className="text-center text-gray-400">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 py-10">
      {client ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h2 className="text-xl text-pink-200 mb-4">{client.name}</h2>
              <p className="mb-1"><strong>Email:</strong> {client.email}</p>
              <p className="mb-1"><strong>Telefone:</strong> {client.phone}</p>
              <p className="mb-1"><strong>Endereço:</strong> {client.address}</p>
              <p className="mb-1"><strong>Status da Compra:</strong> {client.purchaseStatus ? 'Pago' : 'Não Pago'}</p>
              <p className="mb-1"><strong>Qtd de Compras:</strong> {purchases.length}</p>

              <h3 className="text-lg font-semibold text-pink-200 mt-4">Compras</h3>
              {purchases.length > 0 ? (
                <ul className="mt-2 space-y-4">
                  {purchases.map(purchase => (
                    <li key={purchase._id} className="bg-gray-700 p-4 rounded-lg shadow-sm flex flex-col">
                      <div className="flex-1">
                        <p className="mb-1"><strong>Data da Compra:</strong> {new Date(purchase.purchaseDate).toLocaleDateString('pt-BR')}</p>
                        <p className="mb-1"><strong>Detalhes:</strong> {purchase.details}</p>
                        <p className="mb-1"><strong>Total da Compra:</strong> R$ {purchase.totalAmount.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className={`w-12 h-6 flex items-center rounded-full p-1 ${purchase.purchaseStatus ? 'bg-green-500' : 'bg-red-500'}`}>
                          <div className={`bg-white w-4 h-4 rounded-full shadow-md transform ${purchase.purchaseStatus ? 'translate-x-6' : ''}`}></div>
                        </div>
                        <button
                          onClick={() => handleUpdatePurchaseStatus(purchase._id, purchase.purchaseStatus)}
                          className="ml-4 px-1 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          {purchase.purchaseStatus ? 'Marcar como Não Pago' : 'Marcar como Pago'}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Não foram encontradas Compras</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Cliente não encontrado</p>
      )}
    </div>
  );
};

export default ClientDetails;
