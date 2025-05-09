import axios from 'axios';

// Basis-URL für unsere API
const API_BASE_URL = 'https://localhost:7024/api';

// Axios-Instance mit Standard-Konfiguration erstellen
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Typen für Maschinen
export interface Machine {
  id: string;
  machineNumber: string;
  type: string;
  installationDate: string;
  operatingHours: number;
  magazineType?: string;
  materialBarLength?: number;
  hasSynchronizationDevice?: boolean;
  feedChannel?: string;
  feedRod?: string;
  maintenanceRecords?: MaintenanceRecord[];
}

export interface MaintenanceRecord {
  id: string;
  performedAt: string;
  technicianId: string;
  technicianName?: string;
  maintenanceType: string;
  comments?: string;
  replacedParts?: ReplacedPart[];
}

export interface ReplacedPart {
  id: string;
  partId: string;
  partName?: string;
  quantity: number;
  machineOperatingHoursAtReplacement: number;
}

// Typen für Wartungsteile
export interface MaintenancePart {
  id: string;
  partNumber: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  stock: number;
  minimumStock: number;
}

// API-Funktionen für Maschinen
export const MachinesAPI = {
  // Alle Maschinen abrufen
  getAll: async (): Promise<Machine[]> => {
    const response = await apiClient.get('/Machines');
    return response.data;
  },

  // Maschine nach ID abrufen
  getById: async (id: string): Promise<Machine> => {
    const response = await apiClient.get(`/Machines/id/${id}`);
    return response.data;
  },

  // Maschine nach Nummer abrufen
  getByNumber: async (machineNumber: string): Promise<Machine> => {
    const response = await apiClient.get(`/Machines/number/${machineNumber}`);
    return response.data;
  },

  // Neue Maschine erstellen
  create: async (machine: Partial<Machine>): Promise<Machine> => {
    const response = await apiClient.post('/Machines', machine);
    return response.data;
  },

  // Maschine aktualisieren
  update: async (id: string, machine: Partial<Machine>): Promise<Machine> => {
    const response = await apiClient.put(`/Machines/${id}`, machine);
    return response.data;
  },

  // Betriebsstunden aktualisieren
  updateOperatingHours: async (id: string, hours: number): Promise<void> => {
    await apiClient.put(`/Machines/${id}/operatinghours`, { operatingHours: hours });
  },

  // Magazin-Eigenschaften aktualisieren
  updateMagazineProperties: async (
    id: string, 
    properties: {
      magazineType: string;
      materialBarLength: number;
      hasSynchronizationDevice: boolean;
      feedChannel: string;
      feedRod: string;
    }
  ): Promise<void> => {
    await apiClient.put(`/Machines/${id}/magazine`, properties);
  },

  // Wartung durchführen
  performMaintenance: async (
    id: string,
    maintenance: {
      technicianId: string;
      maintenanceType: string;
      comments?: string;
      replacedParts?: { partId: string; quantity: number }[];
    }
  ): Promise<void> => {
    await apiClient.post(`/Machines/${id}/maintenance`, maintenance);
  },

  // Maschine löschen
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/Machines/${id}`);
  },
};

// API-Funktionen für Wartungsteile
export const MaintenancePartsAPI = {
  // Alle Wartungsteile abrufen
  getAll: async (): Promise<MaintenancePart[]> => {
    const response = await apiClient.get('/MaintenanceParts');
    return response.data;
  },

  // Wartungsteil nach ID abrufen
  getById: async (id: string): Promise<MaintenancePart> => {
    const response = await apiClient.get(`/MaintenanceParts/id/${id}`);
    return response.data;
  },

  // Wartungsteil nach Teilenummer abrufen
  getByPartNumber: async (partNumber: string): Promise<MaintenancePart> => {
    const response = await apiClient.get(`/MaintenanceParts/partnumber/${partNumber}`);
    return response.data;
  },

  // Neues Wartungsteil erstellen
  create: async (part: Partial<MaintenancePart>): Promise<MaintenancePart> => {
    const response = await apiClient.post('/MaintenanceParts', part);
    return response.data;
  },

  // Wartungsteil aktualisieren
  update: async (id: string, part: Partial<MaintenancePart>): Promise<MaintenancePart> => {
    const response = await apiClient.put(`/MaintenanceParts/${id}`, part);
    return response.data;
  },

  // Wartungsteil löschen
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/MaintenanceParts/${id}`);
  },

  // Wartungsteileliste für eine Maschine abrufen
  getListForMachine: async (machineNumber: string): Promise<MaintenancePart[]> => {
    const response = await apiClient.get(`/MaintenancePartsList/machine/${machineNumber}`);
    return response.data;
  },
};

export default {
  Machines: MachinesAPI,
  MaintenanceParts: MaintenancePartsAPI,
};