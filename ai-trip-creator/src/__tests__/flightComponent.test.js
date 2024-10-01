// // // // // // // import React from 'react';
// // // // // // // import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// // // // // // // import Flights from '../components/dashboard/flights'; 
// // // // // // // import { getFlightOffers } from '../components/dashboard/flights';

// // // // // // // // Mock the getFlightOffers function
// // // // // // // jest.mock('../components/dashboard/flights', () => ({
// // // // // // //   ...jest.requireActual('../components/dashboard/flights'),
// // // // // // //   getFlightOffers: jest.fn(),
// // // // // // // }));

// // // // // // // describe('Flights Component', () => {
// // // // // // //   beforeEach(() => {
// // // // // // //     getFlightOffers.mockClear();
// // // // // // //   });

// // // // // // //   test('renders the search form', () => {
// // // // // // //     render(<Flights />);

// // // // // // //     // Check if form fields and search button are rendered
// // // // // // //     expect(screen.getByLabelText('Origin')).toBeInTheDocument();
// // // // // // //     expect(screen.getByLabelText('Destination')).toBeInTheDocument();
// // // // // // //     expect(screen.getByLabelText('Departure Date')).toBeInTheDocument();
// // // // // // //     expect(screen.getByRole('button', { name: 'Search Flights' })).toBeInTheDocument();
// // // // // // //   });

// // // // // // //   test('displays error message if origin and destination are the same', async () => {
// // // // // // //     render(<Flights />);

// // // // // // //     const originSelect = screen.getByLabelText('Origin');
// // // // // // //     const destinationSelect = screen.getByLabelText('Destination');
// // // // // // //     const departureDateInput = screen.getByLabelText('Departure Date');
// // // // // // //     const searchButton = screen.getByRole('button', { name: 'Search Flights' });

// // // // // // //     // Simulate user input
// // // // // // //     fireEvent.change(originSelect, { target: { value: 'JNB' } });
// // // // // // //     fireEvent.change(destinationSelect, { target: { value: 'JNB' } });
// // // // // // //     fireEvent.change(departureDateInput, { target: { value: '2024-10-10' } });

// // // // // // //     // Click search button
// // // // // // //     fireEvent.click(searchButton);

// // // // // // //     // Assert error message is shown
// // // // // // //     expect(await screen.findByText('Origin and destination cannot be the same.')).toBeInTheDocument();
// // // // // // //   });

// // // // // // //   test('calls getFlightOffers when form is valid', async () => {
// // // // // // //     getFlightOffers.mockResolvedValueOnce([
// // // // // // //       {
// // // // // // //         itineraries: [
// // // // // // //           { segments: [{ departure: { iataCode: 'JNB', at: '2024-10-10T10:00' }, arrival: { iataCode: 'CPT', at: '2024-10-10T12:00' }, carrierCode: 'SA' }] }
// // // // // // //         ],
// // // // // // //         price: { total: '1000', currency: 'EUR' }
// // // // // // //       }
// // // // // // //     ]);

// // // // // // //     render(<Flights />);

// // // // // // //     const originSelect = screen.getByLabelText('Origin');
// // // // // // //     const destinationSelect = screen.getByLabelText('Destination');
// // // // // // //     const departureDateInput = screen.getByLabelText('Departure Date');
// // // // // // //     const searchButton = screen.getByRole('button', { name: 'Search Flights' });

// // // // // // //     // Simulate user input
// // // // // // //     fireEvent.change(originSelect, { target: { value: 'JNB' } });
// // // // // // //     fireEvent.change(destinationSelect, { target: { value: 'CPT' } });
// // // // // // //     fireEvent.change(departureDateInput, { target: { value: '2024-10-10' } });

// // // // // // //     // Click search button
// // // // // // //     fireEvent.click(searchButton);

// // // // // // //     // Assert getFlightOffers is called with correct parameters
// // // // // // //     await waitFor(() => {
// // // // // // //       expect(getFlightOffers).toHaveBeenCalledWith('JNB', 'CPT', '2024-10-10', 1, 9);
// // // // // // //     });

