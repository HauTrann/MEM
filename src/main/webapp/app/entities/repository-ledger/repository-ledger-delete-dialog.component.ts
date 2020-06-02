import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRepositoryLedger } from 'app/shared/model/repository-ledger.model';
import { RepositoryLedgerService } from './repository-ledger.service';

@Component({
  templateUrl: './repository-ledger-delete-dialog.component.html'
})
export class RepositoryLedgerDeleteDialogComponent {
  repositoryLedger?: IRepositoryLedger;

  constructor(
    protected repositoryLedgerService: RepositoryLedgerService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.repositoryLedgerService.delete(id).subscribe(() => {
      this.eventManager.broadcast('repositoryLedgerListModification');
      this.activeModal.close();
    });
  }
}
