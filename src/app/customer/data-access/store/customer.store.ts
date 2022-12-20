import { Injectable } from '@angular/core';
import { BaseStore, Cacheable } from 'src/app/shared/data-access/base-store';
import { Customer } from '../models/customer';

interface CustomerState {
  customers: Customer[];
}

@Cacheable({ storageKey: 'customers' })
@Injectable()
export class CustomerStore extends BaseStore<CustomerState> {
  customers$ = this.select((state) => state.customers);

  constructor() {
    super({ customers: [] });
  }

  addCustomer = this.updater((state, customer: Customer) => ({
    ...state,
    customers: [...state.customers, customer],
  }));

  editCustomer = this.updater((state, customerToEdit: Customer) => ({
    ...state,
    customers: [
      ...state.customers.map((customer) =>
        customer.id === customerToEdit.id
          ? { ...customer, ...customerToEdit }
          : customer
      ),
    ],
  }));

  deleteCustomer = this.updater((state, customerIdToDelete: number) => ({
    ...state,
    customers: [
      ...state.customers.filter(
        (customer) => customer.id !== customerIdToDelete
      ),
    ],
  }));
}
