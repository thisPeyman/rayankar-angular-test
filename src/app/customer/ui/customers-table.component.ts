import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      customers-table works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersTableComponent {

}
