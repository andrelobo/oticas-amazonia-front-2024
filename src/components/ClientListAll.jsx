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
  TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { pink, purple } from '@mui/material/colors';

const ClientListAll = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:7778/api/clients');
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
    setCurrentClient(client);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentClient(null);
  };

  const handleSave = () => {
    // Lógica para salvar as alterações do cliente
    setOpen(false);
    setCurrentClient(null);
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
            <TableRow sx={{ backgroundColor: pink[100] }}>
              <TableCell sx={{ color: pink[900], fontWeight: 'bold' }}>Nome</TableCell>
              <TableCell sx={{ color: pink[900], fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: pink[900], fontWeight: 'bold' }}>Status da Compra</TableCell>
              <TableCell sx={{ color: pink[900], fontWeight: 'bold' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map(client => (
              <TableRow key={client._id} sx={{ '&:nth-of-type(odd)': { backgroundColor: pink[50] } }}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.purchaseStatus ? 'Pago' : 'Não Pago'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: pink[500], color: 'white', '&:hover': { backgroundColor: pink[700] } }}
                    startIcon={<EditIcon />}
                    onClick={() => handleEditClick(client)}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: pink[100], color: pink[900] }}>Editar Cliente</DialogTitle>
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
              {/* Adicione outros campos conforme necessário */}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: pink[900] }}>
            Cancelar
          </Button>
          <Button onClick={handleSave} sx={{ color: pink[900] }}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClientListAll;
