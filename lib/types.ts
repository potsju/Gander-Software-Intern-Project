export type AircraftStatus = 'available' | 'maintenance' | 'aog';

export interface Aircraft {
  id: string;
  tailNumber: string;
  model: string;
  status: AircraftStatus;
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
  lastUpdated: string;
}