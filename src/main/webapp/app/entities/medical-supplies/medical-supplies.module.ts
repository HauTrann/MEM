import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MedicalEquipmentManagerSharedModule } from 'app/shared/shared.module';
import { MedicalSuppliesComponent } from './medical-supplies.component';
import { MedicalSuppliesDetailComponent } from './medical-supplies-detail.component';
import { MedicalSuppliesUpdateComponent } from './medical-supplies-update.component';
import { MedicalSuppliesDeleteDialogComponent } from './medical-supplies-delete-dialog.component';
import { medicalSuppliesRoute } from './medical-supplies.route';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [MedicalEquipmentManagerSharedModule, RouterModule.forChild(medicalSuppliesRoute), NgSelectModule],
  declarations: [
    MedicalSuppliesComponent,
    MedicalSuppliesDetailComponent,
    MedicalSuppliesUpdateComponent,
    MedicalSuppliesDeleteDialogComponent
  ],
  entryComponents: [MedicalSuppliesDeleteDialogComponent]
})
export class MedicalEquipmentManagerMedicalSuppliesModule {}
