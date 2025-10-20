import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  styled,
} from "@mui/material";

import NotificationService from "../utils/NotificationService";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../types/AppRoutes";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

interface LoginType {
  name: string;
  password: string;
}

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginType>({
    name: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await UserService.login(
        loginData.name,
        loginData.password
      );
      const data: string = response.data;

      if (response.status === 200 && data) {
        login();
        localStorage.setItem("token", data);
        console.log("Inicio de sesión exitoso");
        navigate(AppRoutes.HOME);
      } else {
        // Este caso es raro si el status es 200, pero es una buena guarda.
        NotificationService.error("Respuesta inesperada del servidor.");
      }
    } catch (error) {
      // --- AQUÍ ESTÁ LA MEJORA ---

      // Verificamos si es un error de Axios
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // El servidor respondió con un código de error (4xx, 5xx)
          // Usamos el mensaje que definimos en el backend (ej: "Usuario o contraseña incorrectos")
          NotificationService.error(
            error.response.data.msg || "Error al procesar la solicitud"
          );
        } else if (error.request) {
          // La solicitud se hizo pero no hubo respuesta (ej: servidor caído, red)
          NotificationService.error(
            "No se pudo conectar con el servidor. Revise su conexión."
          );
        } else {
          // Algo pasó al configurar la solicitud
          NotificationService.error("Error al preparar la solicitud de login.");
        }
      } else {
        // Es un error genérico de JavaScript (no de Axios)
        console.error("Error no-axios en handleSubmit:", error);
        NotificationService.error("Ocurrió un error inesperado.");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <StyledBox>
        <Paper style={{ padding: "1.2em", borderRadius: "0.5em" }}>
          <Typography variant="h4" gutterBottom>
            Iniciar Sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              autoFocus
              fullWidth
              margin="normal"
              label="Nombre de Usuario"
              variant="outlined"
              required
              name="name"
              value={loginData.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Contraseña"
              type="password"
              variant="outlined"
              required
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: "1rem" }}
            >
              Iniciar Sesión
            </Button>
          </Box>
        </Paper>
      </StyledBox>
    </Container>
  );
};

export default Login;

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
}));
