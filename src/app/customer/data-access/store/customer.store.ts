import { Injectable } from '@angular/core';
import { filter, Observable, switchMap, tap, withLatestFrom } from 'rxjs';
import { BaseStore, Cacheable } from 'src/app/shared/data-access/base-store';
import { UiService } from 'src/app/shared/data-access/services/ui.service';
import { Customer } from '../models/customer';
import { CustomerApiService } from '../services/customer-api.service';

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

  constructor(
    private uiService: UiService,
    private customerApiService: CustomerApiService
  ) {
    super({ customers: [], selectedCustomerId: null });
  }

  addCustomer = this.effect((trigger$: Observable<Omit<Customer, 'id'>>) => {
    return trigger$.pipe(
      withLatestFrom(this.customers$),
      switchMap(([newCustomer, customers]) =>
        this.customerApiService.addCustomer(newCustomer, customers)
      ),
      filter((newCustomer) => {
        if (!newCustomer.success)
          this.uiService.notifyError(newCustomer.errorCode!);

        return !!newCustomer.success;
      }),
      tap(({ dataSuccess }) => {
        this.patchState((state) => ({
          customers: [...state.customers, { ...dataSuccess! }],
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
}
