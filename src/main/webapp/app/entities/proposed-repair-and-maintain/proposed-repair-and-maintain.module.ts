import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MedicalEquipmentManagerSharedModule } from 'app/shared/shared.module';
import { ProposedRepairAndMaintainComponent } from './proposed-repair-and-maintain.component';
import { ProposedRepairAndMaintainDetailComponent } from './proposed-repair-and-maintain-detail.component';
import { ProposedRepairAndMaintainUpdateComponent } from './proposed-repair-and-maintain-update.component';
import { ProposedRepairAndMaintainDeleteDialogComponent } from './proposed-repair-and-maintain-delete-dialog.component';
import { proposedRepairAndMaintainRoute } from './proposed-repair-and-maintain.route';

@NgModule({
  imports: [MedicalEquipmentManagerSharedModule, RouterModule.forChild(proposedRepairAndMaintainRoute)],
  declarations: [
    ProposedRepairAndMaintainComponent,
    ProposedRepairAndMaintainDetailComponent,
    ProposedRepairAndMaintainUpdateComponent,
    ProposedRepairAndMaintainDeleteDialogComponent
  ],
  entryComponents: [ProposedRepairAndMaintainDeleteDialogComponent]
})
export class MedicalEquipmentManagerProposedRepairAndMaintainModule {}
