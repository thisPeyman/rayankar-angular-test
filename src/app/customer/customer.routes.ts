import { Route } from '@angular/router';
import { CustomerStore } from './data-access/store/customer.store';

export const CUSTOMER_ROUTES: Route[] = [
  {
    path: '',
    providers: [CustomerStore],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./feature/customers-list.component').then(
            (m) => m.CustomersListComponent
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./feature/edit-customer.component').then(
            (m) => m.EditCustomerComponent
          ),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./feature/edit-customer.component').then(
            (m) => m.EditCustomerComponent
          ),
      },
    ],
  },
];
