import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IReportBrokenEquipment, ReportBrokenEquipment } from 'app/shared/model/report-broken-equipment.model';
import { ReportBrokenEquipmentService } from './report-broken-equipment.service';
import { ReportBrokenEquipmentComponent } from './report-broken-equipment.component';
import { ReportBrokenEquipmentDetailComponent } from './report-broken-equipment-detail.component';
import { ReportBrokenEquipmentUpdateComponent } from './report-broken-equipment-update.component';

@Injectable({ providedIn: 'root' })
export class ReportBrokenEquipmentResolve implements Resolve<IReportBrokenEquipment> {
  constructor(private service: ReportBrokenEquipmentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReportBrokenEquipment> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((reportBrokenEquipment: HttpResponse<ReportBrokenEquipment>) => {
          if (reportBrokenEquipment.body) {
            return of(reportBrokenEquipment.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ReportBrokenEquipment());
  }
}

export const reportBrokenEquipmentRoute: Routes = [
  {
    path: '',
    component: ReportBrokenEquipmentComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER_MANAGER, Authority.ROLE_USER_TECHNICAL],
      defaultSort: 'id,asc',
      pageTitle: 'medicalEquipmentManagerApp.reportBrokenEquipment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ReportBrokenEquipmentDetailComponent,
    resolve: {
      reportBrokenEquipment: ReportBrokenEquipmentResolve
    },
    data: {
      authorities: [Authority.USER_MANAGER, Authority.ROLE_USER_TECHNICAL],
      pageTitle: 'medicalEquipmentManagerApp.reportBrokenEquipment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ReportBrokenEquipmentUpdateComponent,
    resolve: {
      reportBrokenEquipment: ReportBrokenEquipmentResolve
    },
    data: {
      authorities: [Authority.USER_MANAGER, Authority.ROLE_USER_TECHNICAL],
      pageTitle: 'medicalEquipmentManagerApp.reportBrokenEquipment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ReportBrokenEquipmentUpdateComponent,
    resolve: {
      reportBrokenEquipment: ReportBrokenEquipmentResolve
    },
    data: {
      authorities: [Authority.USER_MANAGER, Authority.ROLE_USER_TECHNICAL],
      pageTitle: 'medicalEquipmentManagerApp.reportBrokenEquipment.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
