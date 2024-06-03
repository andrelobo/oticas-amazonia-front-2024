// src/components/ClientList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Função para obter dados dos clientes
        const fetchClients = async () => {
            const token = localStorage.getItem('token'); // Supondo que o token está armazenado no localStorage
            try {
                const response = await axios.get('https://zoe-be.onrender.com/api/clients', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setClients(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro ao carregar clientes: {error.message}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Nome</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Status da Compra</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client._id}>
                            <td className="py-2 px-4 border-b">{client.name}</td>
                            <td className="py-2 px-4 border-b">{client.email}</td>
                            <td className="py-2 px-4 border-b">
                                {client.purchaseStatus ? (
                                    <span className="text-green-600">Compra Paga</span>
                                ) : (
                                    <span className="text-red-600">Compra Não Paga</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientList;
