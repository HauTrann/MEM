import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITechnicalDataTimeLine, TechnicalDataTimeLine } from 'app/shared/model/technical-data-time-line.model';
import { TechnicalDataTimeLineService } from './technical-data-time-line.service';
import { TechnicalDataTimeLineComponent } from './technical-data-time-line.component';
import { TechnicalDataTimeLineDetailComponent } from './technical-data-time-line-detail.component';
import { TechnicalDataTimeLineUpdateComponent } from './technical-data-time-line-update.component';

@Injectable({ providedIn: 'root' })
export class TechnicalDataTimeLineResolve implements Resolve<ITechnicalDataTimeLine> {
  constructor(private service: TechnicalDataTimeLineService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITechnicalDataTimeLine> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((technicalDataTimeLine: HttpResponse<TechnicalDataTimeLine>) => {
          if (technicalDataTimeLine.body) {
            return of(technicalDataTimeLine.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TechnicalDataTimeLine());
  }
}

export const technicalDataTimeLineRoute: Routes = [
  {
    path: '',
    component: TechnicalDataTimeLineComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medicalEquipmentManagerApp.technicalDataTimeLine.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TechnicalDataTimeLineDetailComponent,
    resolve: {
      technicalDataTimeLine: TechnicalDataTimeLineResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medicalEquipmentManagerApp.technicalDataTimeLine.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TechnicalDataTimeLineUpdateComponent,
    resolve: {
      technicalDataTimeLine: TechnicalDataTimeLineResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medicalEquipmentManagerApp.technicalDataTimeLine.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TechnicalDataTimeLineUpdateComponent,
    resolve: {
      technicalDataTimeLine: TechnicalDataTimeLineResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medicalEquipmentManagerApp.technicalDataTimeLine.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
