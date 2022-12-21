import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LetModule } from '@ngrx/component';
import { CustomerFormComponent } from '../ui/customer-form.component';
import { Customer } from '../data-access/models/customer';
import { CustomerStore } from '../data-access/store/customer.store';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [CommonModule, LetModule, CustomerFormComponent],
  template: `
    <ng-container *ngrxLet="{ isEditMode: isEditMode$ } as vm">
      <app-customer-form (confirm)="confirm($event)"></app-customer-form>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCustomerComponent {
  isEditMode$: Observable<boolean> = this.route.url.pipe(
    map((v) => v[0].path === 'edit')
  );

  constructor(
    private customerStore: CustomerStore,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  confirm(newCustomer: Omit<Customer, 'id'>) {
    this.customerStore.addCustomer(newCustomer);
    this.router.navigateByUrl('/customers');
  }
}
