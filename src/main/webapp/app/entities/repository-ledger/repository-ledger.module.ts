import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MedicalEquipmentManagerSharedModule } from 'app/shared/shared.module';
import { RepositoryLedgerComponent } from './repository-ledger.component';
import { RepositoryLedgerDetailComponent } from './repository-ledger-detail.component';
import { RepositoryLedgerUpdateComponent } from './repository-ledger-update.component';
import { RepositoryLedgerDeleteDialogComponent } from './repository-ledger-delete-dialog.component';
import { repositoryLedgerRoute } from './repository-ledger.route';

@NgModule({
  imports: [MedicalEquipmentManagerSharedModule, RouterModule.forChild(repositoryLedgerRoute)],
  declarations: [
    RepositoryLedgerComponent,
    RepositoryLedgerDetailComponent,
    RepositoryLedgerUpdateComponent,
    RepositoryLedgerDeleteDialogComponent
  ],
  entryComponents: [RepositoryLedgerDeleteDialogComponent]
})
export class MedicalEquipmentManagerRepositoryLedgerModule {}
