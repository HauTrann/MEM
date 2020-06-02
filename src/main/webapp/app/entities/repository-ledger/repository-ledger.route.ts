import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRepositoryLedger, RepositoryLedger } from 'app/shared/model/repository-ledger.model';
import { RepositoryLedgerService } from './repository-ledger.service';
import { RepositoryLedgerComponent } from './repository-ledger.component';
import { RepositoryLedgerDetailComponent } from './repository-ledger-detail.component';
import { RepositoryLedgerUpdateComponent } from './repository-ledger-update.component';

@Injectable({ providedIn: 'root' })
export class RepositoryLedgerResolve implements Resolve<IRepositoryLedger> {
  constructor(private service: RepositoryLedgerService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRepositoryLedger> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((repositoryLedger: HttpResponse<RepositoryLedger>) => {
          if (repositoryLedger.body) {
            return of(repositoryLedger.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RepositoryLedger());
  }
}

export const repositoryLedgerRoute: Routes = [
  {
    path: '',
    component: RepositoryLedgerComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MedicalEquipmentManagerApp.repositoryLedger.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RepositoryLedgerDetailComponent,
    resolve: {
      repositoryLedger: RepositoryLedgerResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MedicalEquipmentManagerApp.repositoryLedger.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RepositoryLedgerUpdateComponent,
    resolve: {
      repositoryLedger: RepositoryLedgerResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MedicalEquipmentManagerApp.repositoryLedger.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RepositoryLedgerUpdateComponent,
    resolve: {
      repositoryLedger: RepositoryLedgerResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MedicalEquipmentManagerApp.repositoryLedger.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