// // // // // // //     // Assert that a flight card is displayed
// // // // // // //     expect(await screen.findByText('JNB to CPT')).toBeInTheDocument();
// // // // // // //     expect(screen.getByText('Total Price: 1000 EUR')).toBeInTheDocument();
// // // // // // //   });
// // // // // // // });

// // // // // // import React from 'react';
// // // // // // import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// // // // // // import Flights from '../components/dashboard/flights'; // Adjust path as necessary
// // // // // // import { getFlightOffers } from '../components/dashboard/flights';
// // // // // // import { TextEncoder, TextDecoder } from 'util';

// // // // // // // Polyfill for Jest environment
// // // // // // global.TextEncoder = TextEncoder;
// // // // // // global.TextDecoder = TextDecoder;

// // // // // // // Mock the getFlightOffers function
// // // // // // jest.mock('../components/dashboard/flights', () => ({
// // // // // //   ...jest.requireActual('../components/dashboard/flights'),
// // // // // //   getFlightOffers: jest.fn(),
// // // // // // }));

// // // // // // describe('Flights Component', () => {
// // // // // //   beforeEach(() => {
// // // // // //     getFlightOffers.mockClear();
// // // // // //   });

// // // // // //   test('renders the search form', () => {
// // // // // //     render(<Flights />);

// // // // // //     // Check if form fields and search button are rendered
// // // // // //     expect(screen.getByLabelText('Origin')).toBeInTheDocument();
// // // // // //     expect(screen.getByLabelText('Destination')).toBeInTheDocument();
// // // // // //     expect(screen.getByLabelText('Departure Date')).toBeInTheDocument();
// // // // // //     expect(screen.getByRole('button', { name: 'Search Flights' })).toBeInTheDocument();
// // // // // //   });

// // // // // //   test('displays error message if origin and destination are the same', async () => {
// // // // // //     render(<Flights />);

// // // // // //     const originSelect = screen.getByLabelText('Origin');
// // // // // //     const destinationSelect = screen.getByLabelText('Destination');
// // // // // //     const departureDateInput = screen.getByLabelText('Departure Date');
// // // // // //     const searchButton = screen.getByRole('button', { name: 'Search Flights' });

// // // // // //     // Simulate user input
// // // // // //     fireEvent.change(originSelect, { target: { value: 'JNB' } });
// // // // // //     fireEvent.change(destinationSelect, { target: { value: 'JNB' } });
// // // // // //     fireEvent.change(departureDateInput, { target: { value: '2024-10-10' } });

// // // // // //     // Click search button
// // // // // //     fireEvent.click(searchButton);

// // // // // //     // Assert error message is shown
// // // // // //     expect(await screen.findByText('Origin and destination cannot be the same.')).toBeInTheDocument();
// // // // // //   });

// // // // // //   test('calls getFlightOffers when form is valid', async () => {
// // // // // //     getFlightOffers.mockResolvedValueOnce([
// // // // // //       {
// // // // // //         itineraries: [
// // // // // //           { segments: [{ departure: { iataCode: 'JNB', at: '2024-10-10T10:00' }, arrival: { iataCode: 'CPT', at: '2024-10-10T12:00' }, carrierCode: 'SA' }] }
// // // // // //         ],
// // // // // //         price: { total: '1000', currency: 'EUR' }
// // // // // //       }
// // // // // //     ]);

// // // // // //     render(<Flights />);

// // // // // //     const originSelect = screen.getByLabelText('Origin');
// // // // // //     const destinationSelect = screen.getByLabelText('Destination');
// // // // // //     const departureDateInput = screen.getByLabelText('Departure Date');
// // // // // //     const searchButton = screen.getByRole('button', { name: 'Search Flights' });

// // // // // //     // Simulate user input
// // // // // //     fireEvent.change(originSelect, { target: { value: 'JNB' } });
// // // // // //     fireEvent.change(destinationSelect, { target: { value: 'CPT' } });
// // // // // //     fireEvent.change(departureDateInput, { target: { value: '2024-10-10' } });

// // // // // //     // Click search button
// // // // // //     fireEvent.click(searchButton);

// // // // // //     // Assert getFlightOffers is called with correct parameters
// // // // // //     await waitFor(() => {
// // // // // //       expect(getFlightOffers).toHaveBeenCalledWith('JNB', 'CPT', '2024-10-10', 1, 9);
// // // // // //     });

