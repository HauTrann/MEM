import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MedicalEquipmentManagerSharedModule } from 'app/shared/shared.module';
import { InRepositoryComponent } from './in-repository.component';
import { InRepositoryDetailComponent } from './in-repository-detail.component';
import { InRepositoryUpdateComponent } from './in-repository-update.component';
import { InRepositoryDeleteDialogComponent } from './in-repository-delete-dialog.component';
import { inRepositoryRoute } from './in-repository.route';

@NgModule({
  imports: [MedicalEquipmentManagerSharedModule, RouterModule.forChild(inRepositoryRoute)],
  declarations: [InRepositoryComponent, InRepositoryDetailComponent, InRepositoryUpdateComponent, InRepositoryDeleteDialogComponent],
  entryComponents: [InRepositoryDeleteDialogComponent]
})
export class MedicalEquipmentManagerInRepositoryModule {}
