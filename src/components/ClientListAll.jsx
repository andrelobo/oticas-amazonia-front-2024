import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink, grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const ClientListAll = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('https://zoe-be.onrender.com/api/clients');
        if (!response.ok) {
          throw new Error('Erro ao buscar os clientes');
        }
        const data = await response.json();
        console.log('Dados recebidos:', data); // Log para verificar a resposta da API
        setClients(data.clients); // Certifique-se de acessar a propriedade correta
      } catch (error) {
        console.error('Erro:', error); // Log para verificar erros
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleEditClick = (client) => {
    setCurrentClient({ ...client });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentClient(null);
  };

  const handleSave = async () => {
    try {
      console.log('Dados enviados:', currentClient); // Log dos dados enviados
      const response = await fetch(`https://zoe-be.onrender.com/api/clients/${currentClient._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentClient),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao atualizar o cliente: ${errorData.message}`);
      }

      const updatedClient = await response.json();
      setClients(clients.map(client => (client._id === updatedClient._id ? updatedClient : client)));
      setOpen(false);
      setCurrentClient(null);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setError(error.message);
    }
  };

  const handleDelete = async (clientId) => {
    try {
      const response = await fetch(`https://zoe-be.onrender.com/api/clients/${clientId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar o cliente');
      }

      setClients(clients.filter(client => client._id !== clientId));
    } catch (error) {
      console.error('Erro ao deletar:', error);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" component="div">Carregando...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" component="div" color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: pink[500], fontWeight: 'bold' }}>
        Lista de Clientes
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: grey[200] }}>
              <TableCell sx={{ color: grey[900], fontWeight: 'bold' }}>Nome</TableCell>
              <TableCell sx={{ color: grey[900], fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: grey[900], fontWeight: 'bold' }}>Status da Compra</TableCell>
              <TableCell sx={{ color: grey[900], fontWeight: 'bold' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map(client => (
              <TableRow key={client._id} sx={{ '&:nth-of-type(odd)': { backgroundColor: grey[100] } }}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.purchaseStatus ? 'Pago' : 'Não Pago'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      backgroundColor: pink[500],
                      color: 'white',
                      '&:hover': { backgroundColor: pink[700] },
                      mr: 1
                    }}
                    startIcon={<EditIcon />}
                    onClick={() => handleEditClick(client)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      backgroundColor: grey[500],
                      color: 'white',
                      '&:hover': { backgroundColor: grey[700] }
                    }}
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(client._id)}
                  >
                    Deletar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: grey[200], color: grey[900] }}>Editar Cliente</DialogTitle>
        <DialogContent>
          {currentClient && (
            <>
              <TextField
                margin="dense"
                label="Nome"
                type="text"
                fullWidth
                value={currentClient.name}
                onChange={(e) => setCurrentClient({ ...currentClient, name: e.target.value })}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                value={currentClient.email}
                onChange={(e) => setCurrentClient({ ...currentClient, email: e.target.value })}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                margin="dense"
                label="Telefone"
                type="text"
                fullWidth
                value={currentClient.phone}
                onChange={(e) => setCurrentClient({ ...currentClient, phone: e.target.value })}
                sx={{ marginBottom: 2 }}
              />
              <Select
                label="Status da Compra"
                fullWidth
                value={currentClient.purchaseStatus}
                onChange={(e) => setCurrentClient({ ...currentClient, purchaseStatus: e.target.value })}
                sx={{ marginBottom: 2 }}
              >
                <MenuItem value={true}>Pago</MenuItem>
                <MenuItem value={false}>Não Pago</MenuItem>
              </Select>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: grey[900] }}>
            Cancelar
          </Button>
          <Button onClick={handleSave} sx={{ color: grey[900] }}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClientListAll;