// // // // // //     // Assert that a flight card is displayed
// // // // // //     expect(await screen.findByText('JNB to CPT')).toBeInTheDocument();
// // // // // //     expect(screen.getByText('Total Price: 1000 EUR')).toBeInTheDocument();
// // // // // //   });
// // // // // // });

// // // // // import React from 'react';
// // // // // import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// // // // // import { BrowserRouter as Router } from 'react-router-dom'; // Ensure proper routing
// // // // // import Flights from '../components/dashboard/flights'; // Adjust the path if necessary
// // // // // import { initializeApp } from 'firebase/app';
// // // // // import { getAuth } from 'firebase/auth';
// // // // // import { getFirestore } from 'firebase/firestore';

// // // // // // Mock Firebase initialization
// // // // // jest.mock('firebase/app', () => ({
// // // // //   initializeApp: jest.fn(),
// // // // // }));

// // // // // // Mock Firebase auth and Firestore functions
// // // // // jest.mock('firebase/auth', () => ({
// // // // //   getAuth: jest.fn(),
// // // // // }));

// // // // // jest.mock('firebase/firestore', () => ({
// // // // //   getFirestore: jest.fn(),
// // // // // }));

// // // // // // Mock the firebase-config.js to prevent real Firebase initialization
// // // // // jest.mock('../firebase/firebase-config', () => ({
// // // // //   app: {}, // Mock Firebase app object
// // // // //   auth: {}, // Mock Firebase Auth
// // // // //   firestore: {}, // Mock Firestore
// // // // //   db: {}, // Mock Firestore instance
// // // // //   analytics: {}, // Mock Analytics
// // // // // }));

// // // // // // Mock getFlightOffers function
// // // // // jest.mock('../components/dashboard/flights', () => ({
// // // // //   ...jest.requireActual('../components/dashboard/flights'),
// // // // //   getFlightOffers: jest.fn(),
// // // // // }));

// // // // // describe('Flights Component', () => {
// // // // //   beforeEach(() => {
// // // // //     jest.clearAllMocks(); // Clear all mocks before each test
// // // // //     initializeApp.mockReturnValue({}); // Mock an empty Firebase app object
// // // // //   });

// // // // //   test('renders the Flights component', () => {
// // // // //     render(
// // // // //       <Router>
// // // // //         <Flights />
// // // // //       </Router>
// // // // //     );

// // // // //     // Check if form fields and search button are rendered
// // // // //     expect(screen.getByLabelText('Origin')).toBeInTheDocument();
// // // // //     expect(screen.getByLabelText('Destination')).toBeInTheDocument();
// // // // //     expect(screen.getByLabelText('Departure Date')).toBeInTheDocument();
// // // // //     expect(screen.getByRole('button', { name: 'Search Flights' })).toBeInTheDocument();
// // // // //   });

// // // // //   test('displays error message if origin and destination are the same', async () => {
// // // // //     render(
// // // // //       <Router>
// // // // //         <Flights />
// // // // //       </Router>
// // // // //     );

// // // // //     const originSelect = screen.getByLabelText('Origin');
// // // // //     const destinationSelect = screen.getByLabelText('Destination');
// // // // //     const departureDateInput = screen.getByLabelText('Departure Date');
// // // // //     const searchButton = screen.getByRole('button', { name: 'Search Flights' });

// // // // //     // Simulate user input
// // // // //     fireEvent.change(originSelect, { target: { value: 'JNB' } });
// // // // //     fireEvent.change(destinationSelect, { target: { value: 'JNB' } });
// // // // //     fireEvent.change(departureDateInput, { target: { value: '2024-10-10' } });

// // // // //     // Click search button
// // // // //     fireEvent.click(searchButton);

// // // // //     // Assert error message is shown
// // // // //     expect(await screen.findByText('Origin and destination cannot be the same.')).toBeInTheDocument();
// // // // //   });

// // // // //   test('calls getFlightOffers when form is valid', async () => {
// // // // //     const getFlightOffers = require('../components/dashboard/flights').getFlightOffers;

