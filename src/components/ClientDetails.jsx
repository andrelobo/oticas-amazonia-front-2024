import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClientDetails = ({ clientId }) => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`https://zoe-be.onrender.com/api/clients/${clientId}`);
        setClient(response.data.client); // Ajuste para pegar o cliente do objeto de resposta
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

  if (loading) {
    return <p className="text-center text-gray-700">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f5] py-10">
      {client ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-[#c69f56] mb-4">{client.name}</h2>
          <p className="text-gray-700 mb-1"><strong>Email:</strong> {client.email}</p>
          <p className="text-gray-700 mb-1"><strong>Telefone:</strong> {client.phone}</p>
          <p className="text-gray-700 mb-1"><strong>Endereço:</strong> {client.address}</p>
          <p className="text-gray-700 mb-1"><strong>Status da Compra:</strong> {client.purchaseStatus ? 'Pago' : 'Não Pago'}</p>
          <p className="text-gray-700 mb-1"><strong>Número de Compras:</strong> {client.purchaseCount}</p>
          
          <h3 className="text-xl font-semibold text-[#c69f56] mt-4">Compras</h3>
          {purchases.length > 0 ? (
            <ul className="mt-2">
              {purchases.map(purchase => (
                <li key={purchase._id} className="text-gray-700 mb-4">
                  <strong>Detalhes:</strong> {purchase.details}<br />
                  <strong>Valor Total:</strong> {purchase.totalAmount}<br />
                  <strong>Data da Compra:</strong> {new Date(purchase.purchaseDate).toLocaleDateString('pt-BR')}<br />
                  <strong>Status da Compra:</strong> {purchase.purchaseStatus ? 'Pago' : 'Não Pago'}
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
