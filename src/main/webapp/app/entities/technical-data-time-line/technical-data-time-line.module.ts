import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MedicalEquipmentManagerSharedModule } from 'app/shared/shared.module';
import { TechnicalDataTimeLineComponent } from './technical-data-time-line.component';
import { TechnicalDataTimeLineDetailComponent } from './technical-data-time-line-detail.component';
import { TechnicalDataTimeLineUpdateComponent } from './technical-data-time-line-update.component';
import { TechnicalDataTimeLineDeleteDialogComponent } from './technical-data-time-line-delete-dialog.component';
import { technicalDataTimeLineRoute } from './technical-data-time-line.route';

@NgModule({
  imports: [MedicalEquipmentManagerSharedModule, RouterModule.forChild(technicalDataTimeLineRoute)],
  declarations: [
    TechnicalDataTimeLineComponent,
    TechnicalDataTimeLineDetailComponent,
    TechnicalDataTimeLineUpdateComponent,
    TechnicalDataTimeLineDeleteDialogComponent
  ],
  entryComponents: [TechnicalDataTimeLineDeleteDialogComponent]
})
export class MedicalEquipmentManagerTechnicalDataTimeLineModule {}
