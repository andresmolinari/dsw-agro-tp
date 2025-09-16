import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Alert,
  Box,
  Button,
  Stack,
} from "@mui/material";
import useConfirm from "../hooks/useConfirm";
import ConfirmDialog from "../components/ConfirmDialog";
import useUsuarios from "../hooks/useUsuarios";
import { Delete } from "@mui/icons-material";

const MisUsuarios: React.FC = () => {
  const { usuarios, loading, error, deleteUsuario } = useUsuarios();
  const { isOpen, message, confirm, cancel, confirmAction } = useConfirm();

  // Eliminar con confirmación
  const handleDelete = (usuarioId: number) => {
    const onConfirm = async () => {
      await deleteUsuario(usuarioId);
    };
    confirm("¿Estás seguro de que deseas eliminar este usuario?", onConfirm);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

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
          Lista de Usuarios
        </Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow key={usuario.usuarioId}>
              <TableCell>{usuario.usuarioNombre}</TableCell>
              <TableCell>{usuario.usuarioEmail}</TableCell>
              <TableCell>{usuario.rol?.rolNombre}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(usuario.usuarioId)}
                    sx={{
                      minWidth: "40px",
                      padding: "8px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Delete />
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmDialog
        open={isOpen}
        message={message}
        onClose={cancel}
        onConfirm={confirmAction}
      />
    </TableContainer>
  );
};

export default MisUsuarios;
