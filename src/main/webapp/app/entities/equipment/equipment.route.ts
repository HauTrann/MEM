import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEquipment, Equipment } from 'app/shared/model/equipment.model';
import { EquipmentService } from './equipment.service';
import { EquipmentComponent } from './equipment.component';
import { EquipmentDetailComponent } from './equipment-detail.component';
import { EquipmentUpdateComponent } from './equipment-update.component';

@Injectable({ providedIn: 'root' })
export class EquipmentResolve implements Resolve<IEquipment> {
  constructor(private service: EquipmentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEquipment> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((equipment: HttpResponse<Equipment>) => {
          if (equipment.body) {
            return of(equipment.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Equipment());
  }
}

export const equipmentRoute: Routes = [
  {
    path: '',
    component: EquipmentComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER, Authority.USER_MANAGER, Authority.ADMIN],
      defaultSort: 'id,asc',
      pageTitle: 'MedicalEquipmentManagerApp.equipment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EquipmentDetailComponent,
    resolve: {
      equipment: EquipmentResolve
    },
    data: {
      authorities: [Authority.USER, Authority.USER_MANAGER, Authority.ADMIN],
      pageTitle: 'MedicalEquipmentManagerApp.equipment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EquipmentUpdateComponent,
    resolve: {
      equipment: EquipmentResolve
    },
    data: {
      authorities: [Authority.USER_MANAGER, Authority.ADMIN],
      pageTitle: 'MedicalEquipmentManagerApp.equipment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EquipmentUpdateComponent,
    resolve: {
      equipment: EquipmentResolve
    },
    data: {
      authorities: [Authority.USER_MANAGER, Authority.ADMIN],
      pageTitle: 'MedicalEquipmentManagerApp.equipment.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
