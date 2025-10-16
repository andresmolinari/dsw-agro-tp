import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar, ListItemIcon, Button, styled, buttonClasses } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../types/AppRoutes';
import { ThemePalette } from './theme.config';
import { useAuth } from '../context/AuthContext';

interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { role } = useAuth();

  const onClickButton = (url: AppRoutes) => {
    navigate(url);
    onClose(); // cerrar drawer al hacer click
  };

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      anchor="left"
      ModalProps={{ keepMounted: true }}
      sx={{
        [`& .MuiDrawer-paper`]: {
          width: 240,
        },
      }}
    >
      <Toolbar />
      <List>
        {role === 2 ? (
          <ListItem>
            <SyledButton onClick={() => onClickButton(AppRoutes.MIS_USUARIOS)}>
              <ListItemText primary="Mis Usuarios" />
            </SyledButton>
          </ListItem>
        ) : (
          <>
            <ListItem>
              <SyledButton onClick={() => onClickButton(AppRoutes.NUEVO_TRABAJO)}>
                <ListItemIcon><WorkIcon /></ListItemIcon>
                <ListItemText primary="Nuevo Trabajo" />
              </SyledButton>
            </ListItem>
            <ListItem>
              <SyledButton onClick={() => onClickButton(AppRoutes.MIS_TRABAJOS)}>
                <ListItemIcon><AssignmentIcon /></ListItemIcon>
                <ListItemText primary="Mis Trabajos" />
              </SyledButton>
            </ListItem>
            <ListItem>
              <SyledButton onClick={() => onClickButton(AppRoutes.MIS_CLIENTES)}>
                <ListItemIcon><GroupIcon /></ListItemIcon>
                <ListItemText primary="Mis Clientes" />
              </SyledButton>
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );
};

const SyledButton = styled(Button)(() => ({
  minWidth: '210px',
  color: 'white',
  [`&.${buttonClasses.root}`]: { justifyContent: 'normal' },
  '&:hover': { backgroundColor: ThemePalette.LIME },
}));

export default SideBar;
