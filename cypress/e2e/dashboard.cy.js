// // describe('template spec', () => {
// //   it('passes', () => {
// //     cy.visit('https://example.cypress.io')
// //   })
// // })
// // cypress/e2e/dashboard.cy.js
// describe('Dashboard Component', () => {
//   beforeEach(() => {
//     // Visit the Dashboard page
//     cy.visit('/dashboard'); // Adjust if Dashboard is not on the home route
//   });

//   it('renders AI Trip Planning title', () => {
//     cy.contains('AI Trip Planning').should('be.visible');
//   });

//   it('renders input field and submit button', () => {
//     cy.get('input[placeholder="Ask me about your trip"]').should('be.visible');
//     cy.get('button').should('be.visible');
//   });

//   it('accepts user input and displays it', () => {
//     const inputText = 'Test trip to Durban';
//     cy.get('input[placeholder="Ask me about your trip"]').type(inputText);
//     cy.get('input[placeholder="Ask me about your trip"]').should('have.value', inputText);
//   });

//   it('disables button when input is empty', () => {
//     cy.get('input[placeholder="Ask me about your trip"]').clear();
//     cy.get('button').should('be.disabled');
//   });

//   it('enables button when input is filled', () => {
//     cy.get('input[placeholder="Ask me about your trip"]').type('New trip');
//     cy.get('button').should('not.be.disabled');
//   });

//   it('submits form and checks response', () => {
//     // Simulate filling in the input and submitting
//     cy.get('input[placeholder="Ask me about your trip"]').type('Test trip');
//     cy.get('button').click();

//     // Add additional assertions based on your form submission behavior
//     cy.contains('Thank you for your submission').should('be.visible'); // Example, adjust as per your app's logic
//   });
// });

// cypress/e2e/dashboard.cy.js
describe('Dashboard Component', () => {
  beforeEach(() => {
    // Visit the correct route for the Dashboard
    cy.visit('/dashboard'); // Adjust the route if necessary
  });

  it('renders AI Trip Planning title', () => {
    cy.contains('AI Trip Planning').should('be.visible');
  });

  it('renders input field and submit button', () => {
    // Ensure the input field and submit button are present
    cy.get('input[placeholder="Ask me about your trip..."]').should('be.visible');
    cy.get('button').should('be.visible');
  });

  // it('accepts user input', () => {
  //   // Simulate user typing in the input field
  //   const testInput = 'Test trip to Durban';
  //   cy.get('input[placeholder="Ask me about your trip"]').type(testInput);
  //   cy.get('input[placeholder="Ask me about your trip"]').should('have.value', testInput);
  // });
  it('disables submit button when input is empty', () => {
    // Ensure submit button is disabled when input is empty
    cy.get('input[placeholder="Ask me about your trip"]').clear();
    cy.get('button').should('be.disabled');
  });
});
