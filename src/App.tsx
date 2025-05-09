import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Layout-Komponente importieren
import AppLayout from './components/AppLayout';

// Seiten importieren
import Dashboard from './pages/Dashboard';
import MachinesPage from './pages/MachinesPage';
import PartsPage from './pages/PartsPage';

// Theme für die Anwendung erstellen
const theme = createTheme({
  palette: {
    primary: {
      main: '#0066CC', // Primärfarbe aus dem Design-Konzept
    },
    secondary: {
      main: '#FF8800', // Sekundärfarbe aus dem Design-Konzept
    },
    background: {
      default: '#F5F7FA', // Hintergrundfarbe aus dem Design-Konzept
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 500,
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* CSS-Reset für konsistentes Styling */}
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/machines" element={<MachinesPage />} />
            <Route path="/parts" element={<PartsPage />} />
            <Route path="*" element={<Dashboard />} /> {/* Fallback-Route */}
          </Routes>
        </AppLayout>
      </Router>
    </ThemeProvider>
  );
};

export default App;