// // // // //     // Mock the flight offers return value
// // // // //     getFlightOffers.mockResolvedValueOnce([
// // // // //       {
// // // // //         itineraries: [
// // // // //           { segments: [{ departure: { iataCode: 'JNB', at: '2024-10-10T10:00' }, arrival: { iataCode: 'CPT', at: '2024-10-10T12:00' }, carrierCode: 'SA' }] }
// // // // //         ],
// // // // //         price: { total: '1000', currency: 'EUR' }
// // // // //       }
// // // // //     ]);

// // // // //     render(
// // // // //       <Router>
// // // // //         <Flights />
// // // // //       </Router>
// // // // //     );

// // // // //     const originSelect = screen.getByLabelText('Origin');
// // // // //     const destinationSelect = screen.getByLabelText('Destination');
// // // // //     const departureDateInput = screen.getByLabelText('Departure Date');
// // // // //     const searchButton = screen.getByRole('button', { name: 'Search Flights' });

// // // // //     // Simulate user input
// // // // //     fireEvent.change(originSelect, { target: { value: 'JNB' } });
// // // // //     fireEvent.change(destinationSelect, { target: { value: 'CPT' } });
// // // // //     fireEvent.change(departureDateInput, { target: { value: '2024-10-10' } });

// // // // //     // Click search button
// // // // //     fireEvent.click(searchButton);

// // // // //     // Assert getFlightOffers is called with correct parameters
// // // // //     await waitFor(() => {
// // // // //       expect(getFlightOffers).toHaveBeenCalledWith('JNB', 'CPT', '2024-10-10', 1, 9);
// // // // //     });

// // // // //     // Assert that a flight card is displayed
// // // // //     expect(await screen.findByText('JNB to CPT')).toBeInTheDocument();
// // // // //     expect(screen.getByText('Total Price: 1000 EUR')).toBeInTheDocument();
// // // // //   });
// // // // // });

// // // // import React from "react";
// // // // import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// // // // import { BrowserRouter as Router } from "react-router-dom";
// // // // import Flights from "../components/dashboard/flights"; // Adjust the path if necessary

// // // // // Mock getFlightOffers function
// // // // jest.mock("../components/dashboard/flights", () => ({
// // // //   ...jest.requireActual("../components/dashboard/flights"),
// // // //   getFlightOffers: jest.fn(),
// // // // }));

// // // // describe("Flights Component", () => {
// // // //   beforeEach(() => {
// // // //     jest.clearAllMocks(); // Clear all mocks before each test
// // // //   });

// // // //   test("renders the Flights component", () => {
// // // //     render(
// // // //       <Router>
// // // //         <Flights />
// // // //       </Router>
// // // //     );

// // // //     // Check if form fields and search button are rendered
// // // //     expect(screen.getByLabelText(/Origin/i)).toBeInTheDocument();
// // // //     expect(screen.getByLabelText(/Destination/i)).toBeInTheDocument();
// // // //     expect(screen.getByLabelText(/Departure Date/i)).toBeInTheDocument();
// // // //     expect(screen.getByRole("button", { name: /Search Flights/i })).toBeInTheDocument();
// // // //   });

// // // //   test("displays error message if origin and destination are the same", async () => {
// // // //     render(
// // // //       <Router>
// // // //         <Flights />
// // // //       </Router>
// // // //     );

// // // //     const originSelect = screen.getByLabelText(/Origin/i);
// // // //     const destinationSelect = screen.getByLabelText(/Destination/i);
// // // //     const departureDateInput = screen.getByLabelText(/Departure Date/i);
// // // //     const searchButton = screen.getByRole("button", { name: /Search Flights/i });

// // // //     // Simulate user input
// // // //     fireEvent.change(originSelect, { target: { value: "JNB" } });
// // // //     fireEvent.change(destinationSelect, { target: { value: "JNB" } });
// // // //     fireEvent.change(departureDateInput, { target: { value: "2024-10-10" } });

// // // //     // Click search button
// // // //     fireEvent.click(searchButton);

// // // //     // Assert error message is shown
// // // //     expect(await screen.findByText(/Origin and destination cannot be the same./i)).toBeInTheDocument();
// // // //   });

// // // //   test("calls getFlightOffers when form is valid", async () => {
// // // //     const getFlightOffers = require("../components/dashboard/flights").getFlightOffers;

