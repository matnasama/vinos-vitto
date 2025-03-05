import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Container, Grid, Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Email from "@mui/icons-material/Email";
import WhatsApp from "@mui/icons-material/WhatsApp";
import Carousel from "react-material-ui-carousel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg", "/img5.jpg"];
const wines = [
  {
    brand: "ABUELO NITO",
    variants: [
      { type: "Malbec", price: 6000 },
      { type: "Pinot Noir", price: 6000 },
      { type: "Blanco Tardío", price: 6000 }
    ]
  },
  {
    brand: "BOURNETT",
    variants: [
      { type: "Malbec", price: 5000 },
      { type: "Cabernet", price: 5000 },
      { type: "Rosado", price: 5000 },
      { type: "Chardonnay", price: 5000 },
      { type: "Numerado", price: 7500 },
      { type: "Fangio Legend", price: 12000 },
      { type: "RS Blend", price: 15000 }
    ]
  },
  {
    brand: "DURET",
    variants: [
      { type: "Malbec", price: 5000 },
      { type: "Cabernet", price: 5000 },
      { type: "Botella de 1.125 ml", price: 6000 }
    ]
  },
  {
    brand: "LA ELEGIDA",
    variants: [
      { type: "Malbec", price: 4000 },
      { type: "Cabernet", price: 4000 }
    ]
  },
  {
    brand: "JEAN RIVIER",
    variants: [
      { type: "Malbec", price: 6000 },
      { type: "Cabernet Franc", price: 6000 },
      { type: "Blanco Dulce", price: 6000 },
      { type: "Rosé", price: 6000 },
      { type: "Bag box 3 litros Malbec", price: 14000 },
      { type: "Corte Malbec-Bonarda", price: 4000 }
    ]
  },
  {
    brand: "LA IRIDE",
    variants: [
      { type: "Plateada", price: 4500 },
      { type: "Roja", price: 5000 },
      { type: "Dorada", price: 6500 },
      { type: "Naranjo especial (caja x3)", price: 40000 }
    ]
  },
  {
    brand: "BEDUINA",
    variants: [
      { type: "Malbec", price: 9500 },
      { type: "Blend de tintas", price: 11000 }
    ]
  },
  {
    brand: "CREACIÓN",
    variants: [
      { type: "Malbec", price: 15000 },
      { type: "Cabernet", price: 15000 }
    ]
  },
  {
    brand: "LA PUERTA",
    variants: [
      { type: "Reserva Cabernet", price: 9900 },
      { type: "Reserva Malbec", price: 9900 },
      { type: "Syrah", price: 7500 }
    ]
  },
  {
    brand: "LA QUEBRADA",
    variants: [
      { type: "Tinto", price: 2900 }
    ]
  }
];

function App() {
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
          <IconButton color="inherit"><ShoppingCartIcon /></IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 2 }}>
        <Carousel>
          {images.map((img, index) => (
            <img key={index} src={img} alt={`slide ${index}`} style={{ width: "100%", height: 300, objectFit: "cover" }} />
          ))}
        </Carousel>
      </Container>

      <Container sx={{ mt: 4, display: 'grid', gap: '2rem' }}>
        {wines.map((wine, index) => (
          <Accordion key={index} sx={{  }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontFamily={'libre-baskerville-regular'} variant="h5">{wine.brand}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>                      
                        <Typography fontFamily={'sans-serif'} variant="h6" sx={{ flexGrow: 1 }}>
                          Variedad
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontFamily={'sans-serif'} variant="h6" sx={{ flexGrow: 1 }}>
                          Precio
                        </Typography>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {wine.variants.map((variant, vIndex) => (
                      <TableRow key={vIndex}>
                        <TableCell>{variant.type}</TableCell>
                        <TableCell>
                          <Typography fontFamily={'sans-serif'} fontWeight={500} color="#1b5e20" variant="h6" sx={{ flexGrow: 1 }}>
                            ${variant.price}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <IconButton color="primary"><ShoppingCartIcon /></IconButton>
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

      <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography fontFamily={'libre-baskerville-regular'} variant="h4" sx={{ flexGrow: 1, marginBottom: '16px' }}>
            MEDIOS DE PAGO
          </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <img src="src/assets/tarjeta-credito.png" alt="Tarjeta" style={{ height: 50 }} />
          </Grid>           
          <Grid item>
            <img src="src/assets/dinero.png" alt="Efectivo" style={{ height: 50 }} />
          </Grid>
          <Grid item>
            <img src="src/assets/mercadopago-logo.png" alt="MercadoPago" style={{ height: 50 }} />
          </Grid>          
        </Grid>
      </Container>

      <Box sx={{ mt: 4, p: 4, backgroundColor: "#f5f5f5", textAlign: "center" }}>
        <Typography fontFamily={'libre-baskerville-regular'} variant="h6">Acerca de nosotros</Typography>
        <Typography fontFamily={'libre-baskerville-regular'} variant="body2"> Contacto | FAQ | Terminos y Condiciones</Typography>
          <IconButton color="inherit" component="a" href="https://www.facebook.com/" target="_blank"><Facebook /></IconButton>
          <IconButton color="inherit" component="a" href="https://www.instagram.com/" target="_blank"><Instagram /></IconButton>
          <IconButton color="inherit" component="a" href="mailto:lujanlucasariel@gmail.com"><Email /></IconButton>
          <IconButton color="inherit" component="a" href="https://wa.me/5491164978342" target="_blank"><WhatsApp /></IconButton>
        </Box>
    </>
  );
}

export default App;
