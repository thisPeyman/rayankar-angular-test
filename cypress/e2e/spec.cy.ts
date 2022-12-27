describe('Customer', () => {
  it('Create Read Edit Delete Customer', () => {
    cy.visit('localhost:4200');

    cy.contains('Add new Customer').click();

    cy.url().should('contain', 'create');

    addOrEditCustomer(fakeCustomer1);

    for (const [key, value] of Object.entries(fakeCustomer1)) {
      cy.get(`.mat-column-${key}`).contains(value);
    }

    cy.contains('Add new Customer').click();

    addOrEditCustomer(fakeCustomer1);

    cy.contains('This email is already taken!').should('be.visible');

    cy.contains('Edit').click();

    addOrEditCustomer(fakeCustomer2);

    for (const [key, value] of Object.entries(fakeCustomer1)) {
      cy.get(`.mat-column-${key}`).should('not.contain', value);
    }

    for (const [key, value] of Object.entries(fakeCustomer2)) {
      cy.get(`.mat-column-${key}`).should('contain', value);
    }

    cy.contains('Delete').click();

    cy.get('table').should('not.contain.html', 'td');
  });
});

const fakeCustomer1 = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@doe.com',
  phoneNumber: '+989121234567',
  bankAccountNumber: 'IR000000000000001',
  dateOfBirth: 'Jan 1, 2000',
};

const fakeCustomer2 = {
  firstName: 'Jane',
  lastName: 'William',
  email: 'jane@william.com',
  phoneNumber: '+989125478215',
  dateOfBirth: 'Feb 1, 2010',
  bankAccountNumber: 'IR000000000000002',
};

const addOrEditCustomer = (customer: typeof fakeCustomer1) => {
  for (const [key, value] of Object.entries(customer)) {
    cy.get(`[formcontrolname="${key}"]`).clear({ force: true }).type(value, {
      force: true,
    });
  }

  cy.contains('Submit').click();
};
