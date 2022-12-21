import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { Customer } from '../data-access/models/customer';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="submitForm()"
      class="grid grid-cols-2 w-full px-10 md:w-1/2 mx-auto gap-2 mt-10"
    >
      <mat-form-field>
        <mat-label>First Name</mat-label>
        <input matInput formControlName="firstName" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Last Name</mat-label>
        <input matInput formControlName="lastName" />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Date of Birth</mat-label>
        <input
          matInput
          [matDatepicker]="picker"
          formControlName="dateOfBirth"
        />
        <mat-datepicker-toggle
          matIconSuffix
          [for]="picker"
        ></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Phone Number</mat-label>
        <input matInput formControlName="phoneNumber" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Bank Account Number</mat-label>
        <input matInput formControlName="bankAccountNumber" />
      </mat-form-field>

      <button
        mat-flat-button
        color="primary"
        class="col-span-full w-1/2 mx-auto"
        type="submit"
      >
        Submit
      </button>
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFormComponent {
  form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    bankAccountNumber: ['', Validators.required],
  });

  @Output() confirm = new EventEmitter();

  @Input() set formValue(value: Customer | undefined) {
    this.form.patchValue({ ...value });
  }

  constructor(private fb: FormBuilder) {}

  submitForm() {
    if (this.form.invalid) return;

    this.confirm.emit(this.form.value);
  }
}
