import React from "react";
import { Box, Typography, Link, Container } from "@mui/material";

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          © {new Date().getFullYear()} Agro DSW. Todos los derechos
          reservados.
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Link href="/" underline="hover">
            Inicio
          </Link>{" "}
          |{" "}
          <Link href="/contacto" underline="hover">
            Contacto
          </Link>{" "}
          |{" "}
          <Link href="/privacidad" underline="hover">
            Política de Privacidad
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
