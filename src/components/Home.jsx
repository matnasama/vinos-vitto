import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, Container, Grid, Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button, Box, Modal, Badge } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Email from "@mui/icons-material/Email";
import WhatsApp from "@mui/icons-material/WhatsApp";
import Carousel from "react-material-ui-carousel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";  
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";


const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg", "/img5.jpg"];
  
function agruparProductosPorMarca(productos) {
  const agrupados = {};

  productos.forEach((producto) => {
    const marca = producto.categoria;
    if (!agrupados[marca]) {
      agrupados[marca] = {
        brand: marca,
        variants: [],
      };
    }

    agrupados[marca].variants.push({
      type: producto.nombre,
      price: producto.precio,
      image: producto.imagen_url, // 👈 agregamos la imagen
    });
  });

  return Object.values(agrupados);
}


function App() {

  const [wines, setWines] = useState([]);
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  
  useEffect(() => {
    fetch("http://localhost:4000/productos")
      .then((res) => res.json())
      .then((data) => {
        const winesAgrupados = agruparProductosPorMarca(data);
        setWines(winesAgrupados);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
      });
  }, []);

  const addToCart = (wine, variant, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.type === variant.type && item.brand === wine.brand
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item === existingItem ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCart, { brand: wine.brand, type: variant.type, price: variant.price, quantity }];
      }
    });
  };

  const updateQuantity = (index, delta) => {
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  return (
    <>
      <AppBar position="static" >
        <Toolbar sx={{backgroundColor:'#e4adb0'}}>
          <Typography fontFamily={'libre-baskerville-regular'} variant="h4" sx={{ flexGrow: 1 }}>
            VITTO'S WINE
          </Typography>
          <IconButton color="inherit" component="a" href="https://www.facebook.com/" target="_blank"><Facebook /></IconButton>
          <IconButton color="inherit" component="a" href="https://www.instagram.com/" target="_blank"><Instagram /></IconButton>
          <IconButton color="inherit" component="a" href="mailto:lujanlucasariel@gmail.com"><Email /></IconButton>
          <IconButton color="inherit" component="a" href="https://wa.me/5491164978342" target="_blank"><WhatsApp /></IconButton>
          <IconButton color="inherit" onClick={() => setOpenCart(true)}>
            <Badge badgeContent={cart.reduce((sum, item) => sum + item.quantity, 0)} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 2 }}>
        <Carousel>
          {images.map((img, index) => (
            <img key={index} src={img} alt={`slide ${index}`} style={{ width: "100%", height: 300, objectFit: "cover" }} />
          ))}
        </Carousel>
      </Container>

      <Container sx={{ mt: 4 }}>
        {wines.map((wine, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5">{wine.brand}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {wine.variants.map((variant, vIndex) => (
                      <TableRow key={vIndex}>
                        <TableCell align="justify">
                          <img src={variant.image} alt={variant.type} style={{ height: 80, marginRight: 10 }} />
                        </TableCell>
                        <TableCell align="justify">{variant.type}</TableCell>
                        <TableCell align="justify">${variant.price}</TableCell>
                        <TableCell align="right">
                          <Badge 
                            badgeContent={
                              cart.find(item => item.brand === wine.brand && item.type === variant.type)?.quantity || 0
                            } 
                            color="error"
                          >
                            <IconButton onClick={() => addToCart(wine, variant)}>
                              <AddShoppingCartIcon />
                            </IconButton>
                          </Badge>
                          <IconButton 
                            onClick={() => setOpenCart(true)}
                            color="primary"
                            title="Ir al carrito"
                          >
                            <ShoppingCartOutlinedIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>

      <Modal open={openCart} onClose={() => setOpenCart(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "80%", md: "75%" },
            height: { xs: "80%" },
            bgcolor: "background.paper",
            overflowY: 'auto',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={() => setOpenCart(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Grid container spacing={2} direction={{ xs: "column", md: "row"}}>
            {/* Products Section */}
            <Grid item xs={11} md={6} sx={{ width: { xs: "100%" } }}>
              {cart.length > 0 ? (
                <TableContainer component={Paper}>
                  <Typography sx={{ p: 2 }} variant="h6">Productos</Typography>
                  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableBody>
                      {cart.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell align="justify">{item.type}</TableCell>
                          <TableCell align="left">${item.price * item.quantity}</TableCell>
                          <TableCell align="left">
                            <IconButton onClick={() => updateQuantity(index, -1)}>
                              <RemoveIcon />
                            </IconButton>
                            {item.quantity}
                            <IconButton onClick={() => updateQuantity(index, 1)}>
                              <AddIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell align="left">
                            <IconButton onClick={() => removeFromCart(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography>No hay productos en el carrito</Typography>
              )}
            </Grid>

            {/* Summary Section */}
            <Grid item xs={11} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Resumen</Typography>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Productos ({cart.length})</TableCell>
                      <TableCell align="right">
                        ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Envío</TableCell>
                      <TableCell align="right">$3.135</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total</TableCell>
                      <TableCell align="right">
                        ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 3135}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Continuar compra
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography fontFamily={'libre-baskerville-regular'} variant="h4" sx={{ flexGrow: 1, marginBottom: '16px' }}>
            MEDIOS DE PAGO
          </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <img src="/tarjeta-credito.png" alt="Tarjeta" style={{ height: 50 }} />
          </Grid>           
          <Grid item>
            <img src="/dinero.png" alt="Efectivo" style={{ height: 50 }} />
          </Grid>
          <Grid item>
            <img src="/mercadopago-logo.png" alt="MercadoPago" style={{ height: 50 }} />
          </Grid>          
        </Grid>
      </Container>

      <Box sx={{ mt: 4, p: 4, backgroundColor: "#f5f5f5", textAlign: "center" }}>
        <Typography color="#424242" fontFamily={'libre-baskerville-regular'} variant="h6">Acerca de nosotros</Typography>
        <Typography color="#424242" fontFamily={'libre-baskerville-regular'} variant="body2"> Contacto | FAQ | Terminos y Condiciones</Typography>
          <IconButton color="#424242" component="a" href="https://www.facebook.com/" target="_blank"><Facebook /></IconButton>
          <IconButton color="#424242" component="a" href="https://www.instagram.com/" target="_blank"><Instagram /></IconButton>
          <IconButton color="#424242" component="a" href="mailto:lujanlucasariel@gmail.com"><Email /></IconButton>
          <IconButton color="#424242" component="a" href="https://wa.me/5491164978342" target="_blank"><WhatsApp /></IconButton>
        </Box>
    </>
  );
}

export default App;
