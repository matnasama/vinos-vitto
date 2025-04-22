import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      onLogin(data.user);
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" mb={2} color="white">Iniciar sesión</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        fullWidth
        label="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        margin="normal"
        InputLabelProps={{
          style: { color: 'white' }
        }}
        InputProps={{
          style: { color: 'white' },
          sx: {
            '& fieldset': { borderColor: 'white' },
            '&:hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset': { borderColor: 'white' }
          }
        }}
      />

      <TextField
        fullWidth
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        InputLabelProps={{
          style: { color: 'white' }
        }}
        InputProps={{
          style: { color: 'white' },
          sx: {
            '& fieldset': { borderColor: 'white' },
            '&:hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset': { borderColor: 'white' }
          }
        }}
      />

      <Button variant="contained" color="primary" onClick={handleLogin} fullWidth sx={{ mt: 2 }}>
        Entrar
      </Button>

      <Button variant="text" color="secondary" fullWidth sx={{ mt: 2 }} onClick={() => navigate('/register')}>
        ¿No tenés cuenta? Registrate aquí
      </Button>
    </Box>
  );
};

export default Login;
