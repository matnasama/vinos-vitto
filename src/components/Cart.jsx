import React from 'react';
import {
  Grid, Table, TableBody, TableCell, TableContainer, TableRow, Paper,
  Typography, IconButton, Button, Box
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const envio = 3135;
  const total = subtotal + envio;

  const onFinalizarCompra = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      alert("Debes iniciar sesión para finalizar la compra.");
      navigate("/login");
      return;
    }

    const orden = {
      userId: user.id,
      productos: cart.map(({ id, quantity, price }) => ({
        productoId: id,
        quantity,
        price,
      })),
      total,
    };

    try {
      const res = await fetch("http://localhost:4000/orden", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orden),
      });

      if (!res.ok) throw new Error("Error al registrar la orden");

      alert("Compra realizada con éxito!");
      clearCart();
      navigate("/");
    } catch (error) {
      console.error("Error al registrar la orden:", error);
      alert("Hubo un error al procesar tu orden.");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Tu carrito</Typography>
      {cart.length === 0 ? (
        <Typography>No hay productos en el carrito.</Typography>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {cart.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <img
                            src={`/products/${item.image}`}
                            alt={item.type}
                            style={{ width: 60, height: 60, objectFit: 'contain', borderRadius: 8 }}
                          />
                          <Box>
                            <Typography>{item.type}</Typography>
                            <Typography variant="body2">${item.price}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => updateQuantity(index, -1)}><RemoveIcon /></IconButton>
                        {item.quantity}
                        <IconButton onClick={() => updateQuantity(index, 1)}><AddIcon /></IconButton>
                      </TableCell>
                      <TableCell>${item.price * item.quantity}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => removeFromCart(index)}><DeleteIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Resumen</Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Subtotal</TableCell>
                    <TableCell align="right">${subtotal}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Envío</TableCell>
                    <TableCell align="right">${envio}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Total</strong></TableCell>
                    <TableCell align="right"><strong>${total}</strong></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={onFinalizarCompra}
              >
                Finalizar compra
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Cart;
