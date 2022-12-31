import { Response } from 'src/app/shared/data-access/models/response';

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  bankAccountNumber: string;
}

export type CreateCustomerErrorCodes = 201 | 202;

export interface CreateCustomer
  extends Response<Customer, CreateCustomerErrorCodes> {}
