import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Message = ({ message, onClose }) => (
    <div className="fixed top-4 right-4 bg-white border border-gray-300 p-4 rounded shadow-md">
        <p className="text-gray-800">{message}</p>
        <button onClick={onClose} className="ml-2 text-sm text-gray-600 hover:text-gray-800 focus:outline-none">
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
                const response = await axios.get('https://zoe-be.onrender.com/api/clients');
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
            const response = await axios.post('https://zoe-be.onrender.com/api/purchases', {
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
            await axios.put(`https://zoe-be.onrender.com/api/purchases/${clientId}`, {
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
        <div className="flex justify-center items-center min-h-screen bg-pastel-pink">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm relative">
                <h2 className="text-2xl font-bold mb-4 text-black">Cadastro de Compra</h2>
                <input
                    type="text"
                    placeholder="Nome do Cliente"
                    value={clientName}
                    onChange={handleSearch}
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                />
                {filteredClients.length > 0 && (
                    <ul className="bg-white border border-gray-300 rounded max-h-40 overflow-y-auto">
                        {filteredClients.map(client => (
                            <li
                                key={client._id}
                                onClick={() => handleClientSelect(client)}
                                className="p-2 cursor-pointer hover:bg-gray-200"
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
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                />
                <input
                    type="number"
                    placeholder="Valor Total"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                />
                <DatePicker
                    selected={purchaseDate}
                    onChange={(date) => setPurchaseDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                />
                <label className="flex items-center mb-4 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={purchaseStatus}
                        onChange={handleToggleStatus}
                        className="mr-2"
                    />
                    Status de Pagamento
                </label>
                <div onClick={handleToggleStatus} className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${purchaseStatus ? 'bg-green-400' : 'bg-red-400'}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform ${purchaseStatus ? 'translate-x-6' : ''}`}></div>
                </div>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                {message && <Message message={message} onClose={() => setMessage('')} />}
                <button type="submit" className="bg-black text-white py-2 px-4 rounded w-full">Cadastrar</button>
            </form>
        </div>
    );
};

export default RegisterPurchase;
