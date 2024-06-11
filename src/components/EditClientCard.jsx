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

const EditClientCard = ({ client, onSave, onCancel }) => {
  const [updatedClient, setUpdatedClient] = useState(client);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedClient({ ...updatedClient, [name]: value });
  };

  const handleSave = () => {
    onSave(updatedClient);
  };

  return (
    <Dialog open onClose={onCancel}>
      <DialogTitle>Editar Cliente</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Nome"
          type="text"
          name="name"
          fullWidth
          value={updatedClient.name}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          name="email"
          fullWidth
          value={updatedClient.email}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          margin="dense"
          label="Telefone"
          type="text"
          name="phone"
          fullWidth
          value={updatedClient.phone}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <Select
          label="Status da Compra"
          name="purchaseStatus"
          fullWidth
          value={updatedClient.purchaseStatus}
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
          value={updatedClient.purchaseCount}
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

export default EditClientCard;
