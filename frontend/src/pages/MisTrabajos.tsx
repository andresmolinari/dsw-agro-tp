import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { useOrdenesTrabajo } from "../hooks/useOrdenesTrabajo";

const OrdenesTrabajoList: React.FC = () => {
  const { ordenes, loading, error } = useOrdenesTrabajo();

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <TableContainer component={Paper} sx={{ padding: 2 }}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
      }}
    >
      <Typography variant='h6' component='div'>
        Mis Trabajos
      </Typography>
    </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Campo</TableCell>
            <TableCell>Lote</TableCell>
            <TableCell>Detalles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordenes.map((orden) => (
            <TableRow key={orden.nroOrdenTrabajo}>
              <TableCell>{new Date(orden.fecha).toLocaleDateString()}</TableCell>
              <TableCell>{orden.tipo}</TableCell>
              <TableCell>{orden.lote?.campo?.cliente?.clienteNombre || "N/A"}</TableCell>
              <TableCell>{orden.lote?.campo?.campoNombre || "N/A"}</TableCell>
              <TableCell>{orden.lote?.loteNro || "N/A"}</TableCell>
              <TableCell>
                {orden.tipo === "cosecha" && orden.Cosecha && (
                  <div>
                    <p>Rendimiento: {orden.Cosecha.rendimiento}</p>
                    <p>Precio: {orden.Cosecha.precio}</p>
                  </div>
                )}
                {orden.tipo === "siembra" && orden.Siembra && (
                  <div>
                    <p>Variedad: {orden.Siembra.variedad}</p>
                    <p>Kilos: {orden.Siembra.kilos}</p>
                    <p>Precio: {orden.Siembra.precio}</p>
                  </div>
                )}
                {orden.tipo === "fumigacion" && orden.Fumigacion && (
                  <div>
                    <p>Producto: {orden.Fumigacion.producto}</p>
                    <p>Dosis: {orden.Fumigacion.dosis}</p>
                    <p>Precio: {orden.Fumigacion.precio}</p>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdenesTrabajoList;
