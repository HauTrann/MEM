import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInOutRepository } from 'app/shared/model/in-out-repository.model';
import { InOutRepositoryService } from './in-out-repository.service';

@Component({
  templateUrl: './in-out-repository-delete-dialog.component.html'
})
export class InOutRepositoryDeleteDialogComponent {
  inOutRepository?: IInOutRepository;

  constructor(
    protected inOutRepositoryService: InOutRepositoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.inOutRepositoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('inOutRepositoryListModification');
      this.activeModal.close();
    });
  }
}
