import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Message = ({ message, onClose }) => (
    <div className="fixed top-4 right-4 bg-gray-800 text-white border border-gray-700 p-4 rounded shadow-md">
        <p>{message}</p>
        <button onClick={onClose} className="ml-2 text-sm text-gray-400 hover:text-white focus:outline-none">
            Fechar
        </button>
    </div>
);

const RegisterPurchase = () => {
    const [clientId, setClientId] = useState('');
    const [clientName, setClientName] = useState('');
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [details, setDetails] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [purchaseStatus, setPurchaseStatus] = useState(false);
    const [purchaseDate, setPurchaseDate] = useState(new Date());
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('https://zoe-be.vercel.app/api/clients');
                setClients(response.data.clients);
            } catch (error) {
                console.error(error);
            }
        };
        fetchClients();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setClientName(value);
        if (value) {
            const filtered = clients.filter(client => client.name.toLowerCase().includes(value.toLowerCase()));
            setFilteredClients(filtered);
        } else {
            setFilteredClients([]);
        }
    };

    const handleClientSelect = (client) => {
        setClientId(client._id);
        setClientName(client.name);
        setFilteredClients([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!clientId || !details || !totalAmount || !purchaseDate) {
            setError('Todos os campos são obrigatórios');
            return;
        }

        try {
            const response = await axios.post('https://zoe-be.vercel.app/api/purchases', {
                clientId,
                details,
                totalAmount: parseFloat(totalAmount),
                purchaseDate: purchaseDate.toISOString(),
                purchaseStatus
            });
            console.log(response.data);

            setClientId('');
            setClientName('');
            setDetails('');
            setTotalAmount('');
            setPurchaseDate(new Date());
            setPurchaseStatus(false);

            showMessage('Compra cadastrada com sucesso!');
        } catch (error) {
            if (error.response) {
                console.error('Erro na resposta:', error.response.data);
                setError(error.response.data.message || 'Erro ao cadastrar compra');
            } else {
                console.error('Erro na solicitação:', error);
                setError('Erro ao cadastrar compra');
            }
        }
    };

    const handleToggleStatus = async () => {
        const updatedStatus = !purchaseStatus;
        setPurchaseStatus(updatedStatus);

        try {
            await axios.put(`https://zoe-be.vercel.app/api/purchases/${clientId}`, {
                purchaseStatus: updatedStatus
            });
            showMessage(`Status da compra atualizado para ${updatedStatus ? 'Pago' : 'Não Pago'}`);
        } catch (error) {
            console.error('Erro ao atualizar status da compra:', error);
            showMessage('Erro ao atualizar status da compra. Tente novamente.', true);
            setPurchaseStatus(!updatedStatus);
        }
    };

    const showMessage = (text) => {
        setMessage(text);
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm relative">
                <h2 className="text-2xl mb-4 text-white">Cadastro de Compra</h2>
                <input
                    type="text"
                    placeholder="Nome do Cliente"
                    value={clientName}
                    onChange={handleSearch}
                    className="mb-4 p-2 border border-gray-700 rounded w-full bg-gray-900 text-white placeholder-gray-400"
                />
                {filteredClients.length > 0 && (
                    <ul className="bg-gray-800 border border-gray-700 rounded max-h-40 overflow-y-auto">
                        {filteredClients.map(client => (
                            <li
                                key={client._id}
                                onClick={() => handleClientSelect(client)}
                                className="p-2 cursor-pointer hover:bg-gray-700 text-white"
                            >
                                {client.name}
                            </li>
                        ))}
                    </ul>
                )}
                <input
                    type="text"
                    placeholder="Detalhes da Compra"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="mb-4 p-2 border border-gray-700 rounded w-full bg-gray-900 text-white placeholder-gray-400"
                />
                <input
                    type="number"
                    placeholder="Valor Total"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    className="mb-4 p-2 border border-gray-700 rounded w-full bg-gray-900 text-white placeholder-gray-400"
                />
                <DatePicker
                    selected={purchaseDate}
                    onChange={(date) => setPurchaseDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="mb-4 p-2 border border-gray-700 rounded w-full bg-gray-900 text-white"
                />
                              
                {error && <p className="text-red-400 mb-4">{error}</p>}
                {message && <Message message={message} onClose={() => setMessage('')} />}
                <button type="submit" className="bg-black text-white py-2 px-4 rounded w-full">Cadastrar</button>
            </form>
        </div>
    );
};

export default RegisterPurchase;
