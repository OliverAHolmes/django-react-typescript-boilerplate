describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/");
    /* ==== Generated with Cypress Studio ==== */
    cy.get(
      ".MuiDataGrid-columnHeaderTitleContainerContent > .MuiButtonBase-root > .PrivateSwitchBase-input"
    ).check();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(
      ".MuiDataGrid-columnHeaderTitleContainerContent > .MuiButtonBase-root > .PrivateSwitchBase-input"
    ).check();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(
      ".MuiDataGrid-row--lastVisible > .MuiDataGrid-cellCheckbox > .MuiButtonBase-root > .PrivateSwitchBase-input"
    ).uncheck();
    /* ==== End Cypress Studio ==== */
  });
});