// // // //     // Mock the flight offers return value
// // // //     getFlightOffers.mockResolvedValueOnce([
// // // //       {
// // // //         itineraries: [
// // // //           { segments: [{ departure: { iataCode: "JNB", at: "2024-10-10T10:00" }, arrival: { iataCode: "CPT", at: "2024-10-10T12:00" }, carrierCode: "SA" }] }
// // // //         ],
// // // //         price: { total: "1000", currency: "EUR" },
// // // //         priceInZar: "19210.00",
// // // //       }
// // // //     ]);

// // // //     render(
// // // //       <Router>
// // // //         <Flights />
// // // //       </Router>
// // // //     );

// // // //     const originSelect = screen.getByLabelText(/Origin/i);
// // // //     const destinationSelect = screen.getByLabelText(/Destination/i);
// // // //     const departureDateInput = screen.getByLabelText(/Departure Date/i);
// // // //     const searchButton = screen.getByRole("button", { name: /Search Flights/i });

// // // //     // Simulate user input
// // // //     fireEvent.change(originSelect, { target: { value: "JNB" } });
// // // //     fireEvent.change(destinationSelect, { target: { value: "CPT" } });
// // // //     fireEvent.change(departureDateInput, { target: { value: "2024-10-10" } });

// // // //     // Click search button
// // // //     fireEvent.click(searchButton);

// // // //     // Assert getFlightOffers is called with correct parameters
// // // //     await waitFor(() => {
// // // //       expect(getFlightOffers).toHaveBeenCalledWith("JNB", "CPT", "2024-10-10", 1, 9);
// // // //     });

// // // //     // Assert that a flight card is displayed
// // // //     expect(await screen.findByText(/JNB to CPT/i)).toBeInTheDocument();
// // // //     expect(screen.getByText(/Total Price: 1000 EUR | 19210.00 ZAR/i)).toBeInTheDocument();
// // // //   });
// // // // });

// // // import React from "react";
// // // import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// // // import { BrowserRouter as Router } from "react-router-dom";
// // // // import Flights from "../components/dashboard/flights";
// // // import { Flights } from '../components/dashboard/flights';


// // // // Polyfill TextEncoder and TextDecoder
// // // import { TextEncoder, TextDecoder } from 'util';
// // // global.TextEncoder = TextEncoder;
// // // global.TextDecoder = TextDecoder;

// // // // Mock getFlightOffers function
// // // jest.mock("../components/dashboard/flights", () => ({
// // //   ...jest.requireActual("../components/dashboard/flights"),
// // //   getFlightOffers: jest.fn(),
// // // }));

// // // // Mock Firebase functionality
// // // jest.mock('firebase/auth', () => ({
// // //   getAuth: jest.fn(),
// // // }));

// // // jest.mock('firebase/firestore', () => ({
// // //   getFirestore: jest.fn(),
// // // }));

// // // describe("Flights Component", () => {
// // //   beforeEach(() => {
// // //     jest.clearAllMocks(); // Clear all mocks before each test
// // //   });

// // //   test("renders the Flights component", () => {
// // //     render(
// // //       <Router>
// // //         <Flights />
// // //       </Router>
// // //     );

// // //     // Check if form fields and search button are rendered
// // //     expect(screen.getByLabelText(/Origin/i)).toBeInTheDocument();
// // //     expect(screen.getByLabelText(/Destination/i)).toBeInTheDocument();
// // //     expect(screen.getByLabelText(/Departure Date/i)).toBeInTheDocument();
// // //     expect(screen.getByRole("button", { name: /Search Flights/i })).toBeInTheDocument();
// // //   });

// // //   test("displays error message if origin and destination are the same", async () => {
// // //     render(
// // //       <Router>
// // //         <Flights />
// // //       </Router>
// // //     );

// // //     const originSelect = screen.getByLabelText(/Origin/i);
// // //     const destinationSelect = screen.getByLabelText(/Destination/i);
// // //     const departureDateInput = screen.getByLabelText(/Departure Date/i);
// // //     const searchButton = screen.getByRole("button", { name: /Search Flights/i });

