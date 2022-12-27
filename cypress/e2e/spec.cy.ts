describe('My First Test', () => {
  it('does not so much!', () => {
    cy.visit('localhost:4200');

    expect(true).to.equal(true);
  });
});
