import React from 'react';
import { 
  AppBar, 
  Box, 
  CssBaseline, 
  Divider, 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  ListItemButton, // Neu hinzugefügt
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BuildIcon from '@mui/icons-material/Build';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SupportIcon from '@mui/icons-material/Support';
import { Link, useLocation } from 'react-router-dom';

// Breite des Navigations-Drawers
const drawerWidth = 240;

// Menüeinträge mit Namen, Icon und Link-Pfad
const menuItems = [
  { name: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { name: 'Maschinen', icon: <LocalShippingIcon />, path: '/machines' },
  { name: 'Wartungsteile', icon: <BuildIcon />, path: '/parts' },
  { name: 'Berichte', icon: <AssignmentIcon />, path: '/reports' },
  { name: 'Support', icon: <SupportIcon />, path: '/support' },
  { name: 'Einstellungen', icon: <SettingsIcon />, path: '/settings' },
];

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Seitenleiste (Drawer) erstellen
  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Wartungsteile
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link} 
              to={item.path}
              selected={location.pathname === item.path}
              onClick={() => isMobile && setMobileOpen(false)}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Top-Navigationsleiste */}
      <AppBar 
        position="fixed" 
        sx={{ 
          width: { md: `calc(100% - ${drawerWidth}px)` }, 
          ml: { md: `${drawerWidth}px` },
          bgcolor: '#0066CC' // Primärfarbe aus dem Design-Konzept
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Navigation öffnen"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Wartungsteile-Management-System
          </Typography>
        </Toolbar>
      </AppBar>
      
      {/* Navigation für mobile Ansicht */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Bessere Performance auf Mobilgeräten
          }}
          sx={{
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      
      {/* Hauptinhalt */}
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: '64px' // Abstand zur Top-Bar
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;