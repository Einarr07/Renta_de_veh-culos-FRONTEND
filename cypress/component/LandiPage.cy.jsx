import LandingPage from "../../src/pages/LandiPage";

describe("LandiPage.cy.jsx", () => {
  it("Pagina de inicio", () =>{
    cy.mount(<LandingPage/>)
  })
})