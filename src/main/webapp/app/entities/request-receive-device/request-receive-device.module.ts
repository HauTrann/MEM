import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MedicalEquipmentManagerSharedModule } from 'app/shared/shared.module';
import { RequestReceiveDeviceComponent } from './request-receive-device.component';
import { RequestReceiveDeviceDetailComponent } from './request-receive-device-detail.component';
import { RequestReceiveDeviceUpdateComponent } from './request-receive-device-update.component';
import { RequestReceiveDeviceDeleteDialogComponent } from './request-receive-device-delete-dialog.component';
import { requestReceiveDeviceRoute } from './request-receive-device.route';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  imports: [
    MedicalEquipmentManagerSharedModule,
    RouterModule.forChild(requestReceiveDeviceRoute),
    NgSelectModule,
    NgOptionHighlightModule,
    CurrencyMaskModule
  ],
  declarations: [
    RequestReceiveDeviceComponent,
    RequestReceiveDeviceDetailComponent,
    RequestReceiveDeviceUpdateComponent,
    RequestReceiveDeviceDeleteDialogComponent
  ],
  entryComponents: [RequestReceiveDeviceDeleteDialogComponent]
})
export class MedicalEquipmentManagerRequestReceiveDeviceModule {}
