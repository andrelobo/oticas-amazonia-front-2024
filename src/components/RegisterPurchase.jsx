import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from 'date-fns';

const RegisterPurchase = () => {
    const [clientId, setClientId] = useState('');
    const [clientName, setClientName] = useState('');
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [details, setDetails] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [purchaseStatus, setPurchaseStatus] = useState(false);
    const [purchaseDate, setPurchaseDate] = useState(new Date());

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
        try {
            const response = await axios.post('https://zoe-be.onrender.com/api/purchases', {
                client: clientId,
                details,
                totalAmount: parseFloat(totalAmount),
                purchaseDate: purchaseDate.toISOString(),
                purchaseStatus
            });
            console.log(response.data);
            // Redirecione ou mostre mensagem de sucesso
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-pastel-pink">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
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
                <label className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        checked={purchaseStatus}
                        onChange={(e) => setPurchaseStatus(e.target.checked)}
                        className="mr-2"
                    />
                    Status de Pagamento
                </label>
                <button type="submit" className="bg-black text-white py-2 px-4 rounded w-full">Cadastrar</button>
            </form>
        </div>
    );
};

export default RegisterPurchase;
