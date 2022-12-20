import { Route } from '@angular/router';

export const CUSTOMER_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/customers-list.component').then(
        (m) => m.CustomersListComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./feature/customer.component').then((m) => m.CustomerComponent),
  },
];
