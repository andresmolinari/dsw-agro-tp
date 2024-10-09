import { forwardRef } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  ListItemIcon,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import { Link, LinkProps } from 'react-router-dom';

const drawerWidth = 240;

const ListItemLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link ref={ref} {...props} />
));

const SideBar = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant='permanent'
      anchor='left'
    >
      <Toolbar />
      <List>
        {/* Botón Nuevo Trabajo */}
        <ListItem button component={ListItemLink as any} to='/nuevo-trabajo'>
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary='Nuevo Trabajo' />
        </ListItem>

        {/* Botón Mis Trabajos */}
        <ListItem button component={ListItemLink as any} to='/mis-trabajos'>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary='Mis Trabajos' />
        </ListItem>

        {/* Botón Mis Clientes */}
        <ListItem button component={ListItemLink as any} to='/mis-clientes'>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary='Mis Clientes' />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideBar;
