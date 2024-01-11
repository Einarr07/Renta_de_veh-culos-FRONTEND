import Login from "../../src/pages/Login";

describe("Login.cy.jsx", () => {
  it("Pagina de inicio", () =>{
    cy.mount(<Login/>);
    cy.get(".block w-full py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white mb-2").click();
  })
})