import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CreateCustomer, Customer } from '../models/customer';

/**
 * Mock backend implementation for validating customer
 */
@Injectable({ providedIn: 'root' })
export class CustomerApiService {
  constructor() {}

  addCustomer(
    newCustomer: Omit<Customer, 'id'>,
    customers: Customer[]
  ): Observable<CreateCustomer> {
    const duplicateCustomerByEmail = customers.find(
      (customer) => customer.email === newCustomer.email
    );

    const duplicateCustomerByOtherProps = customers.find(
      (customer) =>
        customer.firstName === newCustomer.firstName ||
        customer.lastName === newCustomer.lastName ||
        customer.dateOfBirth === newCustomer.dateOfBirth
    );

    const response = !!duplicateCustomerByOtherProps
      ? {
          dataSuccess: null,
          errorCode: 202,
          success: false,
        }
      : !!duplicateCustomerByEmail
      ? {
          dataSuccess: null,
          errorCode: 201,
          success: false,
        }
      : {
          dataSuccess: { ...newCustomer, id: this.generateId() },
          errorCode: null,
          success: true,
        };

    return of(response as CreateCustomer);
  }

  private generateId(): string {
    return Math.random().toString(36).slice(2, 7);
  }
}
