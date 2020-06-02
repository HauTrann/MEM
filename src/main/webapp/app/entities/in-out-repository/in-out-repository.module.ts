import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MedicalEquipmentManagerSharedModule } from 'app/shared/shared.module';
import { InOutRepositoryComponent } from './in-out-repository.component';
import { InOutRepositoryDetailComponent } from './in-out-repository-detail.component';
import { InOutRepositoryUpdateComponent } from './in-out-repository-update.component';
import { InOutRepositoryDeleteDialogComponent } from './in-out-repository-delete-dialog.component';
import { inOutRepositoryRoute } from './in-out-repository.route';

@NgModule({
  imports: [MedicalEquipmentManagerSharedModule, RouterModule.forChild(inOutRepositoryRoute)],
  declarations: [
    InOutRepositoryComponent,
    InOutRepositoryDetailComponent,
    InOutRepositoryUpdateComponent,
    InOutRepositoryDeleteDialogComponent
  ],
  entryComponents: [InOutRepositoryDeleteDialogComponent]
})
export class MedicalEquipmentManagerInOutRepositoryModule {}
