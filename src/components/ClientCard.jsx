import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ClientCard = ({ client, onEdit, onDelete }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {client.name}
        </Typography>
        <Typography color="text.secondary">
          {client.email}
        </Typography>
        <Typography variant="body2">
          Status da Compra: {client.purchaseStatus ? 'Pago' : 'Não Pago'}
        </Typography>
        <Typography variant="body2">
          Número de Compras: {client.purchaseCount}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{ color: '#d957a9' }}
          startIcon={<EditIcon />}
          onClick={() => onEdit(client)}
        >
          Editar
        </Button>
        <Button
          size="small"
          sx={{ color: '#d957a9' }}
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(client._id)}
        >
          Deletar
        </Button>
      </CardActions>
    </Card>
  );
};

export default ClientCard;
