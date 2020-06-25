import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRequestReceiveDevice, RequestReceiveDevice } from 'app/shared/model/request-receive-device.model';
import { RequestReceiveDeviceService } from './request-receive-device.service';
import { RequestReceiveDeviceComponent } from './request-receive-device.component';
import { RequestReceiveDeviceDetailComponent } from './request-receive-device-detail.component';
import { RequestReceiveDeviceUpdateComponent } from './request-receive-device-update.component';

@Injectable({ providedIn: 'root' })
export class RequestReceiveDeviceResolve implements Resolve<IRequestReceiveDevice> {
  constructor(private service: RequestReceiveDeviceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRequestReceiveDevice> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((requestReceiveDevice: HttpResponse<RequestReceiveDevice>) => {
          if (requestReceiveDevice.body) {
            return of(requestReceiveDevice.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RequestReceiveDevice());
  }
}

export const requestReceiveDeviceRoute: Routes = [
  {
    path: '',
    component: RequestReceiveDeviceComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'medicalEquipmentManagerApp.requestReceiveDevice.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'pay',
    component: RequestReceiveDeviceComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'medicalEquipmentManagerApp.requestReceiveDevice.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'pay/manager',
    component: RequestReceiveDeviceComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER_MANAGER],
      defaultSort: 'id,asc',
      pageTitle: 'medicalEquipmentManagerApp.requestReceiveDevice.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'manager',
    component: RequestReceiveDeviceComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER_MANAGER],
      defaultSort: 'id,asc',
      pageTitle: 'medicalEquipmentManagerApp.requestReceiveDevice.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RequestReceiveDeviceDetailComponent,
    resolve: {
      requestReceiveDevice: RequestReceiveDeviceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medicalEquipmentManagerApp.requestReceiveDevice.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'manager/:id/view',
    component: RequestReceiveDeviceDetailComponent,
    resolve: {
      requestReceiveDevice: RequestReceiveDeviceResolve
    },
    data: {
      authorities: [Authority.USER_MANAGER],
      pageTitle: 'medicalEquipmentManagerApp.requestReceiveDevice.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RequestReceiveDeviceUpdateComponent,
    resolve: {
      requestReceiveDevice: RequestReceiveDeviceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medicalEquipmentManagerApp.requestReceiveDevice.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RequestReceiveDeviceUpdateComponent,
    resolve: {
      requestReceiveDevice: RequestReceiveDeviceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medicalEquipmentManagerApp.requestReceiveDevice.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'pay/:id/view',
    component: RequestReceiveDeviceDetailComponent,
    resolve: {
      requestReceiveDevice: RequestReceiveDeviceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medicalEquipmentManagerApp.requestReceiveDevice.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'pay/manager/:id/view',
    component: RequestReceiveDeviceDetailComponent,
    resolve: {
      requestReceiveDevice: RequestReceiveDeviceResolve
    },
    data: {
      authorities: [Authority.USER_MANAGER],
      pageTitle: 'medicalEquipmentManagerApp.requestReceiveDevice.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'pay/new',
    component: RequestReceiveDeviceUpdateComponent,
    resolve: {
      requestReceiveDevice: RequestReceiveDeviceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medicalEquipmentManagerApp.requestReceiveDevice.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'pay/:id/edit',
    component: RequestReceiveDeviceUpdateComponent,
    resolve: {
      requestReceiveDevice: RequestReceiveDeviceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medicalEquipmentManagerApp.requestReceiveDevice.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
