import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Container, Grid, Card, CardContent, Button, Box } from "@mui/material";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Twitter from "@mui/icons-material/Twitter";
import Email from "@mui/icons-material/Email";
import Phone from "@mui/icons-material/Phone";
import CreditCard from "@mui/icons-material/CreditCard";
import LocalAtm from "@mui/icons-material/LocalAtm";
import Payment from "@mui/icons-material/Payment";
import Carousel from "react-material-ui-carousel";

const images = ["src/assets/img1.jpg", "src/assets//img2.jpg", "src/assets/img3.jpg", "src/assets/img4.jpg", "src/assets/img5.jpg"];
const products = [
  { name: "Vino Malbec", price: Math.floor(Math.random() * 10000) + 3000 },
  { name: "Vino Cabernet", price: Math.floor(Math.random() * 10000) + 3000 },
  { name: "Vino Syrah", price: Math.floor(Math.random() * 10000) + 3000 },
  { name: "Vino Merlot", price: Math.floor(Math.random() * 10000) + 3000 },
];

function Home() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Ecommerce Vinos
          </Typography>
          <IconButton color="inherit"><Facebook /></IconButton>
          <IconButton color="inherit"><Instagram /></IconButton>
          <IconButton color="inherit"><Twitter /></IconButton>
          <IconButton color="inherit"><Email /></IconButton>
          <IconButton color="inherit"><Phone /></IconButton>
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
        <Grid container spacing={3}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body1">${product.price}</Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Comprar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ mt: 4, textAlign: "center" }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item><CreditCard fontSize="large" /></Grid>
          <Grid item><LocalAtm fontSize="large" /></Grid>
          <Grid item><Payment fontSize="large" /></Grid>
        </Grid>
      </Container>

      <Box sx={{ mt: 4, p: 4, backgroundColor: "#f5f5f5", textAlign: "center" }}>
        <Typography variant="h6">About Us</Typography>
        <Typography variant="body2">Enlaces de ejemplo: Contacto | FAQ | Terminos y Condiciones</Typography>
      </Box>
    </>
  );
}

export default Home;
