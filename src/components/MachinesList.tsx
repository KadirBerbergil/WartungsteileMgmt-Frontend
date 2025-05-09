import React, { useEffect, useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  CircularProgress,
  Button,
  Typography,
  Box
} from '@mui/material';
import { Machine, MachinesAPI } from '../services/api';

const MachinesList: React.FC = () => {
  // Zustand für die Maschinenliste
  const [machines, setMachines] = useState<Machine[]>([]);
  
  // Zustand für Ladevorgang
  const [loading, setLoading] = useState<boolean>(true);
  
  // Zustand für Fehlerbehandlung
  const [error, setError] = useState<string | null>(null);

  // Funktion zum Laden der Maschinen
  const loadMachines = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // API-Aufruf zum Abrufen aller Maschinen
      const data = await MachinesAPI.getAll();
      setMachines(data);
    } catch (err) {
      console.error('Fehler beim Laden der Maschinen:', err);
      setError('Maschinen konnten nicht geladen werden. Bitte versuchen Sie es später erneut.');
    } finally {
      setLoading(false);
    }
  };

  // Effekt zum Laden der Maschinen beim ersten Rendern
  useEffect(() => {
    loadMachines();
  }, []);

  // Renderfunktion für den Ladezustand
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Box>
    );
  }

  // Renderfunktion für Fehlerfall
  if (error) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" padding={3}>
        <Typography color="error" gutterBottom>{error}</Typography>
        <Button variant="contained" onClick={loadMachines}>Erneut versuchen</Button>
      </Box>
    );
  }

  // Renderfunktion für leere Liste
  if (machines.length === 0) {
    return (
      <Box display="flex" justifyContent="center" padding={3}>
        <Typography>Keine Maschinen gefunden</Typography>
      </Box>
    );
  }

  // Hauptrenderfunktion für die Tabelle
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Maschinen-Tabelle">
        <TableHead>
          <TableRow>
            <TableCell>Maschinennummer</TableCell>
            <TableCell>Typ</TableCell>
            <TableCell>Installationsdatum</TableCell>
            <TableCell>Betriebsstunden</TableCell>
            <TableCell>Magazintyp</TableCell>
            <TableCell>Aktionen</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {machines.map((machine) => (
            <TableRow key={machine.id}>
              <TableCell>{machine.machineNumber}</TableCell>
              <TableCell>{machine.type}</TableCell>
              <TableCell>{new Date(machine.installationDate).toLocaleDateString()}</TableCell>
              <TableCell>{machine.operatingHours}</TableCell>
              <TableCell>{machine.magazineType || 'Nicht angegeben'}</TableCell>
              <TableCell>
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={() => {
                    // Hier später: Navigation zur Detailansicht
                    console.log('Details anzeigen für:', machine.id);
                  }}
                >
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MachinesList;