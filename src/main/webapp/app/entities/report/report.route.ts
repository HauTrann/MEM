import { Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ReportComponent } from 'app/entities/report/report.component';

export const reportRoute: Routes = [
  {
    path: '',
    component: ReportComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER_MANAGER],
      defaultSort: 'id,asc',
      pageTitle: 'MedicalEquipmentManagerApp.repository.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
