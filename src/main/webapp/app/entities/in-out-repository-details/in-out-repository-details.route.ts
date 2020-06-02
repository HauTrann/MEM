import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IInOutRepositoryDetails, InOutRepositoryDetails } from 'app/shared/model/in-out-repository-details.model';
import { InOutRepositoryDetailsService } from './in-out-repository-details.service';
import { InOutRepositoryDetailsComponent } from './in-out-repository-details.component';
import { InOutRepositoryDetailsDetailComponent } from './in-out-repository-details-detail.component';
import { InOutRepositoryDetailsUpdateComponent } from './in-out-repository-details-update.component';

@Injectable({ providedIn: 'root' })
export class InOutRepositoryDetailsResolve implements Resolve<IInOutRepositoryDetails> {
  constructor(private service: InOutRepositoryDetailsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInOutRepositoryDetails> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((inOutRepositoryDetails: HttpResponse<InOutRepositoryDetails>) => {
          if (inOutRepositoryDetails.body) {
            return of(inOutRepositoryDetails.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new InOutRepositoryDetails());
  }
}

export const inOutRepositoryDetailsRoute: Routes = [
  {
    path: '',
    component: InOutRepositoryDetailsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'medicalEquipmentManagerApp.inOutRepositoryDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: InOutRepositoryDetailsDetailComponent,
    resolve: {
      inOutRepositoryDetails: InOutRepositoryDetailsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medicalEquipmentManagerApp.inOutRepositoryDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: InOutRepositoryDetailsUpdateComponent,
    resolve: {
      inOutRepositoryDetails: InOutRepositoryDetailsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medicalEquipmentManagerApp.inOutRepositoryDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: InOutRepositoryDetailsUpdateComponent,
    resolve: {
      inOutRepositoryDetails: InOutRepositoryDetailsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medicalEquipmentManagerApp.inOutRepositoryDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
