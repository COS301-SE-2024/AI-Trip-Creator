// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

// cypress/e2e/itineraryForm.cy.js
describe('Itinerary Form Component', () => {
  beforeEach(() => {
    // Visit the ItineraryForm page
    cy.visit('/itineraryForm'); // Adjust if your ItineraryForm component is on a different route
  });

  it('renders Itinerary Form title', () => {
    // Check if the Itinerary Form title is visible
    cy.contains('Itinerary Form').should('be.visible');
  });

  it('renders form fields and submit button', () => {
    // Ensure the form fields and the submit button are rendered
    cy.get('label').contains('Starting Location').should('be.visible');
    cy.get('label').contains('Destination').should('be.visible');
    cy.get('input[type="date"]').should('be.visible');
    cy.get('button').contains('Generate Itinerary').should('be.visible');
  });
});