// // //     // Simulate user input
// // //     fireEvent.change(originSelect, { target: { value: "JNB" } });
// // //     fireEvent.change(destinationSelect, { target: { value: "JNB" } });
// // //     fireEvent.change(departureDateInput, { target: { value: "2024-10-10" } });

// // //     // Click search button
// // //     fireEvent.click(searchButton);

// // //     // Assert error message is shown
// // //     expect(await screen.findByText(/Origin and destination cannot be the same./i)).toBeInTheDocument();
// // //   });

// // //   test("calls getFlightOffers when form is valid", async () => {
// // //     const getFlightOffers = require("../components/dashboard/flights").getFlightOffers;

// // //     // Mock the flight offers return value
// // //     getFlightOffers.mockResolvedValueOnce([
// // //       {
// // //         itineraries: [
// // //           { segments: [{ departure: { iataCode: "JNB", at: "2024-10-10T10:00" }, arrival: { iataCode: "CPT", at: "2024-10-10T12:00" }, carrierCode: "SA" }] }
// // //         ],
// // //         price: { total: "1000", currency: "EUR" },
// // //         priceInZar: "19210.00",
// // //       }
// // //     ]);

// // //     render(
// // //       <Router>
// // //         <Flights />
// // //       </Router>
// // //     );

// // //     const originSelect = screen.getByLabelText(/Origin/i);
// // //     const destinationSelect = screen.getByLabelText(/Destination/i);
// // //     const departureDateInput = screen.getByLabelText(/Departure Date/i);
// // //     const searchButton = screen.getByRole("button", { name: /Search Flights/i });

// // //     // Simulate user input
// // //     fireEvent.change(originSelect, { target: { value: "JNB" } });
// // //     fireEvent.change(destinationSelect, { target: { value: "CPT" } });
// // //     fireEvent.change(departureDateInput, { target: { value: "2024-10-10" } });

// // //     // Click search button
// // //     fireEvent.click(searchButton);

// // //     // Assert getFlightOffers is called with correct parameters
// // //     await waitFor(() => {
// // //       expect(getFlightOffers).toHaveBeenCalledWith("JNB", "CPT", "2024-10-10", 1, 9);
// // //     });

// // //     // Assert that a flight card is displayed
// // //     expect(await screen.findByText(/JNB to CPT/i)).toBeInTheDocument();
// // //     expect(screen.getByText(/Total Price: 1000 EUR | 19210.00 ZAR/i)).toBeInTheDocument();
// // //   });
// // // });

// // import React from "react";
// // import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// // import { MemoryRouter } from "react-router-dom"; // Use MemoryRouter for testing routes
// // import Flights from "../components/dashboard/flights"; // Adjust path if necessary
// // import { TextEncoder, TextDecoder } from "util"; // Polyfill for Jest environment

// // // Polyfill TextEncoder and TextDecoder for Jest
// // global.TextEncoder = TextEncoder;
// // global.TextDecoder = TextDecoder;

// // // Mock getFlightOffers function
// // jest.mock("../components/dashboard/flights", () => ({
// //   ...jest.requireActual("../components/dashboard/flights"),
// //   getFlightOffers: jest.fn(),
// // }));

// // // Mock Sidebar since it's not crucial for flight functionality tests
// // jest.mock("../components/dashboard/sidebar", () => () => <div>Mocked Sidebar</div>);

// // describe("Flights Component", () => {
// //   beforeEach(() => {
// //     jest.clearAllMocks(); // Clear mocks before each test
// //   });

// //   test("renders the Flights component", () => {
// //     render(
// //       <MemoryRouter>
// //         <Flights />
// //       </MemoryRouter>
// //     );

// //     // Check if form fields and search button are rendered
// //     expect(screen.getByLabelText(/Origin/i)).toBeInTheDocument();
// //     expect(screen.getByLabelText(/Destination/i)).toBeInTheDocument();
// //     expect(screen.getByLabelText(/Departure Date/i)).toBeInTheDocument();
// //     expect(screen.getByRole("button", { name: /Search Flights/i })).toBeInTheDocument();
// //   });

// //   test("displays error message if origin and destination are the same", async () => {
// //     render(
// //       <MemoryRouter>
// //         <Flights />
// //       </MemoryRouter>
// //     );

