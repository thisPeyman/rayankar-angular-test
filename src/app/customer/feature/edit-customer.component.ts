import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, take, tap, withLatestFrom } from 'rxjs';
import { LetModule } from '@ngrx/component';
import { CustomerFormComponent } from '../ui/customer-form.component';
import { Customer } from '../data-access/models/customer';
import { CustomerStore } from '../data-access/store/customer.store';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [CommonModule, LetModule, CustomerFormComponent],
  template: `
    <ng-container
      *ngrxLet="{
        isEditMode: isEditMode$,
        customerToEdit: customerToEdit$
      } as vm"
    >
      <app-customer-form
        (confirm)="confirm($event)"
        [formValue]="vm.isEditMode ? vm.customerToEdit : undefined"
      ></app-customer-form>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCustomerComponent implements OnInit {
  isEditMode$: Observable<boolean> = this.route.url.pipe(
    map((v) => v[0].path === 'edit')
  );
  selectedCustomerId$: Observable<string | undefined> = this.route.params.pipe(
    map((v) => v['id'])
  );

  customerToEdit$ = this.customerStore.selectedCustomer$;

  constructor(
    private customerStore: CustomerStore,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dispatchCustomerId();
  }

  confirm(customer: Omit<Customer, 'id'>) {
    this.isEditMode$
      .pipe(
        take(1),
        withLatestFrom(this.selectedCustomerId$),
        tap(([editMode, selectedCustomerId]) => {
          editMode && selectedCustomerId
            ? this.customerStore.editCustomer({
                ...customer,
                id: selectedCustomerId,
              })
            : this.customerStore.addCustomer(customer);

          this.router.navigateByUrl('/customers');
        })
      )
      .subscribe();
  }

  private dispatchCustomerId(): void {
    this.customerStore.patchState(
      this.selectedCustomerId$.pipe(map((v) => ({ selectedCustomerId: v })))
    );
  }
}
