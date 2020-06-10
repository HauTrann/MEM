import { Routes } from '@angular/router';
import { LoginMainComponent } from 'app/layouts/login/login-main.component';

export const loginMainRoute: Routes = [
  {
    path: 'login',
    component: LoginMainComponent,
    data: {
      authorities: [],
      pageTitle: 'error.title'
    }
  }
];
