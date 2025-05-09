import React from 'react';
import { Typography, Box, Paper, Grid } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard: Wartungsteile-Management
      </Typography>
      
      <Grid container spacing={3}>
        {/* Karte für anstehende Wartungen */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Typography variant="h6" gutterBottom>
              Anstehende Wartungen
            </Typography>
            <Typography variant="body2">
              Keine anstehenden Wartungen für heute
            </Typography>
          </Paper>
        </Grid>

        {/* Karte für aktuelle Einsätze */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Typography variant="h6" gutterBottom>
              Aktuelle Einsätze
            </Typography>
            <Typography variant="body2">
              Keine aktuellen Einsätze
            </Typography>
          </Paper>
        </Grid>

        {/* Karte für KPIs */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Typography variant="h6" gutterBottom>
              Kennzahlen
            </Typography>
            <Typography variant="body2">
              Gesamtzahl Maschinen: 0
            </Typography>
            <Typography variant="body2">
              Kritische Wartungsteile: 0
            </Typography>
          </Paper>
        </Grid>

        {/* Karte für Maschinenstatus */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Maschinen nach Status
            </Typography>
            <Typography variant="body2">
              Keine Daten verfügbar
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;