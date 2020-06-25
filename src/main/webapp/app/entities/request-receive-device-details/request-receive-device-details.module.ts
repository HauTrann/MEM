import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MedicalEquipmentManagerSharedModule } from 'app/shared/shared.module';
import { RequestReceiveDeviceDetailsComponent } from './request-receive-device-details.component';
import { RequestReceiveDeviceDetailsDetailComponent } from './request-receive-device-details-detail.component';
import { RequestReceiveDeviceDetailsUpdateComponent } from './request-receive-device-details-update.component';
import { RequestReceiveDeviceDetailsDeleteDialogComponent } from './request-receive-device-details-delete-dialog.component';
import { requestReceiveDeviceDetailsRoute } from './request-receive-device-details.route';

@NgModule({
  imports: [MedicalEquipmentManagerSharedModule, RouterModule.forChild(requestReceiveDeviceDetailsRoute)],
  declarations: [
    RequestReceiveDeviceDetailsComponent,
    RequestReceiveDeviceDetailsDetailComponent,
    RequestReceiveDeviceDetailsUpdateComponent,
    RequestReceiveDeviceDetailsDeleteDialogComponent
  ],
  entryComponents: [RequestReceiveDeviceDetailsDeleteDialogComponent]
})
export class MedicalEquipmentManagerRequestReceiveDeviceDetailsModule {}
