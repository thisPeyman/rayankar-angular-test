import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { CustomerStore } from '../data-access/store/customer.store';

import { CustomersListComponent } from './customers-list.component';

describe('CustomersListComponent', () => {
  let component: CustomersListComponent;
  let customerStore: CustomerStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerStore, CustomersListComponent],
      imports: [MatSnackBarModule],
    });

    component = TestBed.inject(CustomersListComponent);
    customerStore = TestBed.inject(CustomerStore);

    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('customers$ should be an empty array initially', () => {
    const observerSpy = subscribeSpyTo(component.customers$);

    expect(observerSpy.getLastValue()).toEqual([]);
  });

  it('should call delete customer when event is triggered', () => {
    const deleteSpy = spyOn(
      customerStore,
      'deleteCustomerById'
    ).and.callThrough();

    component.delete({ id: 'test' });

    expect(deleteSpy).toHaveBeenCalled();
  });
});
