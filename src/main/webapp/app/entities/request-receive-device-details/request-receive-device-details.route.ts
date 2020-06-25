import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRequestReceiveDeviceDetails, RequestReceiveDeviceDetails } from 'app/shared/model/request-receive-device-details.model';
import { RequestReceiveDeviceDetailsService } from './request-receive-device-details.service';
import { RequestReceiveDeviceDetailsComponent } from './request-receive-device-details.component';
import { RequestReceiveDeviceDetailsDetailComponent } from './request-receive-device-details-detail.component';
import { RequestReceiveDeviceDetailsUpdateComponent } from './request-receive-device-details-update.component';

@Injectable({ providedIn: 'root' })
export class RequestReceiveDeviceDetailsResolve implements Resolve<IRequestReceiveDeviceDetails> {
  constructor(private service: RequestReceiveDeviceDetailsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRequestReceiveDeviceDetails> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((requestReceiveDeviceDetails: HttpResponse<RequestReceiveDeviceDetails>) => {
          if (requestReceiveDeviceDetails.body) {
            return of(requestReceiveDeviceDetails.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RequestReceiveDeviceDetails());
  }
}

export const requestReceiveDeviceDetailsRoute: Routes = [
  {
    path: '',
    component: RequestReceiveDeviceDetailsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'medicalEquipmentManagerApp.requestReceiveDeviceDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RequestReceiveDeviceDetailsDetailComponent,
    resolve: {
      requestReceiveDeviceDetails: RequestReceiveDeviceDetailsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medicalEquipmentManagerApp.requestReceiveDeviceDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RequestReceiveDeviceDetailsUpdateComponent,
    resolve: {
      requestReceiveDeviceDetails: RequestReceiveDeviceDetailsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medicalEquipmentManagerApp.requestReceiveDeviceDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RequestReceiveDeviceDetailsUpdateComponent,
    resolve: {
      requestReceiveDeviceDetails: RequestReceiveDeviceDetailsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medicalEquipmentManagerApp.requestReceiveDeviceDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
