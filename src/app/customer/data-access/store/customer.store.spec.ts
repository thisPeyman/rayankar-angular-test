import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { CustomerStore } from './customer.store';

describe('CustomerStore', () => {
  let store: CustomerStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerStore],
      imports: [MatSnackBarModule, BrowserAnimationsModule],
    });

    store = TestBed.inject(CustomerStore);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should add customer', () => {
    const observerSpy = subscribeSpyTo(store.customers$);

    store.addCustomer(testCustomer);

    expect(observerSpy.getLastValue()?.length).toBe(1);
  });

  it('should check if email is unique and prevent to add duplicate entity', () => {
    const observerSpy = subscribeSpyTo(store.customers$);

    store.addCustomer(testCustomer);

    expect(observerSpy.getLastValue()?.length).toBe(1);

    store.addCustomer(testCustomer);

    expect(observerSpy.getLastValue()?.length).toBe(1);
  });

  it('should select customer by given id', () => {
    const customersSpy = subscribeSpyTo(store.customers$);
    const singleCustomerSpy = subscribeSpyTo(store.selectedCustomer$);

    store.addCustomer(testCustomer);
    store.patchState({
      selectedCustomerId: customersSpy.getLastValue()![0].id,
    });

    expect(singleCustomerSpy.getLastValue()).toBeTruthy();
  });

  it('should delete customer by id', () => {
    const customersSpy = subscribeSpyTo(store.customers$);

    store.addCustomer(testCustomer);
    store.deleteCustomerById(customersSpy.getLastValue()![0].id);

    expect(customersSpy.getLastValue()?.length).toBe(0);
  });

  it('should edit customer', () => {
    const customersSpy = subscribeSpyTo(store.customers$);
    const firstNameToEdit = 'my test name';

    store.addCustomer(testCustomer);
    store.editCustomer({
      ...customersSpy.getLastValue()![0],
      firstName: firstNameToEdit,
    });

    expect(customersSpy.getLastValue()![0].firstName).toBe(firstNameToEdit);
  });
});

const testCustomer = {
  firstName: 'peyman',
  bankAccountNumber: '123',
  dateOfBirth: '123',
  email: '123@123',
  lastName: 'khosravi',
  phoneNumber: '123',
};
