import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  ListItemIcon,
  paperClasses,
  Button,
  styled,
  buttonClasses,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../types/AppRoutes';
import { ThemePalette } from './theme.config';
import { useAuth } from '../context/AuthContext';

const SideBar = () => {
  const navigate = useNavigate();
  const { role } = useAuth();

  const onClickButton = (url: AppRoutes) => {
    navigate(url);
  };

  return (
    <Drawer
      sx={{
        [`& .${paperClasses.root}`]: {
          position: 'static',
        },
      }}
      variant='permanent'
      anchor='left'
    >
      <Toolbar />
      <List>
        {role === 2 ? (
          <ListItem>
            <SyledButton onClick={() => onClickButton(AppRoutes.MIS_USUARIOS)}>
              <ListItemText primary='Mis Usuarios' />
            </SyledButton>
          </ListItem>
        ) : (
          <>
            <ListItem>
              <SyledButton onClick={() => onClickButton(AppRoutes.NUEVO_TRABAJO)}>
                <ListItemIcon>
                  <WorkIcon />
                </ListItemIcon>
                <ListItemText primary='Nuevo Trabajo' />
              </SyledButton>
            </ListItem>

            <ListItem>
              <SyledButton onClick={() => onClickButton(AppRoutes.MIS_TRABAJOS)}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary='Mis Trabajos' />
              </SyledButton>
            </ListItem>

            <ListItem>
              <SyledButton onClick={() => onClickButton(AppRoutes.MIS_CLIENTES)}>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary='Mis Clientes' />
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
  [`&.${buttonClasses.root}`]: {
    justifyContent: 'normal',
  },
  '&:hover': {
    backgroundColor: ThemePalette.LIME,
  },
}));

export default SideBar;
