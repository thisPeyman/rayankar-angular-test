import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerStore } from '../data-access/store/customer.store';
import { LetModule } from '@ngrx/component';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CustomersTableComponent } from '../ui/customers-table.component';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [
    CommonModule,
    LetModule,
    RouterModule,
    CustomersTableComponent,
    MatButtonModule,
  ],
  template: `
    <ng-container *ngrxLet="{ customers: customers$ } as vm">
      <div class="flex items-center justify-center py-8 ">
        <a mat-button routerLink="create" class="text-center "
          >Add new Customer</a
        >
      </div>
      <app-customers-table
        [customers]="vm.customers"
        [displayedColumns]="[
          'firstName',
          'lastName',
          'email',
          'phoneNumber',
          'bankAccountNumber',
          'dateOfBirth',
          'actions'
        ]"
        (delete)="delete($event)"
        (edit)="edit($event)"
      ></app-customers-table>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomersListComponent {
  customers$ = this.customerStore.customers$;

  constructor(public customerStore: CustomerStore, private router: Router) {}

  delete({ id }: { id: string }) {
    this.customerStore.deleteCustomerById(id);
  }

  edit({ id }: { id: string }) {
    this.router.navigate(['/customers', 'edit', id]);
  }
}
