import { Injectable } from '@angular/core';
import { BaseStore, Cacheable } from 'src/app/shared/data-access/base-store';
import { Customer } from '../models/customer';

interface CustomerState {
  customers: Customer[];
  selectedCustomerId: string | null;
}

@Cacheable({ storageKey: 'customers' })
@Injectable()
export class CustomerStore extends BaseStore<CustomerState> {
  customers$ = this.select((state) => state.customers);

  private selectedCustomerId$ = this.select(
    (state) => state.selectedCustomerId
  );

  selectedCustomer$ = this.select(
    this.customers$,
    this.selectedCustomerId$,
    (customers, selectedId) =>
      customers.find((customer) => customer.id === selectedId)
  );

  constructor() {
    super({ customers: [], selectedCustomerId: null });
  }

  addCustomer = this.updater((state, customer: Omit<Customer, 'id'>) => ({
    ...state,
    customers: [...state.customers, { ...customer, id: this.generateId() }],
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

  deleteCustomerById = this.updater((state, customerIdToDelete: string) => ({
    ...state,
    customers: [
      ...state.customers.filter(
        (customer) => customer.id !== customerIdToDelete
      ),
    ],
  }));

  private generateId(): string {
    return Math.random().toString(36).slice(2, 7);
  }
}
