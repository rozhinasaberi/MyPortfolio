describe("Rojina Portfolio E2E Test", () => {
  it("Loads the home page and navigates all sections", () => {

    cy.visit("/");

    cy.contains("Home").should("exist");

    cy.contains("About").click();
    cy.get("section").should("exist");

    cy.contains("Services").click();
    cy.get("section").should("exist");

    cy.contains("Projects").click();
    cy.get("section").should("exist");

    cy.contains("Contact").click();
    cy.get("form").should("exist");

    // Generic form fill (works on any portfolio)
    cy.get("form input").first().type("Rojina");
    cy.get("form input[type='email']").type("test@example.com");
    cy.get("form textarea").type("Hello");
  });
});
