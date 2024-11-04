import React, { useState } from "react";
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
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useOrdenesTrabajo } from "../hooks/useOrdenesTrabajo";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const OrdenesTrabajoList: React.FC = () => {
  const { ordenes, loading, error } = useOrdenesTrabajo();
  const [orderAsc, setOrderAsc] = useState(true); // Estado para controlar el orden de la lista
  const [filterType, setFilterType] = useState(""); // Estado para el tipo de filtro

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  // Filtrar ordenes por tipo si se selecciona uno
  const filteredOrdenes = filterType
    ? ordenes.filter((orden) => orden.tipo === filterType)
    : ordenes;

  // Ordenar las ordenes filtradas por fecha, ascendente o descendente según el estado
  const sortedOrdenes = [...filteredOrdenes].sort((a, b) => {
    const dateA = new Date(a.fecha).getTime();
    const dateB = new Date(b.fecha).getTime();
    return orderAsc ? dateA - dateB : dateB - dateA;
  });

  // Alterna el orden entre ascendente y descendente
  const toggleOrder = () => {
    setOrderAsc(!orderAsc);
  };

  // Maneja el cambio de filtro con el tipo de evento especificado
  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterType(event.target.value);
  };

  return (
    <TableContainer component={Paper} sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h6" component="div">
          Mis Trabajos
        </Typography>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
          <InputLabel shrink>Filtrar por Tipo</InputLabel>
          <Select
            value={filterType}
            onChange={handleFilterChange}
            label="Filtrar por Tipo"
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="cosecha">Cosecha</MenuItem>
            <MenuItem value="siembra">Siembra</MenuItem>
            <MenuItem value="fumigacion">Fumigación</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Fecha
              <IconButton onClick={toggleOrder} size="small">
                {orderAsc ? (
                  <ArrowUpward fontSize="small" />
                ) : (
                  <ArrowDownward fontSize="small" />
                )}
              </IconButton>
            </TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Campo</TableCell>
            <TableCell>Lote</TableCell>
            <TableCell>Detalles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedOrdenes.map((orden) => (
            <TableRow key={orden.nroOrdenTrabajo}>
              <TableCell>
                {new Date(orden.fecha).toLocaleDateString()}
              </TableCell>
              <TableCell>{orden.tipo}</TableCell>
              <TableCell>
                {orden.lote?.campo?.cliente?.clienteNombre || "N/A"}
              </TableCell>
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
