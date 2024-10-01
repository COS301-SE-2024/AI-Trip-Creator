// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import Flights from '../components/dashboard/flights'; 
// import { getFlightOffers } from '../components/dashboard/flights';

// // Mock the getFlightOffers function
// jest.mock('../components/dashboard/flights', () => ({
//   ...jest.requireActual('../components/dashboard/flights'),
//   getFlightOffers: jest.fn(),
// }));

// describe('Flights Component', () => {
//   beforeEach(() => {
//     getFlightOffers.mockClear();
//   });

//   test('renders the search form', () => {
//     render(<Flights />);

//     // Check if form fields and search button are rendered
//     expect(screen.getByLabelText('Origin')).toBeInTheDocument();
//     expect(screen.getByLabelText('Destination')).toBeInTheDocument();
//     expect(screen.getByLabelText('Departure Date')).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: 'Search Flights' })).toBeInTheDocument();
//   });

//   test('displays error message if origin and destination are the same', async () => {
//     render(<Flights />);

//     const originSelect = screen.getByLabelText('Origin');
//     const destinationSelect = screen.getByLabelText('Destination');
//     const departureDateInput = screen.getByLabelText('Departure Date');
//     const searchButton = screen.getByRole('button', { name: 'Search Flights' });

//     // Simulate user input
//     fireEvent.change(originSelect, { target: { value: 'JNB' } });
//     fireEvent.change(destinationSelect, { target: { value: 'JNB' } });
//     fireEvent.change(departureDateInput, { target: { value: '2024-10-10' } });

//     // Click search button
//     fireEvent.click(searchButton);

//     // Assert error message is shown
//     expect(await screen.findByText('Origin and destination cannot be the same.')).toBeInTheDocument();
//   });

//   test('calls getFlightOffers when form is valid', async () => {
//     getFlightOffers.mockResolvedValueOnce([
//       {
//         itineraries: [
//           { segments: [{ departure: { iataCode: 'JNB', at: '2024-10-10T10:00' }, arrival: { iataCode: 'CPT', at: '2024-10-10T12:00' }, carrierCode: 'SA' }] }
//         ],
//         price: { total: '1000', currency: 'EUR' }
//       }
//     ]);

//     render(<Flights />);

//     const originSelect = screen.getByLabelText('Origin');
//     const destinationSelect = screen.getByLabelText('Destination');
//     const departureDateInput = screen.getByLabelText('Departure Date');
//     const searchButton = screen.getByRole('button', { name: 'Search Flights' });

//     // Simulate user input
//     fireEvent.change(originSelect, { target: { value: 'JNB' } });
//     fireEvent.change(destinationSelect, { target: { value: 'CPT' } });
//     fireEvent.change(departureDateInput, { target: { value: '2024-10-10' } });

//     // Click search button
//     fireEvent.click(searchButton);

//     // Assert getFlightOffers is called with correct parameters
//     await waitFor(() => {
//       expect(getFlightOffers).toHaveBeenCalledWith('JNB', 'CPT', '2024-10-10', 1, 9);
//     });

//     // Assert that a flight card is displayed
//     expect(await screen.findByText('JNB to CPT')).toBeInTheDocument();
//     expect(screen.getByText('Total Price: 1000 EUR')).toBeInTheDocument();
//   });
// });

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Flights from '../components/dashboard/flights'; // Adjust path as necessary
import { getFlightOffers } from '../components/dashboard/flights';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill for Jest environment
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock the getFlightOffers function
jest.mock('../components/dashboard/flights', () => ({
  ...jest.requireActual('../components/dashboard/flights'),
  getFlightOffers: jest.fn(),
}));

describe('Flights Component', () => {
  beforeEach(() => {
    getFlightOffers.mockClear();
  });

  test('renders the search form', () => {
    render(<Flights />);

    // Check if form fields and search button are rendered
    expect(screen.getByLabelText('Origin')).toBeInTheDocument();
    expect(screen.getByLabelText('Destination')).toBeInTheDocument();
    expect(screen.getByLabelText('Departure Date')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search Flights' })).toBeInTheDocument();
  });

  test('displays error message if origin and destination are the same', async () => {
    render(<Flights />);

    const originSelect = screen.getByLabelText('Origin');
    const destinationSelect = screen.getByLabelText('Destination');
    const departureDateInput = screen.getByLabelText('Departure Date');
    const searchButton = screen.getByRole('button', { name: 'Search Flights' });

    // Simulate user input
    fireEvent.change(originSelect, { target: { value: 'JNB' } });
    fireEvent.change(destinationSelect, { target: { value: 'JNB' } });
    fireEvent.change(departureDateInput, { target: { value: '2024-10-10' } });

    // Click search button
    fireEvent.click(searchButton);

    // Assert error message is shown
    expect(await screen.findByText('Origin and destination cannot be the same.')).toBeInTheDocument();
  });

  test('calls getFlightOffers when form is valid', async () => {
    getFlightOffers.mockResolvedValueOnce([
      {
        itineraries: [
          { segments: [{ departure: { iataCode: 'JNB', at: '2024-10-10T10:00' }, arrival: { iataCode: 'CPT', at: '2024-10-10T12:00' }, carrierCode: 'SA' }] }
        ],
        price: { total: '1000', currency: 'EUR' }
      }
    ]);

    render(<Flights />);

    const originSelect = screen.getByLabelText('Origin');
    const destinationSelect = screen.getByLabelText('Destination');
    const departureDateInput = screen.getByLabelText('Departure Date');
    const searchButton = screen.getByRole('button', { name: 'Search Flights' });

    // Simulate user input
    fireEvent.change(originSelect, { target: { value: 'JNB' } });
    fireEvent.change(destinationSelect, { target: { value: 'CPT' } });
    fireEvent.change(departureDateInput, { target: { value: '2024-10-10' } });

    // Click search button
    fireEvent.click(searchButton);

    // Assert getFlightOffers is called with correct parameters
    await waitFor(() => {
      expect(getFlightOffers).toHaveBeenCalledWith('JNB', 'CPT', '2024-10-10', 1, 9);
    });

    // Assert that a flight card is displayed
    expect(await screen.findByText('JNB to CPT')).toBeInTheDocument();
    expect(screen.getByText('Total Price: 1000 EUR')).toBeInTheDocument();
  });
});
