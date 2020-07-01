import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProposedRepairAndMaintainDetails } from 'app/shared/model/proposed-repair-and-maintain-details.model';
import { ProposedRepairAndMaintainDetailsService } from './proposed-repair-and-maintain-details.service';

@Component({
  templateUrl: './proposed-repair-and-maintain-details-delete-dialog.component.html'
})
export class ProposedRepairAndMaintainDetailsDeleteDialogComponent {
  proposedRepairAndMaintainDetails?: IProposedRepairAndMaintainDetails;

  constructor(
    protected proposedRepairAndMaintainDetailsService: ProposedRepairAndMaintainDetailsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.proposedRepairAndMaintainDetailsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('proposedRepairAndMaintainDetailsListModification');
      this.activeModal.close();
    });
  }
}
