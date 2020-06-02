import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MedicalEquipmentManagerSharedModule } from 'app/shared/shared.module';
import { InRepositoryDetailsComponent } from './in-repository-details.component';
import { InRepositoryDetailsDetailComponent } from './in-repository-details-detail.component';
import { InRepositoryDetailsUpdateComponent } from './in-repository-details-update.component';
import { InRepositoryDetailsDeleteDialogComponent } from './in-repository-details-delete-dialog.component';
import { inRepositoryDetailsRoute } from './in-repository-details.route';

@NgModule({
  imports: [MedicalEquipmentManagerSharedModule, RouterModule.forChild(inRepositoryDetailsRoute)],
  declarations: [
    InRepositoryDetailsComponent,
    InRepositoryDetailsDetailComponent,
    InRepositoryDetailsUpdateComponent,
    InRepositoryDetailsDeleteDialogComponent
  ],
  entryComponents: [InRepositoryDetailsDeleteDialogComponent]
})
export class MedicalEquipmentManagerInRepositoryDetailsModule {}
