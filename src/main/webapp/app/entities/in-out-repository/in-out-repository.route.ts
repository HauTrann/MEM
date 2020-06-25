import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IInOutRepository, InOutRepository } from 'app/shared/model/in-out-repository.model';
import { InOutRepositoryService } from './in-out-repository.service';
import { InOutRepositoryComponent } from './in-out-repository.component';
import { InOutRepositoryDetailComponent } from './in-out-repository-detail.component';
import { InOutRepositoryUpdateComponent } from './in-out-repository-update.component';

@Injectable({ providedIn: 'root' })
export class InOutRepositoryResolve implements Resolve<IInOutRepository> {
  constructor(private service: InOutRepositoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInOutRepository> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((inOutRepository: HttpResponse<InOutRepository>) => {
          if (inOutRepository.body) {
            return of(inOutRepository.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new InOutRepository());
  }
}

export const inOutRepositoryRoute: Routes = [
  {
    path: 'in',
    component: InOutRepositoryComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.ADMIN, Authority.USER_MANAGER],
      defaultSort: 'id,asc',
      pageTitle: 'medicalEquipmentManagerApp.inOutRepository.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'out',
    component: InOutRepositoryComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.ADMIN, Authority.USER_MANAGER],
      defaultSort: 'id,asc',
      pageTitle: 'medicalEquipmentManagerApp.inOutRepository.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'in/:id/view',
    component: InOutRepositoryDetailComponent,
    resolve: {
      inOutRepository: InOutRepositoryResolve
    },
    data: {
      authorities: [Authority.ADMIN, Authority.USER_MANAGER],
      pageTitle: 'medicalEquipmentManagerApp.inOutRepository.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'out/:id/view',
    component: InOutRepositoryDetailComponent,
    resolve: {
      inOutRepository: InOutRepositoryResolve
    },
    data: {
      authorities: [Authority.ADMIN, Authority.USER_MANAGER],
      pageTitle: 'medicalEquipmentManagerApp.inOutRepository.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'in/new',
    component: InOutRepositoryUpdateComponent,
    resolve: {
      inOutRepository: InOutRepositoryResolve
    },
    data: {
      authorities: [Authority.ADMIN, Authority.USER_MANAGER],
      pageTitle: 'medicalEquipmentManagerApp.inOutRepository.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'out/new',
    component: InOutRepositoryUpdateComponent,
    resolve: {
      inOutRepository: InOutRepositoryResolve
    },
    data: {
      authorities: [Authority.ADMIN, Authority.USER_MANAGER],
      pageTitle: 'medicalEquipmentManagerApp.inOutRepository.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'in/:id/edit',
    component: InOutRepositoryUpdateComponent,
    resolve: {
      inOutRepository: InOutRepositoryResolve
    },
    data: {
      authorities: [Authority.ADMIN, Authority.USER_MANAGER],
      pageTitle: 'medicalEquipmentManagerApp.inOutRepository.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'out/:id/edit',
    component: InOutRepositoryUpdateComponent,
    resolve: {
      inOutRepository: InOutRepositoryResolve
    },
    data: {
      authorities: [Authority.ADMIN, Authority.USER_MANAGER],
      pageTitle: 'medicalEquipmentManagerApp.inOutRepository.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'in/new/from-pay/:payID',
    component: InOutRepositoryUpdateComponent,
    resolve: {
      inOutRepository: InOutRepositoryResolve
    },
    data: {
      authorities: [Authority.ADMIN, Authority.USER_MANAGER],
      pageTitle: 'medicalEquipmentManagerApp.inOutRepository.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'out/new/from-receive/:receiveID',
    component: InOutRepositoryUpdateComponent,
    resolve: {
      inOutRepository: InOutRepositoryResolve
    },
    data: {
      authorities: [Authority.ADMIN, Authority.USER_MANAGER],
      pageTitle: 'medicalEquipmentManagerApp.inOutRepository.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
