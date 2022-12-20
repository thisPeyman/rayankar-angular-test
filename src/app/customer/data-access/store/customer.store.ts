import { Injectable } from '@angular/core';
import { BaseStore, Cacheable } from 'src/app/shared/data-access/base-store';
import { Customer } from '../models/customer';

interface CustomerState {
  customers: Customer[];
}

@Cacheable({ storageKey: 'customers' })
@Injectable()
export class CustomerStore extends BaseStore<CustomerState> {
  constructor() {
    super({ customers: [] });
  }

  setCustomers = this.updater((state, customers: Customer[]) => ({
    ...state,
    customers: [...customers],
  }));
}
