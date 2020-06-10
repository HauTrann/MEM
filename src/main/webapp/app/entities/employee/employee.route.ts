import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';
import { JhiResolvePagingParams } from 'ng-jhipster';

import { IUser, User } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { EmployeeComponent } from './employee.component';
import { EmployeeDetailComponent } from './employee-detail.component';
import { EmployeeUpdateComponent } from './employee-update.component';
import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

@Injectable({ providedIn: 'root' })
export class UserManagementResolve implements Resolve<IUser> {
  constructor(private service: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUser> {
    const id = route.params['login'];
    if (id) {
      return this.service.find(id);
    }
    return of(new User());
  }
}

export const employeeRoute: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      defaultSort: 'id,asc',
      authorities: [Authority.ADMIN, Authority.USER_MANAGER],
      pageTitle: 'MedicalEquipmentManagerApp.department.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':login/view',
    data: {
      authorities: [Authority.ADMIN, Authority.USER_MANAGER],
      pageTitle: 'MedicalEquipmentManagerApp.department.home.title'
    },
    component: EmployeeDetailComponent,
    resolve: {
      user: UserManagementResolve
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    data: {
      authorities: [Authority.ADMIN, Authority.USER_MANAGER],
      pageTitle: 'MedicalEquipmentManagerApp.department.home.title'
    },
    component: EmployeeUpdateComponent,
    resolve: {
      user: UserManagementResolve
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':login/edit',
    component: EmployeeUpdateComponent,
    data: {
      authorities: [Authority.ADMIN, Authority.USER_MANAGER],
      pageTitle: 'MedicalEquipmentManagerApp.department.home.title'
    },
    resolve: {
      user: UserManagementResolve
    },
    canActivate: [UserRouteAccessService]
  }
];
