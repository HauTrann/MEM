import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MedicalEquipmentManagerSharedModule } from 'app/shared/shared.module';
import { ReportBrokenEquipmentComponent } from './report-broken-equipment.component';
import { ReportBrokenEquipmentDetailComponent } from './report-broken-equipment-detail.component';
import { ReportBrokenEquipmentUpdateComponent } from './report-broken-equipment-update.component';
import { ReportBrokenEquipmentDeleteDialogComponent } from './report-broken-equipment-delete-dialog.component';
import { reportBrokenEquipmentRoute } from './report-broken-equipment.route';

@NgModule({
  imports: [MedicalEquipmentManagerSharedModule, RouterModule.forChild(reportBrokenEquipmentRoute)],
  declarations: [
    ReportBrokenEquipmentComponent,
    ReportBrokenEquipmentDetailComponent,
    ReportBrokenEquipmentUpdateComponent,
    ReportBrokenEquipmentDeleteDialogComponent
  ],
  entryComponents: [ReportBrokenEquipmentDeleteDialogComponent]
})
export class MedicalEquipmentManagerReportBrokenEquipmentModule {}
