import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem
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
      <DialogTitle>Adicionar Cliente</DialogTitle>
      <DialogContent>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          margin="dense"
          label="Nome"
          type="text"
          name="name"
          fullWidth
          value={newClient.name}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          name="email"
          fullWidth
          value={newClient.email}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          margin="dense"
          label="Telefone"
          type="text"
          name="phone"
          fullWidth
          value={newClient.phone}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <Select
          label="Status da Compra"
          name="purchaseStatus"
          fullWidth
          value={newClient.purchaseStatus}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
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
          sx={{ marginBottom: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} sx={{ color: '#d957a9' }}>
          Cancelar
        </Button>
        <Button onClick={handleSave} sx={{ color: '#d957a9' }}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddClientCard;
