import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import {
  IProposedRepairAndMaintainDetails,
  ProposedRepairAndMaintainDetails
} from 'app/shared/model/proposed-repair-and-maintain-details.model';
import { ProposedRepairAndMaintainDetailsService } from './proposed-repair-and-maintain-details.service';
import { ProposedRepairAndMaintainDetailsComponent } from './proposed-repair-and-maintain-details.component';
import { ProposedRepairAndMaintainDetailsDetailComponent } from './proposed-repair-and-maintain-details-detail.component';
import { ProposedRepairAndMaintainDetailsUpdateComponent } from './proposed-repair-and-maintain-details-update.component';

@Injectable({ providedIn: 'root' })
export class ProposedRepairAndMaintainDetailsResolve implements Resolve<IProposedRepairAndMaintainDetails> {
  constructor(private service: ProposedRepairAndMaintainDetailsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProposedRepairAndMaintainDetails> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((proposedRepairAndMaintainDetails: HttpResponse<ProposedRepairAndMaintainDetails>) => {
          if (proposedRepairAndMaintainDetails.body) {
            return of(proposedRepairAndMaintainDetails.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProposedRepairAndMaintainDetails());
  }
}

export const proposedRepairAndMaintainDetailsRoute: Routes = [
  {
    path: '',
    component: ProposedRepairAndMaintainDetailsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'medicalEquipmentManagerApp.proposedRepairAndMaintainDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProposedRepairAndMaintainDetailsDetailComponent,
    resolve: {
      proposedRepairAndMaintainDetails: ProposedRepairAndMaintainDetailsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medicalEquipmentManagerApp.proposedRepairAndMaintainDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProposedRepairAndMaintainDetailsUpdateComponent,
    resolve: {
      proposedRepairAndMaintainDetails: ProposedRepairAndMaintainDetailsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medicalEquipmentManagerApp.proposedRepairAndMaintainDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProposedRepairAndMaintainDetailsUpdateComponent,
    resolve: {
      proposedRepairAndMaintainDetails: ProposedRepairAndMaintainDetailsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medicalEquipmentManagerApp.proposedRepairAndMaintainDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
