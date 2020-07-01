import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProposedRepairAndMaintain, ProposedRepairAndMaintain } from 'app/shared/model/proposed-repair-and-maintain.model';
import { ProposedRepairAndMaintainService } from './proposed-repair-and-maintain.service';
import { ProposedRepairAndMaintainComponent } from './proposed-repair-and-maintain.component';
import { ProposedRepairAndMaintainDetailComponent } from './proposed-repair-and-maintain-detail.component';
import { ProposedRepairAndMaintainUpdateComponent } from './proposed-repair-and-maintain-update.component';

@Injectable({ providedIn: 'root' })
export class ProposedRepairAndMaintainResolve implements Resolve<IProposedRepairAndMaintain> {
  constructor(private service: ProposedRepairAndMaintainService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProposedRepairAndMaintain> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((proposedRepairAndMaintain: HttpResponse<ProposedRepairAndMaintain>) => {
          if (proposedRepairAndMaintain.body) {
            return of(proposedRepairAndMaintain.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProposedRepairAndMaintain());
  }
}

export const proposedRepairAndMaintainRoute: Routes = [
  {
    path: '',
    component: ProposedRepairAndMaintainComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER_MANAGER, Authority.ROLE_USER_TECHNICAL],
      defaultSort: 'id,asc',
      pageTitle: 'medicalEquipmentManagerApp.proposedRepairAndMaintain.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProposedRepairAndMaintainDetailComponent,
    resolve: {
      proposedRepairAndMaintain: ProposedRepairAndMaintainResolve
    },
    data: {
      authorities: [Authority.USER_MANAGER, Authority.ROLE_USER_TECHNICAL],
      pageTitle: 'medicalEquipmentManagerApp.proposedRepairAndMaintain.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProposedRepairAndMaintainUpdateComponent,
    resolve: {
      proposedRepairAndMaintain: ProposedRepairAndMaintainResolve
    },
    data: {
      authorities: [Authority.USER_MANAGER, Authority.ROLE_USER_TECHNICAL],
      pageTitle: 'medicalEquipmentManagerApp.proposedRepairAndMaintain.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProposedRepairAndMaintainUpdateComponent,
    resolve: {
      proposedRepairAndMaintain: ProposedRepairAndMaintainResolve
    },
    data: {
      authorities: [Authority.USER_MANAGER, Authority.ROLE_USER_TECHNICAL],
      pageTitle: 'medicalEquipmentManagerApp.proposedRepairAndMaintain.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
