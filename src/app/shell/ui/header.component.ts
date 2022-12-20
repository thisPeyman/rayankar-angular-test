import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, RouterModule],
  template: `
    <mat-toolbar color="primary" class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button mat-icon-button aria-label="Example icon-button with menu icon">
          <mat-icon>menu</mat-icon>
        </button>
        <a class="mb-2" routerLink="/">Angular Customers</a>
      </div>

      <div class="flex items-center gap-3">
        <button
          mat-icon-button
          class=""
          aria-label="Example icon-button with heart icon"
        >
          <mat-icon>favorite</mat-icon>
        </button>
        <button
          mat-icon-button
          aria-label="Example icon-button with share icon"
        >
          <mat-icon>share</mat-icon>
        </button>
      </div>
    </mat-toolbar>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
