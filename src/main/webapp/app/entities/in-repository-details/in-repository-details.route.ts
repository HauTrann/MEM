import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IInRepositoryDetails, InRepositoryDetails } from 'app/shared/model/in-repository-details.model';
import { InRepositoryDetailsService } from './in-repository-details.service';
import { InRepositoryDetailsComponent } from './in-repository-details.component';
import { InRepositoryDetailsDetailComponent } from './in-repository-details-detail.component';
import { InRepositoryDetailsUpdateComponent } from './in-repository-details-update.component';

@Injectable({ providedIn: 'root' })
export class InRepositoryDetailsResolve implements Resolve<IInRepositoryDetails> {
  constructor(private service: InRepositoryDetailsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInRepositoryDetails> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((inRepositoryDetails: HttpResponse<InRepositoryDetails>) => {
          if (inRepositoryDetails.body) {
            return of(inRepositoryDetails.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new InRepositoryDetails());
  }
}

export const inRepositoryDetailsRoute: Routes = [
  {
    path: '',
    component: InRepositoryDetailsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'MedicalEquipmentManagerApp.inRepositoryDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: InRepositoryDetailsDetailComponent,
    resolve: {
      inRepositoryDetails: InRepositoryDetailsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MedicalEquipmentManagerApp.inRepositoryDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: InRepositoryDetailsUpdateComponent,
    resolve: {
      inRepositoryDetails: InRepositoryDetailsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MedicalEquipmentManagerApp.inRepositoryDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: InRepositoryDetailsUpdateComponent,
    resolve: {
      inRepositoryDetails: InRepositoryDetailsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MedicalEquipmentManagerApp.inRepositoryDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
