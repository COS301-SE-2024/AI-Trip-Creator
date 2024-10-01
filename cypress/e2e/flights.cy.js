// // describe('template spec', () => {
// //   it('passes', () => {
// //     cy.visit('https://example.cypress.io')
// //   })
// // })

// // cypress/e2e/flights.cy.js
// describe('Flights Component', () => {
//   beforeEach(() => {
//     // Visit the Flights page
//     cy.visit('/flights'); // Adjust if your Flights component is on a different route
//   });

//   it('renders Flight Offers title', () => {
//     // Check if the Flight Offers title is visible
//     cy.contains('Flight Offers').should('be.visible');
//   });

//   it('renders form fields and search button', () => {
//     // Ensure the form fields and search button are rendered
//     cy.get('input[placeholder="Departure Date"]').should('be.visible');
//     cy.get('button').contains('Search Flights').should('be.visible');
//   });

//   it('disables search button when form is incomplete', () => {
//     // Check that the search button is disabled if the form is not completely filled
//     cy.get('button').contains('Search Flights').should('be.disabled');
//   });

//   it('enables search button when form is filled', () => {
//     // Fill out the form
//     cy.get('input[placeholder="Origin"]').type('JNB'); // Johannesburg
//     cy.get('input[placeholder="Destination"]').type('CPT'); // Cape Town
//     cy.get('input[type="date"]').type('2023-12-01'); // Departure date
    
//     // Search button should now be enabled
//     cy.get('button').contains('Search Flights').should('not.be.disabled');
//   });

//   it('shows an error if origin and destination are the same', () => {
//     // Fill out the form with the same origin and destination
//     cy.get('input[placeholder="Origin"]').type('JNB'); // Johannesburg
//     cy.get('input[placeholder="Destination"]').type('JNB'); // Same as origin
//     cy.get('input[type="date"]').type('2023-12-01'); // Departure date

//     // Try to search
//     cy.get('button').contains('Search Flights').click();

//     // Check for error message
//     cy.contains('Origin and destination cannot be the same.').should('be.visible');
//   });

//   it('fetches and displays flight results', () => {
//     // Mock the API call
//     cy.intercept('GET', '**/amadeus.com/**', { fixture: 'flightOffers.json' }).as('getFlightOffers');

//     // Fill out the form
//     cy.get('input[placeholder="Origin"]').type('JNB'); // Johannesburg
//     cy.get('input[placeholder="Destination"]').type('CPT'); // Cape Town
//     cy.get('input[type="date"]').type('2023-12-01'); // Departure date

//     // Search for flights
//     cy.get('button').contains('Search Flights').click();

//     // Wait for the API call
//     cy.wait('@getFlightOffers');

//     // Check that flight results are displayed
//     cy.contains('JNB to CPT').should('be.visible');
//     cy.contains('Total Price').should('be.visible');
//   });
// });

// cypress/e2e/flights.cy.js
describe('Flights Component', () => {
  beforeEach(() => {
    // Visit the Flights page
    cy.visit('/flights'); // Adjust if your Flights component is on a different route
  });

  it('renders form fields and search button', () => {
    cy.get('label').contains('Origin').should('be.visible');
    cy.get('label').contains('Destination').should('be.visible');
    cy.get('input[type="date"]').should('be.visible');
    cy.get('button').contains('Search Flights').should('be.visible');
  });

  it('enables search button when form is filled', () => {
    cy.get('label').contains('Origin').next().click().get('li').contains('Johannesburg (JNB)').click();
    cy.get('label').contains('Destination').next().click().get('li').contains('Cape Town (CPT)').click();
    cy.get('input[type="date"]').type('2023-12-01'); // Departure date
    
    // Search button should now be enabled
    cy.get('button').contains('Search Flights').should('not.be.disabled');
  });

  it('shows an error if origin and destination are the same', () => {
    // Fill out the form with the same origin and destination
    cy.get('label').contains('Origin').next().click().get('li').contains('Johannesburg (JNB)').click();
    cy.get('label').contains('Destination').next().click().get('li').contains('Johannesburg (JNB)').click();
    cy.get('input[type="date"]').type('2023-12-01'); // Departure date

    // Try to search
    cy.get('button').contains('Search Flights').click();

    // Check for error message
    cy.contains('Origin and destination cannot be the same.').should('be.visible');
  });


});
