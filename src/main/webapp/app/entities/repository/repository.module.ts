import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MedicalEquipmentManagerSharedModule } from 'app/shared/shared.module';
import { RepositoryComponent } from './repository.component';
import { RepositoryDetailComponent } from './repository-detail.component';
import { RepositoryUpdateComponent } from './repository-update.component';
import { RepositoryDeleteDialogComponent } from './repository-delete-dialog.component';
import { repositoryRoute } from './repository.route';

@NgModule({
  imports: [MedicalEquipmentManagerSharedModule, RouterModule.forChild(repositoryRoute)],
  declarations: [RepositoryComponent, RepositoryDetailComponent, RepositoryUpdateComponent, RepositoryDeleteDialogComponent],
  entryComponents: [RepositoryDeleteDialogComponent]
})
export class MedicalEquipmentManagerRepositoryModule {}