// //     const originSelect = screen.getByLabelText(/Origin/i);
// //     const destinationSelect = screen.getByLabelText(/Destination/i);
// //     const departureDateInput = screen.getByLabelText(/Departure Date/i);
// //     const searchButton = screen.getByRole("button", { name: /Search Flights/i });

// //     // Simulate user input
// //     fireEvent.change(originSelect, { target: { value: "JNB" } });
// //     fireEvent.change(destinationSelect, { target: { value: "JNB" } });
// //     fireEvent.change(departureDateInput, { target: { value: "2024-10-10" } });

// //     // Click search button
// //     fireEvent.click(searchButton);

// //     // Assert error message is shown
// //     expect(await screen.findByText(/Origin and destination cannot be the same./i)).toBeInTheDocument();
// //   });

// //   test("calls getFlightOffers when form is valid", async () => {
// //     const getFlightOffers = require("../components/dashboard/flights").getFlightOffers;

// //     // Mock flight offers return value
// //     getFlightOffers.mockResolvedValueOnce([
// //       {
// //         itineraries: [
// //           { segments: [{ departure: { iataCode: "JNB", at: "2024-10-10T10:00" }, arrival: { iataCode: "CPT", at: "2024-10-10T12:00" }, carrierCode: "SA" }] }
// //         ],
// //         price: { total: "1000", currency: "EUR" },
// //         priceInZar: "19210.00",
// //       }
// //     ]);

// //     render(
// //       <MemoryRouter>
// //         <Flights />
// //       </MemoryRouter>
// //     );

// //     const originSelect = screen.getByLabelText(/Origin/i);
// //     const destinationSelect = screen.getByLabelText(/Destination/i);
// //     const departureDateInput = screen.getByLabelText(/Departure Date/i);
// //     const searchButton = screen.getByRole("button", { name: /Search Flights/i });

// //     // Simulate user input
// //     fireEvent.change(originSelect, { target: { value: "JNB" } });
// //     fireEvent.change(destinationSelect, { target: { value: "CPT" } });
// //     fireEvent.change(departureDateInput, { target: { value: "2024-10-10" } });

// //     // Click search button
// //     fireEvent.click(searchButton);

// //     // Assert getFlightOffers is called with correct parameters
// //     await waitFor(() => {
// //       expect(getFlightOffers).toHaveBeenCalledWith("JNB", "CPT", "2024-10-10", 1, 9);
// //     });

// //     // Assert that a flight card is displayed
// //     expect(await screen.findByText(/JNB to CPT/i)).toBeInTheDocument();
// //     expect(screen.getByText(/Total Price: 1000 EUR | 19210.00 ZAR/i)).toBeInTheDocument();
// //   });
// // });

// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom"; // Use MemoryRouter for testing routes
// import Flights from "../components/dashboard/flights"; // Adjust path if necessary
// import { TextEncoder, TextDecoder } from "util"; // Polyfill for Jest environment

// // Polyfill TextEncoder and TextDecoder for Jest
// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;

// // Mock the getFlightOffers function from flightService.js
// jest.mock('../components/dashboard/flightService', () => ({
//   getFlightOffers: jest.fn(),
// }));

// // Mock Sidebar since it's not crucial for flight functionality tests
// jest.mock('../components/dashboard/sidebar', () => () => <div>Mocked Sidebar</div>);

// describe("Flights Component", () => {
//   beforeEach(() => {
//     jest.clearAllMocks(); // Clear mocks before each test
//   });

//   test("renders the Flights component", () => {
//     render(
//       <MemoryRouter>
//         <Flights />
//       </MemoryRouter>
//     );

//     // Check if form fields and search button are rendered
//     expect(screen.getByLabelText(/Origin/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Destination/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Departure Date/i)).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /Search Flights/i })).toBeInTheDocument();
//   });

//   test("displays error message if origin and destination are the same", async () => {
//     render(
//       <MemoryRouter>
//         <Flights />
//       </MemoryRouter>
//     );

//     const originSelect = screen.getByLabelText(/Origin/i);
//     const destinationSelect = screen.getByLabelText(/Destination/i);
//     const departureDateInput = screen.getByLabelText(/Departure Date/i);
//     const searchButton = screen.getByRole("button", { name: /Search Flights/i });

