import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app/app.component';
import { SHELL_ROUTES } from './app/shell/shell.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(SHELL_ROUTES),
    provideAnimations(),
    importProvidersFrom([MatNativeDateModule, MatSnackBarModule]),
  ],
});
