import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { SHELL_ROUTES } from './app/shell/shell.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(SHELL_ROUTES)],
});
