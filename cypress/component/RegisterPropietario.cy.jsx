import RegisterPropietario from "../../src/components/Propietario/RegisterPropietario";

// Configuración para evitar que Cypress falle en caso de excepciones no manejadas
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe("RegisterPropietario.cy.jsx", () => {
  it("Registrar propietario", () =>{
    cy.log('Inicio de la prueba');
    cy.mount(<RegisterPropietario/>);
    cy.log('Componente montado');
    cy.wait(1000);
    cy.log('Después de esperar');
    cy.get('#nombre').should('exist').type('Nombre de Prueba');
    


  });
});
