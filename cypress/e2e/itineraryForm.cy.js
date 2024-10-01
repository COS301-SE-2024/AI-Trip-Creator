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

  // it('renders form fields and submit button', () => {
  //   // Ensure the form fields and the submit button are rendered
  //   cy.get('label').contains('Starting Location').should('be.visible');
  //   cy.get('label').contains('Destination').should('be.visible');
  //   cy.get('input[type="date"]').should('be.visible');
  //   cy.get('button').contains('Generate Itinerary').should('be.visible');
  // });

  // it('disables submit button when form is incomplete', () => {
  //   // Check that the submit button is disabled if the form is incomplete
  //   cy.get('button').contains('Generate Itinerary').should('be.disabled');
  // });

  // it('enables submit button when form is filled', () => {
  //   // Fill out the form
  //   cy.get('label').contains('Starting Location').click().get('li').contains('Johannesburg').click();
  //   cy.get('label').contains('Destination').click().get('li').contains('Cape Town').click();
  //   cy.get('input[type="date"]').first().type('2023-12-01'); // Departure date
  //   cy.get('input[type="date"]').last().type('2023-12-10'); // Return date

  //   // Submit button should now be enabled
  //   cy.get('button').contains('Generate Itinerary').should('not.be.disabled');
  // });

  it('displays generated itinerary after form submission', () => {
    // Mock the AI generation logic (replace this as necessary if you have actual API calls)
    cy.intercept('POST', '**/generate-itinerary', {
      fixture: 'itineraryResponse.json'
    }).as('generateItinerary');

    // Fill out the form
    cy.get('label').contains('Starting Location').click().get('li').contains('Johannesburg').click();
    cy.get('label').contains('Destination').click().get('li').contains('Cape Town').click();
    cy.get('input[type="date"]').first().type('2023-12-01'); // Departure date
    cy.get('input[type="date"]').last().type('2023-12-10'); // Return date

    // Submit the form
    cy.get('button').contains('Generate Itinerary').click();

    // Wait for the itinerary generation to finish
    cy.wait('@generateItinerary');

    // Verify that the generated itinerary is displayed
    cy.contains('Here is your itinerary').should('be.visible');
  });
});