//     // Simulate user input
//     fireEvent.change(originSelect, { target: { value: "JNB" } });
//     fireEvent.change(destinationSelect, { target: { value: "JNB" } });
//     fireEvent.change(departureDateInput, { target: { value: "2024-10-10" } });

//     // Click search button
//     fireEvent.click(searchButton);

//     // Assert error message is shown
//     expect(await screen.findByText(/Origin and destination cannot be the same./i)).toBeInTheDocument();
//   });

//   test("calls getFlightOffers when form is valid", async () => {
//     const getFlightOffers = require('../components/dashboard/flightService').getFlightOffers;

//     // Mock flight offers return value
//     getFlightOffers.mockResolvedValueOnce([
//       {
//         itineraries: [
//           { segments: [{ departure: { iataCode: "JNB", at: "2024-10-10T10:00" }, arrival: { iataCode: "CPT", at: "2024-10-10T12:00" }, carrierCode: "SA" }] }
//         ],
//         price: { total: "1000", currency: "EUR" },
//         priceInZar: "19210.00",
//       }
//     ]);

//     render(
//       <MemoryRouter>
//         <Flights />
//       </MemoryRouter>
//     );

//     const originSelect = screen.getByLabelText(/Origin/i);
//     const destinationSelect = screen.getByLabelText(/Destination/i);
//     const departureDateInput = screen.getByLabelText(/Departure Date/i);
//     const searchButton = screen.getByRole("button", { name: /Search Flights/i });

//     // Simulate user input
//     fireEvent.change(originSelect, { target: { value: "JNB" } });
//     fireEvent.change(destinationSelect, { target: { value: "CPT" } });
//     fireEvent.change(departureDateInput, { target: { value: "2024-10-10" } });

//     // Click search button
//     fireEvent.click(searchButton);

//     // Assert getFlightOffers is called with correct parameters
//     await waitFor(() => {
//       expect(getFlightOffers).toHaveBeenCalledWith("JNB", "CPT", "2024-10-10", 1, 9);
//     });

//     // Assert that a flight card is displayed
//     expect(await screen.findByText(/JNB to CPT/i)).toBeInTheDocument();
//     expect(screen.getByText(/Total Price: 1000 EUR | 19210.00 ZAR/i)).toBeInTheDocument();
//   });
// });

// flightsComponent.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Flights from "../components/dashboard/flights";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Mock the flight offers fetching
jest.mock("../components/dashboard/flights", () => ({
  ...jest.requireActual("../components/dashboard/flights"),
  getFlightOffers: jest.fn(),
}));

describe("Flights Component", () => {
  const theme = createTheme({
    palette: {
      mode: "light", // You can toggle this between "light" and "dark" for testing both modes
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Flights component with search form", () => {
    render(
      <ThemeProvider theme={theme}>
        <Router>
          <Flights />
        </Router>
      </ThemeProvider>
    );

    // Check if the search form elements are present
    expect(screen.getByLabelText(/Origin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Destination/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Departure Date/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Search Flights/i })).toBeInTheDocument();
  });

  test("displays error when origin and destination are the same", () => {
    render(
      <ThemeProvider theme={theme}>
        <Router>
          <Flights />
        </Router>
      </ThemeProvider>
    );

    // Fill the form with the same origin and destination
    fireEvent.change(screen.getByLabelText(/Origin/i), { target: { value: "JNB" } });
    fireEvent.change(screen.getByLabelText(/Destination/i), { target: { value: "JNB" } });
    fireEvent.change(screen.getByLabelText(/Departure Date/i), { target: { value: "2024-10-10" } });

    fireEvent.click(screen.getByRole("button", { name: /Search Flights/i }));

    // Check if the error message is displayed
    expect(screen.getByText(/Origin and destination cannot be the same/i)).toBeInTheDocument();
  });

  test("search button is disabled when form is incomplete", () => {
    render(
      <ThemeProvider theme={theme}>
        <Router>
          <Flights />
        </Router>
      </ThemeProvider>
    );

    // Check that the button is disabled when the form is not fully filled
    expect(screen.getByRole("button", { name: /Search Flights/i })).toBeDisabled();
  });
});
