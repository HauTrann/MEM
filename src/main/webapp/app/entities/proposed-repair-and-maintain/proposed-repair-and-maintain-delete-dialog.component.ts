import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProposedRepairAndMaintain } from 'app/shared/model/proposed-repair-and-maintain.model';
import { ProposedRepairAndMaintainService } from './proposed-repair-and-maintain.service';

@Component({
  templateUrl: './proposed-repair-and-maintain-delete-dialog.component.html'
})
export class ProposedRepairAndMaintainDeleteDialogComponent {
  proposedRepairAndMaintain?: IProposedRepairAndMaintain;

  constructor(
    protected proposedRepairAndMaintainService: ProposedRepairAndMaintainService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.proposedRepairAndMaintainService.delete(id).subscribe(() => {
      this.eventManager.broadcast('proposedRepairAndMaintainListModification');
      this.activeModal.close();
    });
  }
}
