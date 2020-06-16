import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MedicalEquipmentManagerSharedModule } from 'app/shared/shared.module';
import { ReportComponent } from 'app/entities/report/report.component';
import { reportRoute } from 'app/entities/report/report.route';

const ENTITY_STATES = [...reportRoute];

@NgModule({
  imports: [MedicalEquipmentManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ReportComponent],
  entryComponents: [ReportComponent]
})
export class MedicalEquipmentManagerReportModule {}
