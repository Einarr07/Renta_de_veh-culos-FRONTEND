// cypress/integration/component/App.cy.jsx
import App from '../../src/App';

// cypress/integration/navigation.spec.js
describe('Navegación', () => {
  cy.mount(<App />);
  it('Puede navegar a la página de inicio', () => {
    cy.visit('/');
    // Agregar aserciones según sea necesario
  });

  it('Puede navegar a la página de inicio de sesión', () => {
    cy.visit('/login');
    // Agregar aserciones según sea necesario
  });

  // Añadir más pruebas de navegación según sea necesario
});

