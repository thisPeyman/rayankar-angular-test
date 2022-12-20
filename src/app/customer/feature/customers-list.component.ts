import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerStore } from '../data-access/store/customer.store';
import { LetModule } from '@ngrx/component';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [CommonModule, LetModule],
  template: `
    <ng-container *ngrxLet="{ customers: customers$ } as vm">
      <p>{{ vm | json }}</p>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomersListComponent {
  customers$ = this.customerStore.customers$;

  constructor(public customerStore: CustomerStore) {}
}
