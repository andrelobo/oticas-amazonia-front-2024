import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography
} from '@mui/material';

const AddClientCard = ({ onSave, onCancel }) => {
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    purchaseStatus: false,
    purchaseCount: 0
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleSave = () => {
    if (!newClient.name || !newClient.email || !newClient.phone) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    onSave(newClient);
  };

  return (
    <Dialog open onClose={onCancel}>
      <DialogTitle sx={{ backgroundColor: 'amazon-green', color: 'white' }}>
        Adicionar Cliente
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: 'amazon-green-light', color: 'white' }}>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          margin="dense"
          label="Nome"
          type="text"
          name="name"
          fullWidth
          value={newClient.name}
          onChange={handleChange}
          sx={{ marginBottom: 2, backgroundColor: 'white', borderRadius: 1 }}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          name="email"
          fullWidth
          value={newClient.email}
          onChange={handleChange}
          sx={{ marginBottom: 2, backgroundColor: 'white', borderRadius: 1 }}
        />
        <TextField
          margin="dense"
          label="Telefone"
          type="text"
          name="phone"
          fullWidth
          value={newClient.phone}
          onChange={handleChange}
          sx={{ marginBottom: 2, backgroundColor: 'white', borderRadius: 1 }}
        />
        <Select
          label="Status da Compra"
          name="purchaseStatus"
          fullWidth
          value={newClient.purchaseStatus}
          onChange={handleChange}
          sx={{ marginBottom: 2, backgroundColor: 'white', borderRadius: 1 }}
        >
          <MenuItem value={true}>Pago</MenuItem>
          <MenuItem value={false}>Não Pago</MenuItem>
        </Select>
        <TextField
          margin="dense"
          label="Número de Compras"
          type="number"
          name="purchaseCount"
          fullWidth
          value={newClient.purchaseCount}
          onChange={handleChange}
          sx={{ marginBottom: 2, backgroundColor: 'white', borderRadius: 1 }}
        />
      </DialogContent>
      <DialogActions sx={{ backgroundColor: 'amazon-green' }}>
        <Button onClick={onCancel} sx={{ color: 'white' }}>
          Cancelar
        </Button>
        <Button onClick={handleSave} sx={{ color: 'white' }}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddClientCard;
