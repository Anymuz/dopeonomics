export const defaultDealers = [
  { id: 1, name: 'Benji Coleman', location: 'Motel Room 2', buyin: 500, cut: 20, maxCustomers: 8, active: false },
  { id: 2, name: 'Molly Presley', location: 'Brown Apartment', buyin: 1000, cut: 20, maxCustomers: 8, active: false },
  { id: 3, name: 'Brad Crosby', location: 'Parking Garage', buyin: 2000, cut: 20, maxCustomers: 8, active: false },
  { id: 4, name: 'Jane Lucero', location: 'Docks RV', buyin: 3000, cut: 20, maxCustomers: 8, active: false },
  { id: 5, name: 'Wei Long', location: 'Suburbia Shack', buyin: 4000, cut: 20, maxCustomers: 8, active: false },
  { id: 6, name: 'Leo Rivers', location: 'Near Church', buyin: 5000, cut: 20, maxCustomers: 8, active: false }
];

export const crewTypes = ['Breeder', 'Grower', 'Dealer', 'Transporter'];

// Crew cost data
export const crewCosts = {
  botanist: { initial: 1500, daily: 200 },
  cleaner: { initial: 1200, daily: 100 },
  handler: { initial: 1500, daily: 200 },
  chemist: { initial: 1800, daily: 300 }
};

export const startCrew = {
  botanist: 0,
  cleaner: 0,
  handler: 0,
  chemist: 0
};