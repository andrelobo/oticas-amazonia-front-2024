// src/components/RegisterPurchase.js
import React, { useState } from 'react';
import axios from 'axios';

const RegisterPurchase = () => {
    const [clientId, setClientId] = useState('');
    const [product, setProduct] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:7778/api/purchases', { clientId, product, amount });
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
                    placeholder="ID do Cliente"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                />
                <input
                    type="text"
                    placeholder="Produto"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                />
                <input
                    type="number"
                    placeholder="Quantidade"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                />
                <button type="submit" className="bg-black text-white py-2 px-4 rounded w-full">Cadastrar</button>
            </form>
        </div>
    );
};

export default RegisterPurchase;
