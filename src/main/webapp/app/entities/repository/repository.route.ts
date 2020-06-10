import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRepository, Repository } from 'app/shared/model/repository.model';
import { RepositoryService } from './repository.service';
import { RepositoryComponent } from './repository.component';
import { RepositoryDetailComponent } from './repository-detail.component';
import { RepositoryUpdateComponent } from './repository-update.component';

@Injectable({ providedIn: 'root' })
export class RepositoryResolve implements Resolve<IRepository> {
  constructor(private service: RepositoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRepository> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((repository: HttpResponse<Repository>) => {
          if (repository.body) {
            return of(repository.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Repository());
  }
}

export const repositoryRoute: Routes = [
  {
    path: '',
    component: RepositoryComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER, Authority.USER_MANAGER, Authority.ADMIN],
      defaultSort: 'id,asc',
      pageTitle: 'MedicalEquipmentManagerApp.repository.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RepositoryDetailComponent,
    resolve: {
      repository: RepositoryResolve
    },
    data: {
      authorities: [Authority.USER, Authority.USER_MANAGER, Authority.ADMIN],
      pageTitle: 'MedicalEquipmentManagerApp.repository.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RepositoryUpdateComponent,
    resolve: {
      repository: RepositoryResolve
    },
    data: {
      authorities: [Authority.USER_MANAGER, Authority.ADMIN],
      pageTitle: 'MedicalEquipmentManagerApp.repository.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RepositoryUpdateComponent,
    resolve: {
      repository: RepositoryResolve
    },
    data: {
      authorities: [Authority.USER_MANAGER, Authority.ADMIN],
      pageTitle: 'MedicalEquipmentManagerApp.repository.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
