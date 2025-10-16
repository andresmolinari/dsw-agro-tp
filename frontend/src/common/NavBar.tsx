import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Stack,
  IconButton,
  styled,
  Toolbar,
  Typography,

} from "@mui/material";
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../types/AppRoutes";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

interface NavBarProps {
  onMenuClick?: () => void; // para abrir el drawer en móviles
}

export const NavBar: React.FC<NavBarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [username, setUsername] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem("token");
      if (token) {
        interface DecodedToken {
          usuarioNombre: string;
        }
        const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
        setUsername(decodedToken?.usuarioNombre || null);
      }
    }
  }, [isAuthenticated]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);
  const handleProfile = () => {
    navigate(AppRoutes.PROFILE);
    handleMenuClose();
  };
  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    handleMenuClose();
    navigate(AppRoutes.HOME);
  };
  const handleAgroClick = () => navigate(AppRoutes.HOME);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Container>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Box display="flex" alignItems="center">
                {onMenuClick && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={onMenuClick}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                )}
                <Typography
                  variant="h6"
                  onClick={handleAgroClick}
                  sx={{ cursor: "pointer" }}
                >
                  Agro
                </Typography>
              </Box>

              <Stack direction="row" spacing={2} alignItems="center">
                {isAuthenticated ? (
                  <>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      onClick={handleMenuOpen}
                      sx={{ cursor: "pointer" }}
                    >
                      <AccountCircle />
                      <Typography variant="body1">{username}</Typography>
                    </Stack>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleProfile}>Ver perfil</MenuItem>
                      <LogoutMenuItem onClick={handleLogout}>
                        Cerrar sesión
                      </LogoutMenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      onClick={() => navigate(AppRoutes.LOGIN)}
                    >
                      Login
                    </Button>
                    <RegisterButton
                      onClick={() => navigate(AppRoutes.REGISTER)}
                    >
                      Register
                    </RegisterButton>
                  </>
                )}
              </Stack>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const RegisterButton = styled(Button)(({ theme }) => ({
  backgroundColor: "rgba(255,255,255,0.1)",
  color: "#333",
  borderColor: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#222",
  },
}));

const LogoutMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.error.main,
}));

export default NavBar;
