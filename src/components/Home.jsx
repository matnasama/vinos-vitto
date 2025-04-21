import React, { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Typography, IconButton, Container, Grid, Accordion,
  AccordionSummary, AccordionDetails, Card, CardMedia, CardContent, CardActions,
  Badge, Button, Box, Modal, Table, TableBody, TableCell, TableRow, Paper
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Email from "@mui/icons-material/Email";
import WhatsApp from "@mui/icons-material/WhatsApp";
import Carousel from "react-material-ui-carousel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

import Login from "./Login";
import { useCart } from "../contexts/CartContext";

const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg", "/img5.jpg"];

const agruparProductosPorMarca = (productos) => {
  const agrupado = {};

  productos.forEach((producto) => {
    const marca = producto.categoria;

    if (!agrupado[marca]) {
      agrupado[marca] = {
        brand: marca,
        variants: [],
      };
    }

    agrupado[marca].variants.push({
      id: producto.id,
      type: producto.nombre,
      price: producto.precio,
      image: producto.imagen_url,
    });
  });

  return Object.values(agrupado);
};

function Home({ user, setUser }) {
  const [wines, setWines] = useState([]);
  const [zoomImage, setZoomImage] = useState(null);
  const [openZoomModal, setOpenZoomModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const { cart, addToCart, updateQuantity, removeFromCart, clearCart } = useCart();

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

  const handleZoom = (imageName) => {
    setZoomImage(`/products/${imageName}`);
    setOpenZoomModal(true);
  };

  const handleCompra = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      setShowLogin(true);
      return;
    }

    const orden = {
      userId: user.id,
      productos: cart.map(({ id, quantity, price }) => ({
        productoId: id,
        quantity,
        price
      })),
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 3135,
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

      alert("Compra registrada con éxito!");
      clearCart();
    } catch (error) {
      console.error("Error al registrar la orden:", error);
      alert("Hubo un error al procesar tu orden.");
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "#e4adb0" }}>
          <Typography
            fontFamily={"libre-baskerville-regular"}
            variant="h4"
            sx={{ flexGrow: 1 }}
          >
            VITTO'S WINE
          </Typography>

          {user && (
            <Button color="inherit" onClick={() => navigate("/mis-pedidos")}>
              Mis Pedidos
            </Button>
          )}

          <IconButton color="inherit" href="https://www.facebook.com/" target="_blank"><Facebook /></IconButton>
          <IconButton color="inherit" href="https://www.instagram.com/" target="_blank"><Instagram /></IconButton>
          <IconButton color="inherit" href="mailto:lujanlucasariel@gmail.com"><Email /></IconButton>
          <IconButton color="inherit" href="https://wa.me/5491164978342" target="_blank"><WhatsApp /></IconButton>
          <IconButton color="inherit" onClick={() => navigate("/cart")}>
            <Badge badgeContent={cart.reduce((sum, item) => sum + item.quantity, 0)} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>


      <Container sx={{ mt: 2 }}>
        <Carousel>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`slide ${index}`}
              style={{ width: "100%", height: 300, objectFit: "cover" }}
            />
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
              <Grid container spacing={2}>
                {wine.variants.map((variant, vIndex) => (
                  <Grid item xs={12} sm={6} md={4} key={vIndex}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 2,
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={`/products/${variant.image}`}
                        alt={variant.type}
                        height="200"
                        sx={{ objectFit: "contain", p: 2 }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom>
                          {variant.type}
                        </Typography>
                        <Typography variant="body1">${variant.price}</Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                        <IconButton onClick={() => handleZoom(variant.image)} title="Ver imagen">
                          <SearchIcon />
                        </IconButton>
                        <Badge
                          badgeContent={
                            cart.find(item => item.id === variant.id)?.quantity || 0
                          }
                          color="error"
                        >
                          <IconButton onClick={() => addToCart(wine, variant)}>
                            <AddShoppingCartIcon />
                          </IconButton>
                        </Badge>
                        <IconButton onClick={() => navigate("/cart")} color="primary" title="Ir al carrito">
                          <ShoppingCartOutlinedIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>

      <Container sx={{ mt: 4, textAlign: "center" }}>
        <Typography
          fontFamily={"libre-baskerville-regular"}
          variant="h4"
          sx={{ marginBottom: "16px" }}
        >
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
        <Typography color="#424242" fontFamily={'libre-baskerville-regular'} variant="h6">
          Acerca de nosotros
        </Typography>
        <Typography color="#424242" fontFamily={'libre-baskerville-regular'} variant="body2">
          Contacto | FAQ | Términos y Condiciones
        </Typography>
        <IconButton color="#424242" href="https://www.facebook.com/" target="_blank"><Facebook /></IconButton>
        <IconButton color="#424242" href="https://www.instagram.com/" target="_blank"><Instagram /></IconButton>
        <IconButton color="#424242" href="mailto:lujanlucasariel@gmail.com"><Email /></IconButton>
        <IconButton color="#424242" href="https://wa.me/5491164978342" target="_blank"><WhatsApp /></IconButton>
      </Box>

      {showLogin && (
        <Modal open={true} onClose={() => setShowLogin(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 2,
              boxShadow: 24,
              maxWidth: 400,
              width: "90%",
            }}
          >
            <IconButton
              onClick={() => setShowLogin(false)}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <Login
              onLogin={(usuario) => {
                localStorage.setItem("user", JSON.stringify(usuario));
                setUser(usuario);
                setShowLogin(false);
              }}
            />
          </Box>
        </Modal>
      )}
    </>
  );
}

export default Home;
