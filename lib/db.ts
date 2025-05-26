import { Aircraft, AircraftStatus } from './types';

// Initial mock data
const initialAircraft: Aircraft[] = [
  {
    id: '1',
    tailNumber: 'N123AB',
    model: 'Boeing 737-800',
    status: 'available',
    location: {
      latitude: 37.6213,
      longitude: -122.3790,
      name: 'San Francisco International Airport'
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: '2',
    tailNumber: 'N456CD',
    model: 'Airbus A320',
    status: 'maintenance',
    location: {
      latitude: 33.9416,
      longitude: -118.4085,
      name: 'Los Angeles International Airport'
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: '3',
    tailNumber: 'N789EF',
    model: 'Bombardier Global 6000',
    status: 'available',
    location: {
      latitude: 40.6413,
      longitude: -73.7781,
      name: 'John F. Kennedy International Airport'
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: '4',
    tailNumber: 'N101GH',
    model: 'Cessna Citation X',
    status: 'aog',
    location: {
      latitude: 25.7933,
      longitude: -80.2906,
      name: 'Miami International Airport'
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: '5',
    tailNumber: 'N202IJ',
    model: 'Gulfstream G650',
    status: 'available',
    location: {
      latitude: 32.8998,
      longitude: -97.0403,
      name: 'Dallas/Fort Worth International Airport'
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: '6',
    tailNumber: 'N303KL',
    model: 'Embraer Phenom 300',
    status: 'maintenance',
    location: {
      latitude: 41.9742,
      longitude: -87.9073,
      name: 'O\'Hare International Airport'
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: '7',
    tailNumber: 'N404MN',
    model: 'Boeing 787-9',
    status: 'available',
    location: {
      latitude: 47.4502,
      longitude: -122.3088,
      name: 'Seattle-Tacoma International Airport'
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: '8',
    tailNumber: 'N505OP',
    model: 'Airbus A350-900',
    status: 'aog',
    location: {
      latitude: 35.2140,
      longitude: -80.9431,
      name: 'Charlotte Douglas International Airport'
    },
    lastUpdated: new Date().toISOString()
  }
];

// Local storage key
const STORAGE_KEY = 'aircraft-fleet-data';

// Load data from localStorage (client-side only)
export const loadAircraft = (): Aircraft[] => {
  if (typeof window !== 'undefined') {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
  }
  return initialAircraft;
};

// Save data to localStorage (client-side only)
export const saveAircraft = (data: Aircraft[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

// Update aircraft status
export const updateAircraftStatus = (id: string, status: AircraftStatus): Aircraft[] => {
  const aircraftList = loadAircraft();
  const updatedList = aircraftList.map(aircraft => {
    if (aircraft.id === id) {
      return { 
        ...aircraft, 
        status, 
        lastUpdated: new Date().toISOString() 
      };
    }
    return aircraft;
  });
  
  saveAircraft(updatedList);
  return updatedList;
};

// Get all aircraft
export const getAllAircraft = (): Aircraft[] => {
  return loadAircraft();
};

// Get ready-to-fly aircraft (status === 'available')
export const getReadyAircraft = (): Aircraft[] => {
  const aircraftList = loadAircraft();
  return aircraftList.filter(aircraft => aircraft.status === 'available');
};

// Get aircraft by status
export const getAircraftByStatus = (status: AircraftStatus): Aircraft[] => {
  const aircraftList = loadAircraft();
  return aircraftList.filter(aircraft => aircraft.status === status);
};

// Get aircraft by tail number
export const getAircraftByTailNumber = (tailNumber: string): Aircraft[] => {
  const aircraftList = loadAircraft();
  return aircraftList.filter(aircraft => 
    aircraft.tailNumber.toLowerCase().includes(tailNumber.toLowerCase())
  );
};

// Get aircraft by model
export const getAircraftByModel = (model: string): Aircraft[] => {
  const aircraftList = loadAircraft();
  return aircraftList.filter(aircraft => 
    aircraft.model.toLowerCase().includes(model.toLowerCase())
  );
};