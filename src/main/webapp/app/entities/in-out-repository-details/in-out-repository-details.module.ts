import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MedicalEquipmentManagerSharedModule } from 'app/shared/shared.module';
import { InOutRepositoryDetailsComponent } from './in-out-repository-details.component';
import { InOutRepositoryDetailsDetailComponent } from './in-out-repository-details-detail.component';
import { InOutRepositoryDetailsUpdateComponent } from './in-out-repository-details-update.component';
import { InOutRepositoryDetailsDeleteDialogComponent } from './in-out-repository-details-delete-dialog.component';
import { inOutRepositoryDetailsRoute } from './in-out-repository-details.route';

@NgModule({
  imports: [MedicalEquipmentManagerSharedModule, RouterModule.forChild(inOutRepositoryDetailsRoute)],
  declarations: [
    InOutRepositoryDetailsComponent,
    InOutRepositoryDetailsDetailComponent,
    InOutRepositoryDetailsUpdateComponent,
    InOutRepositoryDetailsDeleteDialogComponent
  ],
  entryComponents: [InOutRepositoryDetailsDeleteDialogComponent]
})
export class MedicalEquipmentManagerInOutRepositoryDetailsModule {}
