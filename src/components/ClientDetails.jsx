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
        setError('Error fetching client details');
      } finally {
        setLoading(false);
      }
    };

    const fetchPurchases = async () => {
      try {
        const response = await axios.get(`https://zoe-be.onrender.com/api/purchases/client/${clientId}`);
        setPurchases(response.data.purchases);
      } catch (error) {
        setError('Error fetching client purchases');
      }
    };

    fetchClient();
    fetchPurchases();
  }, [clientId]);

  const handleUpdatePurchaseStatus = async (purchaseId, currentStatus) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to mark this purchase as ${currentStatus ? 'Unpaid' : 'Paid'}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
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
          'Updated!',
          'The purchase status has been updated.',
          'success'
        );
      } catch (error) {
        Swal.fire(
          'Error!',
          'Unable to update purchase status.',
          'error'
        );
      }
    }
  };

  if (loading) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 py-10">
      {client ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold text-pink-400 mb-4">{client.name}</h2>
          <p className="mb-1"><strong>Email:</strong> {client.email}</p>
          <p className="mb-1"><strong>Phone:</strong> {client.phone}</p>
          <p className="mb-1"><strong>Address:</strong> {client.address}</p>
          <p className="mb-1"><strong>Purchase Status:</strong> {client.purchaseStatus ? 'Paid' : 'Unpaid'}</p>
          <p className="mb-1"><strong>Number of Purchases:</strong> {purchases.length}</p>

          <h3 className="text-lg font-semibold text-pink-400 mt-4">Purchases</h3>
          {purchases.length > 0 ? (
            <ul className="mt-2 space-y-4">
              {purchases.map(purchase => (
                <li key={purchase._id} className="bg-gray-700 p-4 rounded-lg shadow-sm flex items-center justify-between">
                  <div className="flex-1">
                    <p className="mb-1"><strong>Purchase Date:</strong> {new Date(purchase.purchaseDate).toLocaleDateString('en-US')}</p>
                    <p className="mb-1"><strong>Details:</strong> {purchase.details}</p>
                    <p className="mb-1"><strong>Total Amount:</strong> ${purchase.totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="mr-2"><strong>Status:</strong></p>
                    <div className={`w-12 h-6 flex items-center rounded-full p-1 ${purchase.purchaseStatus ? 'bg-green-500' : 'bg-red-500'}`}>
                      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform ${purchase.purchaseStatus ? 'translate-x-6' : ''}`}></div>
                    </div>
                    <button
                      onClick={() => handleUpdatePurchaseStatus(purchase._id, purchase.purchaseStatus)}
                      className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      {purchase.purchaseStatus ? 'Mark as Unpaid' : 'Mark as Paid'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No purchases found</p>
          )}
        </div>
      ) : (
        <p className="text-center">Client not found</p>
      )}
    </div>
  );
};

export default ClientDetails;
