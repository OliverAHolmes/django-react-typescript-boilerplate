describe("The ToDo List Test", () => {
  it("successfully loads", () => {
    cy.visit("/login");
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#email").clear("test@example.com");
    cy.get("#email").type("test@example.com");
    cy.get("#password").clear("RpQ@i2#uF5ph8BuV");
    cy.get("#password").type("RpQ@i2#uF5ph8BuV");
    cy.get(".css-7004js > .MuiButtonBase-root").click();
    cy.get(
      '[style="height: 400px; width: 100%;"] > .MuiBox-root > .MuiButtonBase-root'
    ).click();
    cy.get("#name").clear("T");
    cy.get("#name").type("Test");
    cy.get(".MuiDialogActions-root > :nth-child(2)").click();
    /* ==== Generated with Cypress Studio ==== */
    cy.get(
      '.MuiDataGrid-row--firstVisible > [data-field="actions"] > div > .MuiButton-containedPrimary'
    ).click();
    cy.get(".MuiContainer-root > .MuiBox-root > :nth-child(2)").click();
    cy.get("#task").clear("T");
    cy.get("#task").type("Test 1");
    cy.get(".MuiDialogActions-root > :nth-child(2)").click();
    cy.get(".MuiListItem-root > .MuiButton-containedPrimary").click();
    cy.get("#task").clear("Test ");
    cy.get("#task").type("Test 2");
    cy.get(".MuiDialogActions-root > :nth-child(2)").click();
    cy.get(".MuiButton-containedSecondary").click();
    cy.get(".MuiContainer-root > .MuiBox-root > :nth-child(1)").click();
    cy.get(
      '.MuiDataGrid-row--firstVisible > [data-field="actions"] > div > .MuiButton-containedSecondary'
    ).click();
    /* ==== End Cypress Studio ==== */
  });
});
