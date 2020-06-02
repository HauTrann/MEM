import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IInRepository, InRepository } from 'app/shared/model/in-repository.model';
import { InRepositoryService } from './in-repository.service';
import { InRepositoryComponent } from './in-repository.component';
import { InRepositoryDetailComponent } from './in-repository-detail.component';
import { InRepositoryUpdateComponent } from './in-repository-update.component';

@Injectable({ providedIn: 'root' })
export class InRepositoryResolve implements Resolve<IInRepository> {
  constructor(private service: InRepositoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInRepository> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((inRepository: HttpResponse<InRepository>) => {
          if (inRepository.body) {
            return of(inRepository.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new InRepository());
  }
}

export const inRepositoryRoute: Routes = [
  {
    path: '',
    component: InRepositoryComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'MedicalEquipmentManagerApp.inRepository.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: InRepositoryDetailComponent,
    resolve: {
      inRepository: InRepositoryResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MedicalEquipmentManagerApp.inRepository.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: InRepositoryUpdateComponent,
    resolve: {
      inRepository: InRepositoryResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MedicalEquipmentManagerApp.inRepository.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: InRepositoryUpdateComponent,
    resolve: {
      inRepository: InRepositoryResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MedicalEquipmentManagerApp.inRepository.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
