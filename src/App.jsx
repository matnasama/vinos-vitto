import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Login from "./components/Login";
import { CartProvider } from "./contexts/CartContext"; // asegurate de moverlo a esta ruta
import MisPedidos from "./components/MisPedidos";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/mis-pedidos" element={<MisPedidos />} />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <Login
                  onLogin={(usuario) => {
                    localStorage.setItem("user", JSON.stringify(usuario));
                    setUser(usuario);
                  }}
                />
              )
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
