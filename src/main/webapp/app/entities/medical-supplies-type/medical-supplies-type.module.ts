import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MedicalEquipmentManagerSharedModule } from 'app/shared/shared.module';
import { MedicalSuppliesTypeComponent } from './medical-supplies-type.component';
import { MedicalSuppliesTypeDetailComponent } from './medical-supplies-type-detail.component';
import { MedicalSuppliesTypeUpdateComponent } from './medical-supplies-type-update.component';
import { MedicalSuppliesTypeDeleteDialogComponent } from './medical-supplies-type-delete-dialog.component';
import { medicalSuppliesTypeRoute } from './medical-supplies-type.route';

@NgModule({
  imports: [MedicalEquipmentManagerSharedModule, RouterModule.forChild(medicalSuppliesTypeRoute)],
  declarations: [
    MedicalSuppliesTypeComponent,
    MedicalSuppliesTypeDetailComponent,
    MedicalSuppliesTypeUpdateComponent,
    MedicalSuppliesTypeDeleteDialogComponent
  ],
  entryComponents: [MedicalSuppliesTypeDeleteDialogComponent]
})
export class MedicalEquipmentManagerMedicalSuppliesTypeModule {}
