import { Route } from '@angular/router';
import { LayoutComponent } from './ui/layout.component';

export const SHELL_ROUTES: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'customers' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'customers',
        loadChildren: () =>
          import('../customer/customer.routes').then((m) => m.CUSTOMER_ROUTES),
      },
    ],
  },
];
