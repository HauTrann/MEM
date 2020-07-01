import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MedicalEquipmentManagerSharedModule } from 'app/shared/shared.module';
import { ProposedRepairAndMaintainDetailsComponent } from './proposed-repair-and-maintain-details.component';
import { ProposedRepairAndMaintainDetailsDetailComponent } from './proposed-repair-and-maintain-details-detail.component';
import { ProposedRepairAndMaintainDetailsUpdateComponent } from './proposed-repair-and-maintain-details-update.component';
import { ProposedRepairAndMaintainDetailsDeleteDialogComponent } from './proposed-repair-and-maintain-details-delete-dialog.component';
import { proposedRepairAndMaintainDetailsRoute } from './proposed-repair-and-maintain-details.route';

@NgModule({
  imports: [MedicalEquipmentManagerSharedModule, RouterModule.forChild(proposedRepairAndMaintainDetailsRoute)],
  declarations: [
    ProposedRepairAndMaintainDetailsComponent,
    ProposedRepairAndMaintainDetailsDetailComponent,
    ProposedRepairAndMaintainDetailsUpdateComponent,
    ProposedRepairAndMaintainDetailsDeleteDialogComponent
  ],
  entryComponents: [ProposedRepairAndMaintainDetailsDeleteDialogComponent]
})
export class MedicalEquipmentManagerProposedRepairAndMaintainDetailsModule {}
