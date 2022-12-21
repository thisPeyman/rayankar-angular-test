import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Customer } from '../data-access/models/customer';

type AllowedCols = keyof Customer | 'actions';

@Component({
  selector: 'app-customers-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  template: `
    <div class="w-2/3 mx-auto">
      <table mat-table [dataSource]="dataSource">
        <ng-container matColumnDef="firstName">
          <th mat-header-cell *matHeaderCellDef>First Name</th>
          <td mat-cell *matCellDef="let element">{{ element.firstName }}</td>
        </ng-container>

        <ng-container matColumnDef="lastName">
          <th mat-header-cell *matHeaderCellDef>Last Name</th>
          <td mat-cell *matCellDef="let element">{{ element.lastName }}</td>
        </ng-container>
        <ng-container matColumnDef="dateOfBirth">
          <th mat-header-cell *matHeaderCellDef>Date Of Birth</th>
          <td mat-cell *matCellDef="let element">
            {{ element.dateOfBirth | date }}
          </td>
        </ng-container>
        <ng-container matColumnDef="phoneNumber">
          <th mat-header-cell *matHeaderCellDef>Phone Number</th>
          <td mat-cell *matCellDef="let element">{{ element.phoneNumber }}</td>
        </ng-container>
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef>Email</th>
          <td mat-cell *matCellDef="let element">{{ element.email }}</td>
        </ng-container>
        <ng-container matColumnDef="bankAccountNumber">
          <th mat-header-cell *matHeaderCellDef>Bank Account</th>
          <td mat-cell *matCellDef="let element">
            {{ element.bankAccountNumber }}
          </td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let element">
            <button
              mat-flat-button
              class="mr-2"
              (click)="edit.emit({ id: element.id })"
            >
              Edit
            </button>
            <button
              mat-flat-button
              color="warn"
              (click)="delete.emit({ id: element.id })"
            >
              Delete
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomersTableComponent {
  @Input('customers') dataSource!: Customer[];
  @Input() displayedColumns!: AllowedCols[];

  @Output() edit = new EventEmitter<{ id: string }>();
  @Output() delete = new EventEmitter<{ id: string }>();
}
