import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, Observable, tap, withLatestFrom } from 'rxjs';
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

  constructor(private _snackBar: MatSnackBar) {
    super({ customers: [], selectedCustomerId: null });
  }

  addCustomer = this.effect((trigger$: Observable<Omit<Customer, 'id'>>) => {
    return trigger$.pipe(
      withLatestFrom(this.customers$),
      filter(([newCustomer, customers]) => {
        const duplicateCustomerByEmail = customers.find(
          (customer) => customer.email === newCustomer.email
        );

        if (duplicateCustomerByEmail)
          this._snackBar.open('This email is already taken!', 'Ok', {
            duration: 3000,
          });

        return !duplicateCustomerByEmail;
      }),
      tap(([newCustomer]) => {
        this.patchState((state) => ({
          customers: [
            ...state.customers,
            { ...newCustomer, id: this.generateId() },
          ],
        }));
      })
    );
  });

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
