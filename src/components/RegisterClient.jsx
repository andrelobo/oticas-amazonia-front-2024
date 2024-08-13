// src/components/RegisterClient.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const RegisterClient = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://zoe-be.onrender.com/api/clients', {
                name,
                email,
                phone
            });
            console.log(response.data);

            // Exibe a mensagem de sucesso com SweetAlert2
            Swal.fire({
                title: 'Cliente registrado com sucesso!',
                text: 'Os dados foram salvos corretamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.error('Erro ao cadastrar:', error);

            // Exibe a mensagem de erro com SweetAlert2
            Swal.fire({
                title: 'Erro ao cadastrar',
                text: error.response?.data?.error || 'Ocorreu um erro ao tentar registrar o cliente.',
                icon: 'error',
                confirmButtonText: 'Tentar novamente'
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-pastel-pink">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-black">Cadastro de Cliente</h2>
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                />
                <input
                    type="text"
                    placeholder="Telefone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                />
                <button type="submit" className="bg-black text-white py-2 px-4 rounded w-full">Cadastrar</button>
            </form>
        </div>
    );
};

export default RegisterClient;
