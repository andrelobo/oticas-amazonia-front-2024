import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Message = ({ message, onClose }) => (
    <div className="fixed top-4 right-4 bg-gray-800 text-white border border-gray-700 p-4 rounded shadow-md">
        <p>{message}</p>
        <button onClick={onClose} className="ml-2 text-xs text-gray-400 hover:text-white focus:outline-none">
            Fechar
        </button>
    </div>
);

const RegisterPurchase = () => {
    // Estado do formulário
    const [formData, setFormData] = useState({
        client: '',
        purchaseDate: '',
        endereco: {
            rua: '',
            bairro: '',
            cidade: ''
        },
        cpf: '',
        paymentMethod: '',
        oculos: {
            longe: {
                od: { esferico: '', cilindrico: '', eixo: '' },
                oe: { esferico: '', cilindrico: '', eixo: '' }
            },
            perto: {
                od: { esferico: '', cilindrico: '', eixo: '' },
                oe: { esferico: '', cilindrico: '', eixo: '' }
            }
        },
        armacaoRF: '',
        lenteRF: '',
        outros: '',
        totalAmount: '',
        sinal: 0,
        purchaseStatus: false
    });

    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    // Função para lidar com mudanças nos campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Atualiza o estado baseado na hierarquia do campo
        if (name.startsWith('endereco.')) {
            const field = name.split('.')[1];
            setFormData(prevState => ({
                ...prevState,
                endereco: {
                    ...prevState.endereco,
                    [field]: value
                }
            }));
        } else if (name.startsWith('oculos.')) {
            const parts = name.split('.');
            setFormData(prevState => ({
                ...prevState,
                oculos: {
                    ...prevState.oculos,
                    [parts[1]]: {
                        ...prevState.oculos[parts[1]],
                        [parts[2]]: {
                            ...prevState.oculos[parts[1]][parts[2]],
                            [parts[3]]: value
                        }
                    }
                }
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    // Função para registrar a compra
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // Aqui você pode adicionar a lógica para registrar a compra
            // Exemplo: await api.post('/registrar', formData);

            setMessage("Registro bem-sucedido!");
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'A compra foi registrada com sucesso!',
            });

            // Limpar campos após o registro
            setFormData({
                client: '',
                purchaseDate: '',
                endereco: {
                    rua: '',
                    bairro: '',
                    cidade: ''
                },
                cpf: '',
                paymentMethod: '',
                oculos: {
                    longe: {
                        od: { esferico: '', cilindrico: '', eixo: '' },
                        oe: { esferico: '', cilindrico: '', eixo: '' }
                    },
                    perto: {
                        od: { esferico: '', cilindrico: '', eixo: '' },
                        oe: { esferico: '', cilindrico: '', eixo: '' }
                    }
                },
                armacaoRF: '',
                lenteRF: '',
                outros: '',
                totalAmount: '',
                sinal: 0,
                purchaseStatus: false
            });
        } catch (err) {
            setError("Erro ao registrar a compra!");
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Ocorreu um erro ao registrar a compra.',
            });
        }
    };

    return (
        <div className="p-6 bg-gray-50 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Registrar Compra</h2>
            <form onSubmit={handleRegister}>
                {/* Informações do Cliente */}
                <div className="mb-4">
                    <label className="block mb-1">Cliente:</label>
                    <input
                        type="text"
                        name="client"
                        value={formData.client}
                        onChange={handleChange}
                        required
                        className="p-2 border rounded w-full text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Data da Compra:</label>
                    <input
                        type="date"
                        name="purchaseDate"
                        value={formData.purchaseDate}
                        onChange={handleChange}
                        required
                        className="p-2 border rounded w-full text-sm"
                    />
                </div>

                {/* Endereço */}
                <div className="mb-4">
                    <label className="block mb-1">Endereço:</label>
                    <div className="grid grid-cols-3 gap-2">
                        <input
                            type="text"
                            name="endereco.rua"
                            placeholder="Rua"
                            value={formData.endereco.rua}
                            onChange={handleChange}
                            className="p-2 border rounded w-full text-sm"
                        />
                        <input
                            type="text"
                            name="endereco.bairro"
                            placeholder="Bairro"
                            value={formData.endereco.bairro}
                            onChange={handleChange}
                            className="p-2 border rounded w-full text-sm"
                        />
                        <input
                            type="text"
                            name="endereco.cidade"
                            placeholder="Cidade"
                            value={formData.endereco.cidade}
                            onChange={handleChange}
                            className="p-2 border rounded w-full text-sm"
                        />
                    </div>
                </div>

                {/* CPF */}
                <div className="mb-4">
                    <label className="block mb-1">CPF:</label>
                    <input
                        type="text"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        className="p-2 border rounded w-full text-sm"
                    />
                </div>

                {/* Método de Pagamento */}
                <div className="mb-4">
                    <label className="block mb-1">Método de Pagamento:</label>
                    <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        required
                        className="p-2 border rounded w-full text-sm"
                    >
                        <option value="">Selecione</option>
                        <option value="Cartão">Cartão</option>
                        <option value="Boleto">Boleto</option>
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Transferência">Transferência</option>
                        <option value="Pix">Pix</option>
                    </select>
                </div>

                {/* Prescrição dos Óculos */}
                <div className="mb-4 border p-4 rounded-md bg-gray-100">
                    <h3 className="text-lg font-semibold mb-2">Prescrição dos Óculos</h3>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <h4 className="text-md font-semibold">Visão de Longe</h4>
                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <h5 className="text-sm font-semibold">Olho Direito (OD)</h5>
                                    <input
                                        type="text"
                                        name="oculos.longe.od.esferico"
                                        placeholder="Esférico"
                                        value={formData.oculos.longe.od.esferico}
                                        onChange={handleChange}
                                        className="p-2 border rounded w-full text-xs"
                                    />
                                    <input
                                        type="text"
                                        name="oculos.longe.od.cilindrico"
                                        placeholder="Cilíndrico"
                                        value={formData.oculos.longe.od.cilindrico}
                                        onChange={handleChange}
                                        className="p-2 border rounded w-full text-xs"
                                    />
                                    <input
                                        type="text"
                                        name="oculos.longe.od.eixo"
                                        placeholder="Eixo"
                                        value={formData.oculos.longe.od.eixo}
                                        onChange={handleChange}
                                        className="p-2 border rounded w-full text-xs"
                                    />
                                </div>
                                <div>
                                    <h5 className="text-sm font-semibold">Olho Esquerdo (OE)</h5>
                                    <input
                                        type="text"
                                        name="oculos.longe.oe.esferico"
                                        placeholder="Esférico"
                                        value={formData.oculos.longe.oe.esferico}
                                        onChange={handleChange}
                                        className="p-2 border rounded w-full text-xs"
                                    />
                                    <input
                                        type="text"
                                        name="oculos.longe.oe.cilindrico"
                                        placeholder="Cilíndrico"
                                        value={formData.oculos.longe.oe.cilindrico}
                                        onChange={handleChange}
                                        className="p-2 border rounded w-full text-xs"
                                    />
                                    <input
                                        type="text"
                                        name="oculos.longe.oe.eixo"
                                        placeholder="Eixo"
                                        value={formData.oculos.longe.oe.eixo}
                                        onChange={handleChange}
                                        className="p-2 border rounded w-full text-xs"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-md font-semibold">Visão de Perto</h4>
                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <h5 className="text-sm font-semibold">Olho Direito (OD)</h5>
                                    <input
                                        type="text"
                                        name="oculos.perto.od.esferico"
                                        placeholder="Esférico"
                                        value={formData.oculos.perto.od.esferico}
                                        onChange={handleChange}
                                        className="p-2 border rounded w-full text-xs"
                                    />
                                    <input
                                        type="text"
                                        name="oculos.perto.od.cilindrico"
                                        placeholder="Cilíndrico"
                                        value={formData.oculos.perto.od.cilindrico}
                                        onChange={handleChange}
                                        className="p-2 border rounded w-full text-xs"
                                    />
                                    <input
                                        type="text"
                                        name="oculos.perto.od.eixo"
                                        placeholder="Eixo"
                                        value={formData.oculos.perto.od.eixo}
                                        onChange={handleChange}
                                        className="p-2 border rounded w-full text-xs"
                                    />
                                </div>
                                <div>
                                    <h5 className="text-sm font-semibold">Olho Esquerdo (OE)</h5>
                                    <input
                                        type="text"
                                        name="oculos.perto.oe.esferico"
                                        placeholder="Esférico"
                                        value={formData.oculos.perto.oe.esferico}
                                        onChange={handleChange}
                                        className="p-2 border rounded w-full text-xs"
                                    />
                                    <input
                                        type="text"
                                        name="oculos.perto.oe.cilindrico"
                                        placeholder="Cilíndrico"
                                        value={formData.oculos.perto.oe.cilindrico}
                                        onChange={handleChange}
                                        className="p-2 border rounded w-full text-xs"
                                    />
                                    <input
                                        type="text"
                                        name="oculos.perto.oe.eixo"
                                        placeholder="Eixo"
                                        value={formData.oculos.perto.oe.eixo}
                                        onChange={handleChange}
                                        className="p-2 border rounded w-full text-xs"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Outros Campos */}
                <div className="mb-4">
                    <label className="block mb-1">Armação RF:</label>
                    <input
                        type="text"
                        name="armacaoRF"
                        value={formData.armacaoRF}
                        onChange={handleChange}
                        className="p-2 border rounded w-full text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Lente RF:</label>
                    <input
                        type="text"
                        name="lenteRF"
                        value={formData.lenteRF}
                        onChange={handleChange}
                        className="p-2 border rounded w-full text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Outros:</label>
                    <input
                        type="text"
                        name="outros"
                        value={formData.outros}
                        onChange={handleChange}
                        className="p-2 border rounded w-full text-sm"
                    />
                </div>

                {/* Total e Sinal */}
                <div className="mb-4">
                    <label className="block mb-1">Total:</label>
                    <input
                        type="number"
                        name="totalAmount"
                        value={formData.totalAmount}
                        onChange={handleChange}
                        className="p-2 border rounded w-full text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Sinal:</label>
                    <input
                        type="number"
                        name="sinal"
                        value={formData.sinal}
                        onChange={handleChange}
                        className="p-2 border rounded w-full text-sm"
                    />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Registrar Compra
                </button>
            </form>

            {/* Mensagem de Erro ou Sucesso */}
            {error && (
                <Message
                    message={error}
                    onClose={() => setError(null)}
                />
            )}
            {message && (
                <Message
                    message={message}
                    onClose={() => setMessage(null)}
                />
            )}
        </div>
    );
};

export default RegisterPurchase;
